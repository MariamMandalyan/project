import { TimeLineActionTypes } from "../constants";
import { ITimeLineResponseItem, ITimeLineFilter } from "../../types/interfaces";

export const getTimeLines = (payload:Date) => {
	return {
		type: TimeLineActionTypes.GET_TIMELINE,
		payload
	};
};
export const setTimeLines = (payload:ITimeLineResponseItem[]) => {
	return {
		type: TimeLineActionTypes.SET_TIMELINE,
		payload
	};
};
export const readTimeLines = (payload:{ids:string[],userId:string}) => {
	return {
		type: TimeLineActionTypes.READ_TIMELINE,
		payload
	};
};

export const getFilter = () => {
	return {
		type: TimeLineActionTypes.GET_FILTER_FIELDS
	};
};
export const setFilter = (payload:ITimeLineFilter) => {
	return {
		type: TimeLineActionTypes.SET_FILTER,
		payload
	};
};

export const setFilterFileds = (payload:ITimeLineFilter) => {
	return {
		type: TimeLineActionTypes.SET_FILTER_FIELDS,
		payload
	};
};

export const saveFilter = () => {
	return {
		type: TimeLineActionTypes.SAVE_FILTER
		};
};
export const dontSaveFilter = () => {
	return {
		type: TimeLineActionTypes.DONT_SAVE_FILTER
		};
};
export const clearFilter = () => {
	return {
		type: TimeLineActionTypes.CLEAR_FILTER
	};
};