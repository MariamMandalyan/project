import { AffiliateActionsTypes, AnalyticsActionTypes } from "../constants";
import { IAnalytics, GetAnalyticsProps, IAffilate } from "../../types/interfaces";

export const addAffiliate = (payload:IAffilate) => {
	return {
		type: AffiliateActionsTypes.ADD_AFFILIATE,
		payload
	};
};

