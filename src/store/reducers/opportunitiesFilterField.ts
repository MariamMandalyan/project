import { IReduxAction, IOpportunitiesFilterFields } from '../../types/interfaces';
import { OpportunitiesFilterFieldsActionTypes } from '../constants';

const initialState: IOpportunitiesFilterFields = {
	oppTypes: [],
	verticals: [],
	statuses: [],
	roles: [],
	getting: false,
	requestSend: false,
};

const opportunitiesFilterFieldReducer = (
	state = initialState,
	action: IReduxAction<OpportunitiesFilterFieldsActionTypes>
) => {
	switch (action.type) {
		case OpportunitiesFilterFieldsActionTypes.GET_FILTER_FIELDS: {
			return { ...state, requestSend: true };
		}
		case OpportunitiesFilterFieldsActionTypes.SET_FILTER_FIELDS: {
			return {
				...state,
				...action.payload,
				getting: true,
				requestSend: false,
			};
		}
		case OpportunitiesFilterFieldsActionTypes.SET_FILTER_ROLES: {
			return {
				...state,
				...action.payload,
			};
		}
		default:
			return state;
	}
};
export default opportunitiesFilterFieldReducer;
