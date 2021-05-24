import { OpportunitiesFilterFieldsActionTypes } from "../constants";
import { IFilterMenuEntry, IOpportunitiesFilterFields } from '../../types/interfaces';

export const setOpportunitiesFilterFields = (payload: IOpportunitiesFilterFields) => {
	return {
		type: OpportunitiesFilterFieldsActionTypes.SET_FILTER_FIELDS,
		payload
	};
};
export const getOpportunitiesFilterFields = () => {
	return {
		type: OpportunitiesFilterFieldsActionTypes.GET_FILTER_FIELDS
	};
};

export const setOpportunitiesRolesFilter = (payload: {roles: IFilterMenuEntry[]}) => {
	return {
		type: OpportunitiesFilterFieldsActionTypes.SET_FILTER_ROLES,
		payload
	};
};
