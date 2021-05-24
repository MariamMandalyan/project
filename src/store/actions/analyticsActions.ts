import { AnalyticsActionTypes } from "../constants";
import { IAnalytics, GetAnalyticsProps } from "../../types/interfaces";

export const getAnalytics = (payload:GetAnalyticsProps) => {
	return {
		type: AnalyticsActionTypes.GET_ANALYTICS,
		payload
	};
};
export const setAnalytics = (payload:IAnalytics) => {
	return {
		type:  AnalyticsActionTypes.SET_ANALYTICS,
		payload
	};
};

