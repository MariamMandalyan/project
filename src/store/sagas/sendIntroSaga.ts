import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { SendIntroTypes } from '../constants';
import { EntityEnum, TemplatesEnum } from '../../types/enums';
import { IOpportunitySummary, IStoreProps, ITemplate } from '../../types/interfaces';
import i18n from '../../locale/i18n';
import { OppTargetsEP, TemplatesEP, TemplatesFavoritesEP, OppTypesEP } from '../../services/api/routes';
import { getUserDataSelector } from '../selectors/authSelector';
import {
	setOppData,
	setTemplates,
	updateIntroAction,
	prepareTemplatesFromSaga
} from '../actions/sendIntroActions';
import {
	getOppEntities,
	sendIntroSelector,
	selectTemplates
} from '../selectors/sendIntroSelectors';
import {
	extractIdFromResponseHeaders,
	prepareTemplates,
	templateFieldsToOppSummary,
	errorHandler,
	trackActivity
} from '../../utils';
import { navigationService } from '../../services';
import oppConnectorsEP from '../../services/api/routes/OppConnectors';
import { createIntroForm } from './utils';
import { ScreensEnum } from '../../navigation/screens';
import { entityDetailsSelector } from '../selectors/entitySelector';
import { getNewOppAndTargetProfile, getOppDetailsTargetsAndConnectors, newUpdateInOppDetails } from '../actions/oppOverviewActions';
import { oppOverviewSelector } from '../selectors/oppOverviewSelector';

interface ICreateNewTemplatePayload {
	payload: ITemplate;
}

function* prepareTemplatesSaga(action:{payload:{unSort:boolean}}) {
	try {
		const templatesResponse = yield TemplatesEP.getIntroTemplateFields();
		const oppEntities = yield select(getOppEntities);
		const oldTemplates = yield select(selectTemplates)
		console.log('oppEntities',oppEntities);
		
		const templates = yield prepareTemplates(templatesResponse, oppEntities,!!action.payload.unSort,oldTemplates);
		
		yield put(setTemplates(templates));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('could not load templates');
	}
}

function* saveNewTemplateSaga({ payload }: ICreateNewTemplatePayload) {
	const userData = yield select(getUserDataSelector);
	const { body, title } = payload;
	try {
		//TemplatesEP.
		const response = yield TemplatesEP.create({
			templateTypeId: TemplatesEnum.INTRO_TEMPLATE_ID,
			body,
			title,
			creatorUserId: userData.id,
			timestamp: new Date(),
			templateFavorites:[
				{
					userId:userData.id,
					score: 5
				}
			]
		});
		const savedTemplateId = extractIdFromResponseHeaders(response.headers);
		yield put(updateIntroAction('introMessage', { id: savedTemplateId, body, creatorUserId:userData.id }));
	//	yield put(addSavedTemplate({ body, title, id: savedTemplateId, creatorUserId:userData.id  }));
		yield put(prepareTemplatesFromSaga(true));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Failed saving Template to Server');
	}
}
function* putTemplateSaga({ payload }: ICreateNewTemplatePayload) {
	const userData = yield select(getUserDataSelector);
	const { body, title,id } = payload;
	try {
		if(id){
			yield TemplatesEP.putById(id,{
				id,
				body,
				title,
				creatorUserId: userData.id,
				timestamp: new Date(),
			});

			//const savedTemplateId = extractIdFromResponseHeaders(response.headers);
			yield put(updateIntroAction('introMessage', { id: id, body }));
			yield put(prepareTemplatesFromSaga(true));
		}
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Failed saving Template to Server');
	}
}
function* deleteTemplateSaga({payload}:{payload:ITemplate}) {
	try {
		if(payload.templateFavorites){
			if(payload.templateFavorites.length>0){
				yield TemplatesFavoritesEP.deleteById(payload.templateFavorites[0].id)
			}
		}

		yield TemplatesEP.deleteById(payload?.id);
		yield put(prepareTemplatesFromSaga(true));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}
}

function* addTemplateFavoriteSaga({payload}:any) {
	const userData = yield select(getUserDataSelector);

	try {
		if(payload) {
			yield TemplatesFavoritesEP.create({
				templateId: payload,
				userId: userData.id,
				score: 5
			});
		}
		yield put(prepareTemplatesFromSaga(false));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}
}
function* putTemplateFavoriteSaga({payload}:any) {
	try {
		if(payload) {
			yield TemplatesFavoritesEP.putById(payload.id,payload);
		}
		yield put(prepareTemplatesFromSaga(false));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}
}

export function* connectTargetSaga() {
	const { recordingBase64, introMessage, oppData, attachments, approvals: approvalData } = yield select(
		sendIntroSelector
	);
	const {otherUserProfile} =yield select((state: IStoreProps) => ({
		otherUserProfile: state.otherUserProfile.profile,
	}));

	const approvals = {
		ownerApproval: approvalData.ownerApprovalStatus || (otherUserProfile.approvel && otherUserProfile.approvel.length>0),
		targetApproval: approvalData.targetApprovalStatus,
	};

	const entity = yield select(entityDetailsSelector);

	const {oppDetails} = yield select(oppOverviewSelector);
	const userData = yield select(getUserDataSelector);
	const { id } = oppData;

	if (entity.id) {
	//	yield handleExistingUserPreferencesSaga(entity);
	}

	const interactionForm = yield createIntroForm({
		id,
		entity,
		currentUserId: userData.id,
		recordingBase64,
		introMessage,
		attachments,
		approvals
	});
	try {
		trackActivity('AllSet', 'New Target',{targetUserId:entity.id,opportunityConnectorId:id})
		yield OppTargetsEP.create(interactionForm);
		trackActivity('AllSet', 'New Target',{targetUserId:entity.id,opportunityConnectorId:id})
		yield put(
			getOppDetailsTargetsAndConnectors({
				oppId: oppDetails.id,
				userId: userData.id!,
				role:EntityEnum.CONNECTOR,
				includeTargetStatuses: true,
				unReload:true
			})
		);
		yield put(getNewOppAndTargetProfile(oppDetails.id, EntityEnum.CONNECTOR));
		yield put(newUpdateInOppDetails());
		//yield put(newUpdateInOppDetails());
		//navigationService.navigate(ScreensEnum.OPP_OVERVIEW, { oppId: 'aa595902-7a68-4000-96af-3c7ea50e96cc', role: 0, fromScreenSuccessRedirect: ScreensEnum.REVIEW_INTRO });

		navigationService.navigate(ScreensEnum.OPP_OVERVIEW,{oppId:oppDetails.id,role:EntityEnum.CONNECTOR, fromScreenSuccessRedirect: ScreensEnum.REVIEW_INTRO ,entity:{...entity}});
	} catch (error) {
		navigationService.navigate(ScreensEnum.MODAL, {
			headerText: i18n.t('connectEntities.allSet.connectionFailed.header'),
			message: i18n.t('connectEntities.allSet.connectionFailed.text'),
			actionButtonText: i18n.t(
				'connectEntities.allSet.connectionFailed.actionButtonText'
			),
			onActionButtonPress: () =>
				navigationService.navigate(ScreensEnum.NEW_DASHBOARD)
		});
	}
}

function* getOppDetailsAndTemplatesSaga() {
	try {
		const { chosenOppId } = yield select(sendIntroSelector);
		const oppDetailsAndTemplates = yield call(
			oppConnectorsEP.getOppDetailsAndTemplates,
			chosenOppId
		);
		const { opportunity } = oppDetailsAndTemplates[0];
		const body = yield call(OppTypesEP.getOpportunityBodyFieldsByTypeId,opportunity.opportunityTypeId);

		const oppSummary: Partial<IOpportunitySummary> = templateFieldsToOppSummary(
			opportunity.opportunityTemplates[0].opportunityTemplateFields,
			opportunity.opportunityTypeId,
			JSON.parse(body)
		);
		yield put(updateIntroAction('oppSummary', oppSummary));
		yield put(setOppData(oppDetailsAndTemplates[0]));
	} catch (ex) {
		console.log(ex);
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Failed getOppDetailsAndTemplatesSaga');
	}
}

export function* watchSendIntroSaga() {
	yield all([
		takeLatest(SendIntroTypes.PREPARE_TEMPLATES as any, prepareTemplatesSaga),
		takeLatest(SendIntroTypes.SAVE_NEW_TEMPLATE as any, saveNewTemplateSaga),

		takeLatest(SendIntroTypes.DELETE_TEMPLATE as any, deleteTemplateSaga),
		takeLatest(SendIntroTypes.PUT_TEMPLATE as any, putTemplateSaga),
		takeLatest(SendIntroTypes.SET_TEMPLATE_FAVORITE as any, putTemplateFavoriteSaga),
		takeLatest(SendIntroTypes.ADD_TEMPLATE_FAVORITE as any, addTemplateFavoriteSaga),

		takeLatest(SendIntroTypes.CONNECT_TARGET as any, connectTargetSaga),
		takeLatest(
			SendIntroTypes.GET_OPP_DETAILS_AND_TEMPLATES as any,
			getOppDetailsAndTemplatesSaga
		)
	]);
}
