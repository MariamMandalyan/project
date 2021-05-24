import { InteractionsTypes } from '../constants';
import {
	createInteractionsAction,
	createPaginatedRequestAction,
	createRequestAction,
	createClearAction
} from './utils';

export const getSummaryData = createRequestAction(
	InteractionsTypes.GET_SUMMARY_DATA,
	(coldStartTime: string) => ({
		request: {
			url: '/Utils/CalcGeneralSumData',
			params: {
				fromDate: coldStartTime,
			}
		}
	})
);

export const getInteractionsData = createPaginatedRequestAction(
	createInteractionsAction(InteractionsTypes.GET_INTERACTIONS)
);

export const approveOpp = (payload: { id: string, role: string, callback?: () => void }) => ({
	type: InteractionsTypes.APPROVE_OPP,
	payload,
});

export const declineOpp = (payload: { id: string, role: string, callback?: () => void }) => ({
	type: InteractionsTypes.DECLINE_OPP,
	payload,
});

export const clearInteractionState = createClearAction(
	InteractionsTypes.GET_INTERACTIONS
);
