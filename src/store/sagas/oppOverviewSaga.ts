import { put, all, takeLatest, select, call } from 'redux-saga/effects';
import _get from 'lodash/get';
import moment from "moment";
import {
	IUserData,
	IAssociatedOppsSection,
	IGetTargetsPayload,
	IChangeTargetStatusPayload,
	ISendInteractionPayload,
	ISingleOppInList,
	IChangeEntityDecisionPayload,
	ISpecialInteractionPayload,
	ISetOpportunityPinPayload,
	IVInteraction,
	IOpportunityDetails,
	INewInteractionPayload,
	IEditOpportunityDetails,
	INewMessagePayload,
	INewNotePayload,
	IFileAttachment,
} from '../../types/interfaces';

import {
	templateFieldsToOppSummary,
	createInteractionBody,
	errorHandler,
	transformToTemplateField,
	getTargetFromOpportunityConnectorsByTargetUserId,
} from '../../utils';
import {
	setAssociatedOpps,
	setTargetsAndConnectors,
	setOppSummary,
	setOppDetails,
	updateTargetStatusId,
	updateOppStatus,
	setPredefinedQuestions,
	setNewOppData,
	updateTargetStatusInsideProfile,
	getOppDetailsTargetsAndConnectorsSuccess,
	getOppDetailsTargetsAndConnectorsError,
	setOpportunityTargetFeed,
	setOpportunityTargetStatuses,
	setOpportunityFeed,
	setTemplateFieldsDates,
	setOpportunityTarget,
	getOpportunityTargetFeed,
	getOppDetails, setPins, setOpportunityDetails, getOppSummary, setPreviousState
} from '../actions/oppOverviewActions';
import { OpportunitiesActionTypes, OppOverviewTypes, OwnerConnctorOverviewTypes, InteractionsTypes } from '../constants';
import {
	EntityEnum,
	OpportunityStatusesEnum,
	InteractionTypesEnum,
	InteractionStatuses,
	IntSubResponseTypesEnum,
	InteractionTemplateFieldsEnum,
	TemplatesEnum,
	TargetStatusesEnum

} from '../../types/enums';
import {
	OppConnectorsEP,
	OppTemplateFieldsEP,
	OppTargetsEP,
	OpportunitiesEP,
	TemplatesEP,
	InteractionsEP,
	UtilsEP,
	OppTypesEP,
	OpportunityConnectorsEP,
	UsersEP,
	TemplateFieldsEP,
	OpportunityTargetsEP,
	OpportunityPinsEP,
	OpportunityTemplatesEP,
	InteractionNewsEP
} from '../../services/api/routes';
import {
	getUserDataSelector,
	getAuthStateSelector
} from '../selectors/authSelector';
import {
	oppOverviewSelector,
	IOppOverViewState,
	roleSelector
} from '../../store/selectors/oppOverviewSelector';
import { IAssociatedOpp, IPayload } from '../../types/interfaces';
import { setOpportunityDetailsForConnectorAndOwner, setOpportunityVinteractionsForConnectorAndOwner, getOpportunityVinteractionsForConnectorAndOwner } from '../actions/оwnerConnctorOverviewActions';
import i18n from '../../locale/i18n';
import { navigationService } from '../../services';
import { ScreensEnum } from '../../navigation/screens';
import { ids } from '../../utils/tampleteIds';
import { setIntaractionDetails, setMessages } from '../actions/interactionDetailsActions';
import { readFile } from '../../utils';
import interactionsEP from '../../services/api/routes/Interactions';
import approvalServices from '../../services/ApprovalServices';

function* getAssociatedOppsSaga() {
	const userData: IUserData = yield select(getUserDataSelector);

	try {
		const opportunityList = yield call(
			OppConnectorsEP.getAssociatedOpps,
			userData.id!
		);

		// Filtering duplicates in the opportunityList

		const filterecOpportunityList = Object.values(
			//@ts-ignore
			opportunityList.reduce((acc, item) => {
				if (!acc[item.opportunity.id]) {
					acc[item.opportunity.id] = item;
				}
				return acc;
			}, {})
		);

		const EntityEnumText = ['Connector', 'Owner', 'Target'];
		const entityStatusDataPointer = {
			[EntityEnum.OWNER]: 'opportunity.opportunityStatus',
			[EntityEnum.CONNECTOR]: 'opportunityConnectorStatus',
			[EntityEnum.TARGET]: 'opportunityTargets[0].opportunityTargetStatus'
		};
		const assosiatedOpps = filterecOpportunityList.reduce(
			//@ts-ignore
			(acc: IAssociatedOppsSection, opp: IAssociatedOpp) => {
				let role =
					userData.id === opp.ownerUserId ? EntityEnum.OWNER :
						userData.id === opp.connectorUserId ? EntityEnum.CONNECTOR : EntityEnum.TARGET;

				const statusData = _get(opp, entityStatusDataPointer[role]);
				if (statusData) {
					const opportunityData: ISingleOppInList = {
						title: opp.opportunity.title,
						status: statusData.id,
						statusTitle: statusData.title,
						statusColor: statusData.color,
						id: opp.opportunityId
					};

					if (role === EntityEnum.CONNECTOR) {
						opportunityData.entityId = opp.id; // This is the opp connector Id, not UserId or opportunityId
					}

					if (role === EntityEnum.TARGET) {
						opportunityData.entityId = opp.opportunityTargets[0].id; // This is the opp target Id, not UserId
					}

					acc[role] = acc[role]
						? {
							...acc[role],
							data: [...acc[role].data, opportunityData]
						}
						: {
							sectionTitle: EntityEnumText[role],
							data: [opportunityData]
						};
				}

				return acc;
			},
			[]
		);

		yield put(setAssociatedOpps(assosiatedOpps));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}
}

function* getOpportunityDetails({ payload }: IPayload<{ oppId:string,reload:boolean}>) {	
	const { oppId,reload } = payload;
	if(!oppId) return
	try {
		if(reload)
			yield put(setOppDetails(undefined));
		const oppDetailsResponse: any[] = yield call(
			OpportunitiesEP.getOppDetails, oppId
		);
		if (oppDetailsResponse && oppDetailsResponse.length > 0){
			yield put(setOppDetails(oppDetailsResponse[0]));
		}
		const previousState = yield call(UtilsEP.getPreviousState,oppId);
		yield put(setPreviousState(previousState))

	} catch (ex) {
		yield put(setTargetsAndConnectors([]));
		yield put(getOppDetailsTargetsAndConnectorsError());

		console.log('Cannot get Targets data', ex, JSON.stringify(ex, null, 2));
	}
}
function* getOppDetailsTargetsAndConnectorsSaga({ payload }: IPayload<IGetTargetsPayload>) {
	const { role, oppId, includeTargetStatuses = false, unReload } = payload;
	const userData = yield select(getUserDataSelector);

	if(!unReload)
		yield put(setTargetsAndConnectors({list:undefined, userId:userData.id}));
	try {
		const oppDetailsResponse:any[] = yield call(
			OppConnectorsEP.getOppDetailsAndUsers,
			{
				oppId,
				includeTargetStatuses,
			}
		);
		yield put(getOppDetailsTargetsAndConnectorsSuccess());
		yield put(setTargetsAndConnectors({list:oppDetailsResponse, userId:userData.id}));
	} catch (ex) {
		console.log(ex);
		
		yield put(setTargetsAndConnectors({list:[], userId:userData.id}));
		yield put(getOppDetailsTargetsAndConnectorsError());

		console.log('Cannot get Targets data', ex, JSON.stringify(ex, null, 2));
	}
}

interface IGetOppSummaryPayload {
	oppId: string;
	oppTypeId: string;
}

function* getOppSummarySaga({ payload }: IPayload<IGetOppSummaryPayload>) {
	const { oppId, oppTypeId } = payload;
	try {
		const TemplateFields = yield call(
			OppTemplateFieldsEP.getOppTemplateFields,
			oppId
		);
		//const templateArray = yield call(TemplateFieldsEP.getOppTemplatesFields, fieldIds);

		const body = yield call(OppTypesEP.getOpportunityBodyFieldsByTypeId, oppTypeId);

		const oppSummary = templateFieldsToOppSummary(TemplateFields, oppTypeId, JSON.parse(body));
		yield put(setOppSummary(oppSummary));
		yield put(setOpportunityDetails(TemplateFields));

		return true; // return success for whos calling it
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}
}

function* changeTargetStatusSaga({ payload }: IPayload<IChangeTargetStatusPayload>) {
	const role = yield select(roleSelector);
	const { targetId, newStatus, cb } = payload;
	try {
		yield call(OppTargetsEP.changeTargetStatus, payload);

		// Update target status inside the Target screen
		if (role === EntityEnum.TARGET) {
			yield put(updateTargetStatusInsideProfile(newStatus));
		} else {
			// Updates the target inside the oppoverview scene
			yield put(
				updateTargetStatusId({
					targetId,
					newStatus
				})
			);
		}
		if (typeof cb === 'function') {
			cb();
		}
	} catch (ex) {
		console.log('Error changing oppTarget Status', ex);
	}
}

function* changeEntityDecisionSaga({ payload }: IPayload<IChangeEntityDecisionPayload>) {
	const patchData = {
		...payload,
	};
	try {
		// the endpoint service makes the route decision based on the role
		yield call(OppConnectorsEP.changeEntityDecision, patchData);
		payload.callback();
	} catch (ex) {
		console.log('Error changeEntityDecisionSaga');
	}
}

function* deleteEntity({ payload }: IPayload<IChangeEntityDecisionPayload>) {
	try {
		yield call(OppConnectorsEP.deleteEntety, payload);
		payload.callback();
	} catch (ex) {
		console.log('Error deleteEntity');
	}
}

function* changeOppStatusSaga({ payload: newStatus }: IPayload<OpportunityStatusesEnum>) {
	try {
		const { oppDetails }: IOppOverViewState = yield select(oppOverviewSelector);
		yield call(OpportunitiesEP.changeOppStatus, newStatus, oppDetails);
		yield put(updateOppStatus(newStatus));
	} catch (ex) {
		console.log('Error changing opp status', ex);
	}
}

function* getPredefinedMessagesSaga() {
	try {
		

		const predefinedMessages = yield call(TemplatesEP.getPredefinedQuestions);
		const fixedPredefinedMessages = predefinedMessages.map((message: any) => {
			const { creatorUserId, timestamp, ...rest } = message;
			return rest;
		});
		yield put(setPredefinedQuestions(fixedPredefinedMessages));
	} catch (ex) {
		console.log('Error fetching predefined questions', ex);
	}
}
function* getInteractionDetails( {payload}: IPayload<{id:string,isNew:boolean}>) {
	const {id,isNew} = payload
	yield put(setIntaractionDetails({}))
	try {		
		const res = yield InteractionsEP.getInterationById(id);
		const { userData } = yield select(getAuthStateSelector);	
		if(isNew){
			const news = yield InteractionNewsEP.create({interactionId:id, userId:userData.id})
		}	
		 yield put(setIntaractionDetails(res))
	} catch (e) {
		console.log('getInteractionDetails ERROR', e);
	}
}
function* seeIntroInvite( {payload}: IPayload<{id:string,isNew:boolean}>) {
	const {id,isNew} = payload
	try {				
		const { userData } = yield select(getAuthStateSelector);	
		if(isNew){
			const news = yield InteractionNewsEP.create({interactionId:id, userId:userData.id})
		}
	} catch (e) {
		console.log('getInteractionDetails ERROR', e);
	}
}
function* getNewOppAndTargetProfileSaga({ payload }) {
	const { oppId } = payload
	const { userData } = yield select(getAuthStateSelector);
	try {

		const interactionForInvites:IVInteraction[] = yield  call(InteractionsEP.getVIntrationForInvites, oppId)
		
		yield put(setNewOppData( {list:interactionForInvites, userId:userData.id} ));
		
	} catch (ex) {
		navigationService.navigate(ScreensEnum.DASHBOARD)
		console.log('error getNewOppAndTargetProfileSaga', ex);
	}
}
function* getInteractionMessages({ payload }: IPayload<{id:string,from:string, to:string}>){
	const {from,id,to} = payload
	yield put(setMessages())
	try {
		const res:IVInteraction[] = yield call(interactionsEP.getInterationMessages,id,from,to)
		
		yield put(setMessages(res))
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		throw new Error(ex);
	}
};
function* sendMessage({ payload }: IPayload<INewMessagePayload>) {
	yield put(setMessages())
	const {
		fromUserId,
		subscriberId,
		connectorId,
		targetId,
		message,
		cb,
		file
	} = payload;
	const interactionSubscribers = [
		{ userId: subscriberId }
	];
	const interactionTemplateFields = [];
	if(file){
		const stringValue = (file.data.content as IFileAttachment).name;
		const fileTextValue = yield readFile((file.data.content as IFileAttachment).uri);
		interactionTemplateFields.push({
			templateFieldId: InteractionTemplateFieldsEnum.FILE_ATTACHMENT,
			stringValue,
			fileTextValue
		}
		)
	}
	

	const data = {
		opportunityConnectorId: connectorId ? connectorId : undefined,
		opportunityTargetId: targetId ? targetId : undefined,
		timestamp: new Date(),
		fromUserId,
		interactionTypeId: file?InteractionTypesEnum.SEND_FILE:InteractionTypesEnum.SEND_MESSAGE,
		//interactionStatusId: type,
		interactionTemplates: [
			{
				body:message,
				templateId:InteractionTemplateFieldsEnum.INTERNTAL_MESSAGE,
				interactionTemplateFields
			}
		],
		interactionSubscribers
	};
	try {
		yield InteractionsEP.create(data);
		if (typeof cb === 'function') {
			cb();
		}
	} catch (ex) {
		console.log(ex);

		console.log('Error sending interaction');
	}
}
function* sendNote({ payload }: IPayload<INewNotePayload>) {
	const {
		fromUserId,
		subscriberId,
		connectorId,
		targetId,
		message,
		interactionParentId,
		firstName,
		cb
	} = payload;
	const interactionSubscribers = [
		{ userId: subscriberId }
	];
	const data = {
		opportunityConnectorId: connectorId ? connectorId : undefined,
		opportunityTargetId: targetId ? targetId : undefined,
		timestamp: new Date(),
		fromUserId,
		interactionTypeId: InteractionTypesEnum.NOTE,
		interactionParentId,
		interactionTemplates: [
			{
				subject:`Note by ${firstName}`,
				body:message,
				templateId:InteractionTemplateFieldsEnum.INTERNTAL_MESSAGE
			}
		],
		interactionSubscribers
	};
	try {
		yield InteractionsEP.create(data);
		if (typeof cb === 'function') {
			cb();
		}
	} catch (ex) {
		console.log(ex);

		console.log('Error sending interaction');
	}
}

function* newInteractionSaga({ payload }: IPayload<INewInteractionPayload>) {
	const {
		fromUserId,
		name,
		subscriberId,
		date,
		connectorId,
		targetId,
		type,
		notes,
		attendees,
		locationAddress,
		cb
	} = payload;
	const interactionSubscribers = [
		{ userId: subscriberId }
	];
	const tamplateIds: { templateId: string, interactionTemplateFieldsId: string[] } = ids[type as string]
	if (!tamplateIds) return

	const interactionTemplateFields: any[] = []
	/*
	Attendee
	Date of Interaction
	Location of Interaction
	Name
	Notes

	?  "dateValue": "2020-10-25T08:58:04.178Z",
	?  "fileTextValue": "string",
*/
	if (attendees) {
		for (let i = 0; i < attendees.length; i++) {
			const attendee = attendees[i];
			if (attendee && attendee != '') {
				interactionTemplateFields.push({
					templateFieldId: tamplateIds.interactionTemplateFieldsId[0],
					stringValue: attendee
				})
			}
		}
	}
	if (date && date != '') {
		interactionTemplateFields.push({
			templateFieldId: tamplateIds.interactionTemplateFieldsId[1],
			dateValue: moment(date).toISOString()
		})
	}
	if (locationAddress && locationAddress != '') {
		interactionTemplateFields.push({
			templateFieldId: tamplateIds.interactionTemplateFieldsId[2],
			stringValue: locationAddress
		})
	}
	if(name && name!=''){
		interactionTemplateFields.push({
			templateFieldId: tamplateIds.interactionTemplateFieldsId[3],
			stringValue: name
		})
	}
	if(notes && notes!=''){
		interactionTemplateFields.push({
			templateFieldId: tamplateIds.interactionTemplateFieldsId[4],
			fileTextValue: notes
		})
	}

	const data = {
		opportunityConnectorId: connectorId ? connectorId : undefined,
		opportunityTargetId: targetId ? targetId : undefined,
		timestamp: new Date(),
		fromUserId,
		interactionTypeId: type,
		//interactionStatusId: type,
		interactionTemplates: [
			{
				teplateId: tamplateIds.templateId,
				interactionTemplateFields
			}
		],
		interactionSubscribers
	};
	try {
		yield InteractionsEP.create(data);
		if (typeof cb === 'function') {
			cb();
		}
	} catch (ex) {
		console.log(ex);

		console.log('Error sending interaction');
	}
}

function* sendInteractionSaga({ payload }: IPayload<ISendInteractionPayload>) {
	const userData = yield select(getUserDataSelector);
	const {
		role: role1,
		oppDetails,
		ccToConnector
	}: IOppOverViewState = yield select(oppOverviewSelector);
	const {
		body,
		targetUserId,
		isPredefinedMessage,
		predefinedMessageTemplateId,
		connectorUserId,
		ownerUserId,
		targetId,
		connectorId,
		toConnector,
		cb,
		role: role2
	} = payload;
	const { } = oppDetails;
	const role = role1 || role2
	const fromUserId = userData.id;
	const templateId = isPredefinedMessage
		? predefinedMessageTemplateId
		: InteractionTemplateFieldsEnum.INTERNTAL_MESSAGE;

	const interactionTypeId = isPredefinedMessage
		? InteractionTypesEnum.PREDEFINED_MESSAGE
		: InteractionTypesEnum.ASK_QUESTION_MESSAGE;

	const interactionSubscribers = [];

	if (role === EntityEnum.OWNER || role === EntityEnum.CONNECTOR) {
		interactionSubscribers.push({
			userId: targetUserId,
			IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
		});
	}

	if (role === EntityEnum.TARGET) {
		if (ownerUserId) {
			interactionSubscribers.push({
				userId: ownerUserId,
				IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
			});
		}
		if (toConnector && connectorUserId) {
			interactionSubscribers.push({
				userId: connectorUserId,
				IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
			});
		}

	}
	// if Target or owner choose to cc the connector
	if (
		ccToConnector &&
		(role === EntityEnum.OWNER || role === EntityEnum.TARGET)
	) {
		interactionSubscribers.push({
			userId: connectorUserId,
			IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
		});
	}

	// TODO Yaron - adding dynamic OppConnector and oppTarget Id's

	const data = {
		opportunityConnectorId: connectorId ? connectorId : undefined,
		opportunityTargetId: targetId ? targetId : undefined,
		timestamp: new Date(),
		fromUserId,
		interactionTypeId,
		interactionStatusId: InteractionStatuses.SEND_MESSAGE,
		interactionTemplates: [
			{
				body,
				templateId
			}
		],
		interactionSubscribers
	};
	try {
		yield InteractionsEP.create(data);
		if (typeof cb === 'function') {
			cb();
		}
	} catch (ex) {
		console.log('Error sending interaction');
	}
}
function* setOpportunityPin({ payload }: IPayload<ISetOpportunityPinPayload>) {
	const {pin, pinId,opportunityId, userId} =  payload
	try {
		//yield put(setOppDetails(undefined))
		if(pin){
			yield OpportunityPinsEP.create({
				opportunityId,
				userId,
			})
		}else{
			if(pinId)
				yield OpportunityPinsEP.deleteById(pinId)
		}

		yield put(getOppDetails(opportunityId,false))

	} catch (error) {

	}
}
function* getRestNotification( {payload}:{payload:string}) {
	
	try {
		yield OpportunitiesEP.getResetNotificationById(payload)	
	} catch (error) {

	}
}
function* editOpportunity({ payload }: IPayload<IEditOpportunityDetails>) {
	const {fieldsDatas, newData,title,cb,oppDetails} =  payload
	try {
		oppDetails.title = title
		yield OpportunitiesEP.editOpportunityDetails(oppDetails)
		const  opportunityTemplates:any[] = yield OpportunityTemplatesEP.getOppTemplateByOpportunity(oppDetails.id)
		for (let i = 0; i < opportunityTemplates.length; i++) {
			const element = opportunityTemplates[i];
			yield OpportunityTemplatesEP.deleteById(element.id);
		}

		const data = transformToTemplateField(newData,fieldsDatas)
		yield OpportunityTemplatesEP.create({
			opportunityId:oppDetails.id,
			templateId: TemplatesEnum.OPP_TEMPLATE_ID,
			opportunityTemplateFields:data
		});
		yield put(getOppDetails(oppDetails.id,false));
		yield put(getOppSummary(oppDetails.id,oppDetails.opportunityTypeId))
		cb()
		//templateFieldsToPut(oldData,newData)
		//yield put(getOppDetails(opportunityId,false))

	} catch (error) {
		console.log(error);
		
	}
}
//TODO: Create get all pins
function* getAllPins() {
	try {
		const res = yield OpportunityPinsEP.getAll();
		yield put(setPins(res.value))
	} catch (e) {
		console.log('getAllPins ERROR', e);
	}
}

function* sendSpecialInteractionSaga({ payload }: IPayload<ISpecialInteractionPayload>) {
	const { targetUsername, type, calendarData, opportunityTargetId, opportunityConnectorId,toUserId,oppId } = payload;

	const userData: IUserData = yield select(getUserDataSelector);

	const currentEntityName = `${userData.firstName} ${userData.lastName}`;
	const transformedBody = createInteractionBody({
		type,
		fromUsername: currentEntityName,
		toUsername: targetUsername,
		calendarData: calendarData!
	});

	const data = {
		opportunityConnectorId: opportunityConnectorId || undefined,
		opportunityTargetId: opportunityTargetId || null,
		timestamp: new Date(),
		fromUserId: userData.id,
		interactionTypeId: type,
		interactionStatusId: InteractionStatuses.SEND_MESSAGE,
		interactionTemplates: [
			{
				body: transformedBody
			}
		],
		interactionSubscribers: toUserId?[
			{
				userId: toUserId,
				IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
			}
		]:undefined
	};

	try {
		yield InteractionsEP.create(data);
		if (opportunityTargetId)
			yield put(getOpportunityTargetFeed(opportunityTargetId,oppId))
		if (opportunityConnectorId)
			yield put(getOpportunityVinteractionsForConnectorAndOwner(opportunityConnectorId,oppId))
	} catch (ex) {
		console.log(ex);

		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Error sending spaciel interaction');
	}
}
export function* getFeedForOpportunity({ payload }: any) {
	try {
		const { oppId,dontReload } = payload;
		if(!dontReload)
			yield put(setOpportunityFeed(undefined));
		const feeds: IVInteraction[] = yield call(UtilsEP.getVInteractionsByOpportunity, oppId);
		yield put(setOpportunityFeed(feeds));
	} catch (error) {
		console.log(error);
		yield put(setOpportunityTargetFeed([]));
	}
}
export function* getTarget({ payload }: any) {
	try {

		const { targetId } = payload;
		yield put(setOpportunityTarget(undefined));
		yield call(OpportunityTargetsEP.getOpportunityTargetById, targetId);
	} catch (error) {
		console.log(error);
	}
}
export function* getTargetForApproval({ payload }: any) {
	try {

		const { oppId,userId } = payload;
		const connectors = yield call(OpportunityTargetsEP.getOpportunityTargetForApproval, oppId);
		const target = getTargetFromOpportunityConnectorsByTargetUserId(connectors, userId)
		if(target?.opportunityTargetStatusId===TargetStatusesEnum.APPROVAL_PENDING){
			approvalServices.callBack({...target,oppId},EntityEnum.TARGET)
		}
	} catch (error) {
		console.log(error);
	}
}
export function* getFeedForTargets(data: any) {
	try {
		const { payload } = data;
		yield put(setOpportunityTargetFeed(undefined));
		const {targetId,oppId} = payload
		const feeds: IVInteraction[] = yield call(UtilsEP.getVInteractionsByTarget, targetId,oppId);
		yield put(setOpportunityTargetFeed(feeds));
	} catch (error) {
		console.log(error);
		yield put(setOpportunityTargetFeed([]));
	}
}

export function* getOpportunityDetailsFromConnector(data: any) {
	try {
		put(setOpportunityDetailsForConnectorAndOwner(undefined));
		const { payload } = data;
		const opportunities: IOpportunityDetails[] = yield call(OpportunityConnectorsEP.getOpportunityConnectorById, payload);

		const opportunity = opportunities.length ? opportunities[0] : undefined;

		if (opportunity) {
			if (opportunity.ownerUserId) {
				const owners = yield call(UsersEP.getUserIdById, opportunity.ownerUserId);
				opportunity.owner = owners[0];
			}
			if (opportunity.connectorUserId) {
				const connectors = yield call(UsersEP.getUserIdById, opportunity.connectorUserId);
				opportunity.connector = connectors[0];
			}
			if (opportunity.opportunity.opportunityTypeId) {
				const body = yield call(OppTypesEP.getOpportunityBodyFieldsByTypeId, opportunity.opportunity.opportunityTypeId);
				try {
					opportunity.opportunity.opportunityTemplates[0].body = JSON.parse(body);
				} catch (error) {

				}


			}
			yield put(setOpportunityDetailsForConnectorAndOwner(opportunity))
		} else {

		}
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}
}

export function* getFeedForConnector(data: any) {
	try {
		const { payload } = data;
		const {connectorId,oppId} = payload
		yield put(setOpportunityVinteractionsForConnectorAndOwner(undefined));
		yield put(setOpportunityFeed(undefined));
		const feeds: IVInteraction[] = yield call(UtilsEP.getVInteractionsByConnector, connectorId,oppId);
		yield put(setOpportunityFeed(feeds));
		yield put(setOpportunityVinteractionsForConnectorAndOwner(feeds));
	} catch (error) {
		console.log(error);
		yield put(setTargetsAndConnectors([]));
		yield put(setOpportunityVinteractionsForConnectorAndOwner([]));
	}
}

export function* getOpportunityTargetStatuses(data: any) {
	const { payload } = data;
	//yield put(setOpportunityTargetStatuses(undefined))
	try {
		const statuses = yield call(UtilsEP.getOpportunityTargetStatuses, payload);
		yield put(setOpportunityTargetStatuses({ [payload]: statuses }))
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}
export function* getTemplateFieldsDatas(data: any) {
	try {
		const oppTypes = yield call(TemplatesEP.getOpportunityFields);
		let fieldIds: string[] = [];

		for (let i = 0; i < oppTypes.length; i++) {
			oppTypes[i].body = JSON.parse('{"g":' + oppTypes[i].body + '}').g;
			for (let j = 0; j < oppTypes[i].body.length; j++) {
				const type = oppTypes[i].body[j];
				fieldIds = [...fieldIds, ...type.InnerFields.map(item => item.FieldId)];
			}
		}

		const templateArray = yield call(TemplateFieldsEP.getOppTemplatesFields, fieldIds);
		yield put(setTemplateFieldsDates(templateArray));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}
export function* watchOppOverviewSaga() {
	yield all([
		takeLatest(
			OppOverviewTypes.GET_ASSOCIATED_OPPS as any,
			getAssociatedOppsSaga
		),
		takeLatest(OppOverviewTypes.GET_OPP_SUMMARY as any, getOppSummarySaga),
		takeLatest(OppOverviewTypes.GET_OPP_DETAILS as any, getOpportunityDetails),
		takeLatest(
			OppOverviewTypes.GET_OPP_DETAILS_TARGETS_AND_CONNECTORS as any,
			getOppDetailsTargetsAndConnectorsSaga
		),

		takeLatest(
			OppOverviewTypes.CHANGE_TARGET_STATUS as any,
			changeTargetStatusSaga
		),
		takeLatest(
			OppOverviewTypes.CHANGE_ENTITY_DECISION as any,
			changeEntityDecisionSaga
		),
		takeLatest(OppOverviewTypes.CHANGE_OPP_STATUS as any, changeOppStatusSaga),
		takeLatest(
			OppOverviewTypes.GET_PREDEFINED_MESSAGES as any,
			getPredefinedMessagesSaga
		),
		takeLatest(OppOverviewTypes.SEND_INTERACTION as any, sendInteractionSaga),
		takeLatest(OppOverviewTypes.NEW_INTERACTION as any, newInteractionSaga),

		takeLatest(
			OppOverviewTypes.GET_NEW_OPP_DATA as any,
			getNewOppAndTargetProfileSaga
		),
		takeLatest(
			OppOverviewTypes.SEND_SPACIEL_INTERACTION as any,
			sendSpecialInteractionSaga
		),
		takeLatest(
			OppOverviewTypes.GET_TARGET_FEED as any,
			getFeedForTargets
		),
		takeLatest(
			OppOverviewTypes.GET_TARGET as any,
			getTarget
		),
		takeLatest(
			OppOverviewTypes.GET_TARGET_FOR_APPROVAL as any,
			getTargetForApproval
		),
		takeLatest(
			OppOverviewTypes.GET_OPPORTUNITY_FEED as any,
			getFeedForOpportunity
		),
		takeLatest(
			OwnerConnctorOverviewTypes.GET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER as any,
			getOpportunityDetailsFromConnector
		),
		takeLatest(
			OwnerConnctorOverviewTypes.GET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER as any,
			getFeedForConnector
		),
		takeLatest(
			OppOverviewTypes.GET_OPPORTUNITY_TARGET_STATUSES as any,
			getOpportunityTargetStatuses
		),
		takeLatest(
			OppOverviewTypes.GET_TEMPLATE_FIELDS_DATAS as any,
			getTemplateFieldsDatas
		),
		takeLatest(
			OppOverviewTypes.SET_OPPORTUNITY_PIN as any,
			setOpportunityPin
		),
		takeLatest(
			OpportunitiesActionTypes.EDIT_OPPORTUNITY as any,
			editOpportunity
		),
		takeLatest(
			OppOverviewTypes.GET_ALL_PINS as string,
			getAllPins
		),
		takeLatest(
			OppOverviewTypes.DELETE_OPPORTUNITY as any,
			deleteEntity
		),
		takeLatest(
			InteractionsTypes.GET_INTERACTION_DETAILS as any,
			getInteractionDetails
		),
		takeLatest(
			InteractionsTypes.SEE_INTRO_INVITE as any,
			seeIntroInvite
		),
		takeLatest(
			InteractionsTypes.SEND_MESSAGE as any,
			sendMessage
		),
		takeLatest(
			InteractionsTypes.GET_MESSAGES as any,
			getInteractionMessages
		),
		takeLatest(
			InteractionsTypes.SEND_NOTE as any,
			sendNote
		),
		takeLatest(
			OppOverviewTypes.SET_RESET_NOTIFICATION as any,
			getRestNotification
		)
	]);
}
