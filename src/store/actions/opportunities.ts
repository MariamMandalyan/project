import {  OpportunitiesFilterActionTypes, OpportunitiesActionTypes } from "../constants";
import { IOpportunitiesFilter, IOppItem, IEditOpportunityDetails } from "../../types/interfaces";
import { loadFirstData } from "./pagination";

export const setOpportunitiesFilter = (payload:IOpportunitiesFilter) => {
	return {
		type: OpportunitiesFilterActionTypes.SET_FILTER,
		payload
	};
};
export const setOpportunitiesFilterInReducer = (payload:IOpportunitiesFilter) => {
	return {
		type: OpportunitiesFilterActionTypes.SET_FILTER_IN_REDUCER,
		payload
	};
};
export const resetOpportunities = () => {
	return {
		type:OpportunitiesActionTypes.RESET_OPPORTUNITIES
	}

};
export const getOpportunities = (payload:IOpportunitiesFilter) => {
	return loadFirstData(payload,OpportunitiesActionTypes.SET_OPPORTUNITIES)
	// return {
	// 	type: OpportunitiesActionTypes.GET_OPPORTUNITIES,
	// 	payload
	// };
};
export const setOpportunities = (payload:Array<IOppItem>) => {
	return {
		type: OpportunitiesActionTypes.SET_OPPORTUNITIES,
		payload
	};
};
export const setLoadNewPage = () => {
	return {
		type: OpportunitiesActionTypes.SET_LOAD_NEW_PAGE,
	};
};
export const editOpportunityAction = (payload:IEditOpportunityDetails) => {
	return {
		type: OpportunitiesActionTypes.EDIT_OPPORTUNITY,
		payload
	};
};
export const setOpportunitiesParam = (param: number) => ({
	type: OpportunitiesActionTypes.SET_OPPORTUNITIES_PARAM,
	payload: param
});

