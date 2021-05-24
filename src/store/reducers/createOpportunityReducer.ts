import { EntityEnum, ProccessTypeEnum } from '../../types/enums';
import { CreateOpportunityTypes } from '../constants';
import { IReduxAction, IOppInfo } from '../../types/interfaces';

/*
opTitle,
role,
msgTextToEntity,
opportunityFields,
fieldsDatas,
createdByUserId,
opportunityType
*/
export interface ICreateOpInitialState {
	oppTypes: [];
	isTemplateArrived: boolean;
	opType: IOppInfo;
	opTitle: string;
	role: EntityEnum | null;
	createdByUserId: string | null;
	msgTextToEntity: string;
	processType: ProccessTypeEnum;
	opportunityType: any;
	fieldsDatas: any[];
	opportunityFields: { [key: string]: any };
	oppId: string | null;
	// relationShipContacts: any[]
}

const initialState: ICreateOpInitialState = {
	oppTypes: [],
	isTemplateArrived: false,
	opType: { id: '', title: '' },
	opTitle: '',
	role: null,
	msgTextToEntity: '',
	fieldsDatas: [],
	opportunityType: {},
	processType: ProccessTypeEnum.CREATING_NEW_OPP,
	opportunityFields: {},
	createdByUserId: null,
	oppId: null,
	relationShipContacts: null
};

const createOpportunityReducer = (
	state = initialState,
	action: IReduxAction<CreateOpportunityTypes>
) => {
	switch (action.type) {
		case CreateOpportunityTypes.UPDATE_OPPORTUNITY:
			return {
				...state,
				[action.payload.key]: action.payload.value
			};
		case CreateOpportunityTypes.UPDATE_OPPORTUNITY_FIELD:
			return {
				...state,
				opportunityFields:
				{
					...state.opportunityFields,
					[action.payload.key]: action.payload.value
				}
			};
		case CreateOpportunityTypes.RESET_CREATE_OPP_STATE:
			const {fieldsDatas,...rest} = initialState
			return {
				...state,
				...rest,
			};
		case CreateOpportunityTypes.SET_ADD_NEW_CONNECTOR_CONFIG:
			return {
				...state,
				role: EntityEnum.OWNER,
				processType: ProccessTypeEnum.ADDING_NEW_CONNECTOR
			};
		case CreateOpportunityTypes.SET_TEMPLATE_FIELD:
			return {
				...state,
				[action.payload.key]: action.payload.value
			};
		case CreateOpportunityTypes.SET_OPP_TYPES:
			return {
				...state,
				oppTypes: action.payload
			};
		case CreateOpportunityTypes.SET_FIELD_DATAS:
			return {
				...state,
				fieldsDatas: action.payload
			};
		case CreateOpportunityTypes.SET_DETAIL_FIELD:
			return {
				...state,
				opportunityType: action.payload
			};
		case CreateOpportunityTypes.SET_OPPID:					
			return {
				...state,
				oppId: action.payload
			};
		case CreateOpportunityTypes.SET_RELATIONSHIPS_CONTACTS:					
			return {
				...state,
				relationShipContacts: action.payload.relationContacts
			};
		default:
			return state;
	}
};

export default createOpportunityReducer;
