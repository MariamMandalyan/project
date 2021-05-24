import { put, all, takeLatest, select, call } from 'redux-saga/effects';

import { CreateOpportunityTypes } from '../constants';
import { navigationService } from '../../services';
import { createOpportunitySelector } from '../selectors/createOpportunitySelectors';
import { ICreateOpInitialState } from '../reducers/createOpportunityReducer';
import {
	getAuthStateSelector,
	getUserDataSelector
} from '../selectors/authSelector';
import {
	OpportunitiesEP,
	TemplateFieldsEP,
	TemplatesEP
} from '../../services/api/routes';
import { TemplatesEnum, EntityEnum } from '../../types/enums';
import { extractIdFromResponseHeaders, errorHandler, trackActivity } from '../../utils';
import { createNewOppForm } from './utils';
import oppConnectorsEP from '../../services/api/routes/OppConnectors';
import {
	addNewConnectorError,
	addNewConnectorSuccess,
	resetCreateOppState, setFieldsDatas,
	setOppTemplateField,
	submitOpportunityError,
	setOppId,
	setRelationShipContacts
} from '../actions/createOpportunityActions';
import { getNewOppAndTargetProfile, getOppDetailsTargetsAndConnectors, getOpportunityFeed } from '../actions/oppOverviewActions';
import { setOppTypes } from '../actions/createOpportunityActions';
import {
	IPayload,
	IOppTemplateFieldPayload,
	PlainFunction,
	IOpportunityType,
	IOppItem
} from '../../types/interfaces';
import {
	setSelectedOppAndRole
} from '../actions/oppOverviewActions';
import {
	oppOverviewSelector,
	IOppOverViewState
} from '../selectors/oppOverviewSelector';
import { ScreensEnum } from '../../navigation/screens';
import { entityDetailsSelector } from '../selectors/entitySelector';
import { IEntity } from '../../types/interfaces';
import createNewconnectorForm from './utils/createNewConnectorForm';
import i18n from '../../locale/i18n';
import { relationShipContacts } from './relationshipFilter';

export interface ITemplate {
	[key: string]: { id: string; title: string }[];
}
function* getOppTypes() {
	try {
		const oppTypes:IOpportunityType[] = yield call(TemplatesEP.getOpportunityFields);
		let fieldIds: string[] = [];

		for (let i = 0; i < oppTypes.length; i++) {
			oppTypes[i].body = JSON.parse('{"g":' + oppTypes[i].body + '}').g;
			for (let j = 0; j < oppTypes[i].body.length; j++) {
				const type = oppTypes[i].body[j];
				fieldIds = [...fieldIds, ...type.InnerFields.map(item => item.FieldId)];
			}
		}
		const templateArray = yield call(TemplateFieldsEP.getOppTemplatesFields, fieldIds);

		yield put(setFieldsDatas(templateArray));
		yield put(setOppTypes(oppTypes));
	} catch (ex) {
		//errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Error fetching OppTypes', ex);
	}
}

function* getOppTemplateFieldSaga({ payload }: IPayload<TemplatesEnum>) {
	try {
		const templateArray = yield call(
			TemplateFieldsEP.getOppTemplateFields,
			payload
		);
		const templateData = templateArray.value[0];
		const templateField: IOppTemplateFieldPayload = {
			key: payload,
			value: JSON.parse(templateData.lookupData)
		};
		yield put(setOppTemplateField(templateField));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Error fetching getOppTemplateFieldSaga', ex);
	}
}
function* getRelationShipsContacts(payload: any) {
	try {
		//  const contacts = yield relationShipContacts()
		 const { Data: relationContacts, Count }: IOppItem[] = yield relationShipContacts()
		 const sorted:any[] = relationContacts.sort((a,b)=>{
            if(a.firstName>b.firstName){
                return 1
            }else{
                return -1
            }
        })
		 yield put(setRelationShipContacts({ relationContacts:sorted, count: Count }));
	} catch (ex) {
	  console.log(ex);
	}
  }
function* submitOpportunity({ payload: callback }: IPayload<PlainFunction>) {
	const {
		opTitle,
		role,
		msgTextToEntity,
		opportunityFields,
		fieldsDatas,
		createdByUserId,
		opportunityType
	} = yield select(createOpportunitySelector);

	const { userData } = yield select(getAuthStateSelector);
	const entity: IEntity = yield select(entityDetailsSelector);

	if (entity.id) {
		//	yield handleExistingUserPreferencesSaga(entity);
	}

	const data = createNewOppForm({
		role,
		entity,
		currentUserId: userData.id,
		msgTextToEntity,
		opTitle,
		oppTypeId: opportunityType.opportunityTypes[0].id,
		opportunityFields,
		fieldsDatas,
		createdByUserId,
	});
	
	try {
		const createOppResponse = yield OpportunitiesEP.create(data);
		const newOppId = extractIdFromResponseHeaders(createOppResponse.headers);		
		yield put(setOppId(newOppId))
		trackActivity('OpportunityDetails', 'New Opportunity',{oppId:newOppId})
		//yield put(resetOppOverviewState());
		//yield put(setNewOppForModal());
		//yield put(setSelectedOppAndRole({ role: role!, oppId: newOppId }));
		console.log('newOppId',newOppId);
		
		yield callback(newOppId);
		//yield navigationService.navigate(ScreensEnum.OPPORTUNITY_CREATED);
		//yield put(resetCreateOppState());
		//yield put(submitOpportunitySuccess());
	} catch (ex) {
		yield put(submitOpportunityError())
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }), () => {
			callback('');
			navigationService.navigate(ScreensEnum.NEW_DASHBOARD);
		})

	}
}

function* addNewConnectorSaga({ payload: callback }: IPayload<PlainFunction>) {
	
	const { oppDetails }: IOppOverViewState = yield select(
		oppOverviewSelector
	);
	const { msgTextToEntity }: ICreateOpInitialState = yield select(
		createOpportunitySelector
	);
	const entity = yield select(entityDetailsSelector);
	const userData = yield select(getUserDataSelector);

	if (entity.id) {
		// yield handleExistingUserPreferencesSaga(entity);
	}
		
	try {
		const data = createNewconnectorForm({
			entity,
			userId: userData.id,
			oppId: oppDetails.id,
			msgTextToEntity
		});
		trackActivity('OpportunityDetails', 'New Connector',{oppId:oppDetails.oppId,connectorUserId:entity.id})

		yield oppConnectorsEP.create(data);
		trackActivity('OpportunityDetails', 'New Connector',{oppId:oppDetails.oppId,connectorUserId:entity.id})
		yield callback();
		yield all([
			// put(resetCreateOppState()),
			//put(resetOppOverviewState()),
			put(
				setSelectedOppAndRole({
					oppId: oppDetails.oppId,
					role: EntityEnum.OWNER
				})
			)
		]);
		yield put(
			getOppDetailsTargetsAndConnectors({
				oppId: oppDetails.id,
				userId: userData.id!,
				role:EntityEnum.CONNECTOR,
				includeTargetStatuses: true,
				unReload:true
			})
		);
		yield put(getOpportunityFeed(oppDetails.id))
		yield put(getNewOppAndTargetProfile(oppDetails.id, EntityEnum.OWNER));
		yield put(addNewConnectorSuccess());
	} catch (ex) {
		yield put(addNewConnectorError());
		console.log('Failed addNewConnectorSaga', ex);
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }), () => {
			navigationService.navigate(ScreensEnum.NEW_DASHBOARD);
		}
	)
	}

}

export function* watchCreateOppSaga() {
	yield all([
		takeLatest(
			CreateOpportunityTypes.SUBMIT_OPPORTUNITY as any,
			submitOpportunity
		),
		takeLatest(
			CreateOpportunityTypes.ADD_NEW_CONNECTOR as any,
			addNewConnectorSaga
		),
		takeLatest(
			CreateOpportunityTypes.GET_TEMPLATE_FIELD as any,
			getOppTemplateFieldSaga
		),
		takeLatest(
			CreateOpportunityTypes.GET_RELATIONSHIPS_CONTACTS as any,
			getRelationShipsContacts
		),
		takeLatest(CreateOpportunityTypes.GET_OPP_TYPES as any, getOppTypes)
	]);
}
