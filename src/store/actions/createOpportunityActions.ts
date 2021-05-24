import { CreateOpportunityTypes, OpportunityTypesTypes } from '../constants';
import { ICreateOpInitialState } from '../reducers/createOpportunityReducer';
import {
	IOppType,
	IOppTemplateFieldPayload,
	PlainFunction,
	IOpportunityType
} from '../../types/interfaces';
import { TemplatesEnum } from '../../types/enums';
import { createErrorAction, createSuccessAction } from './utils';

export const updateOpportunity = (
	key: keyof ICreateOpInitialState,
	value: any
) => ({
	type: CreateOpportunityTypes.UPDATE_OPPORTUNITY,
	payload: {
		key,
		value: value
	}
});
export const updateOpportunityField = (
	key: keyof ICreateOpInitialState,
	value: any
) => ({
	type: CreateOpportunityTypes.UPDATE_OPPORTUNITY_FIELD,
	payload: {
		key,
		value: value
	}
});
export const getOppTypes = () => ({
	type: CreateOpportunityTypes.GET_OPP_TYPES
});
export const setOppTypes = (oppTypes: Array<IOpportunityType>) => ({
	type: OpportunityTypesTypes.SET_OPPORTUNITY_TYPES,
	payload: oppTypes
});
export const setFieldsDatas = (oppTypes: Array<IOppType>) => ({
	type: CreateOpportunityTypes.SET_FIELD_DATAS,
	payload: oppTypes
});
export const setOpportunityType = (oppTypes: Array<IOppType>) => ({	
	type: CreateOpportunityTypes.SET_DETAIL_FIELD,
	payload: oppTypes
});
export const setOppId = (oppId: string) => ({	
	type: CreateOpportunityTypes.SET_OPPID,
	payload: oppId
});
export const getOppTemplateField = (templateFieldId: TemplatesEnum) => ({
	type: CreateOpportunityTypes.GET_TEMPLATE_FIELD,
	payload: templateFieldId
});
export const getRelationShipContacts = () => ({
	type: CreateOpportunityTypes.GET_RELATIONSHIPS_CONTACTS,
});
export const setRelationShipContacts = (params: {
	count: number;
	relationContacts: any;
}) => ({
	type: CreateOpportunityTypes.SET_RELATIONSHIPS_CONTACTS,
	payload: params
});
export const setOppTemplateField = (
	templateFieldPayload: IOppTemplateFieldPayload
) => ({
	type: CreateOpportunityTypes.SET_TEMPLATE_FIELD,
	payload: templateFieldPayload
});
export const submitOpportunity = (callback: PlainFunction) => {
	return {
		type: CreateOpportunityTypes.SUBMIT_OPPORTUNITY,
		payload: callback,
		meta: {
			loading: true
		}
	};
};
export const submitOpportunitySuccess = createSuccessAction(
	CreateOpportunityTypes.SUBMIT_OPPORTUNITY
);
export const submitOpportunityError = createErrorAction(
	CreateOpportunityTypes.SUBMIT_OPPORTUNITY
);

export const resetCreateOppState = () => ({
	type: CreateOpportunityTypes.RESET_CREATE_OPP_STATE
});

export const setAddNewConnectorConfig = () => ({
	type: CreateOpportunityTypes.SET_ADD_NEW_CONNECTOR_CONFIG
});

export const addNewConnector = (callback: PlainFunction) => ({
	type: CreateOpportunityTypes.ADD_NEW_CONNECTOR,
	payload: callback,
	meta: {
		loading: true
	}
});

export const addNewConnectorSuccess = createSuccessAction(
	CreateOpportunityTypes.ADD_NEW_CONNECTOR
);
export const addNewConnectorError = createErrorAction(
	CreateOpportunityTypes.ADD_NEW_CONNECTOR
);
