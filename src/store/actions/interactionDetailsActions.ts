import { INewMessagePayload,INewNotePayload, IVInteraction } from '../../types/interfaces';
import { InteractionsTypes } from '../constants';
export const getIntaractionDetails = (data) => ({
	type: InteractionsTypes.GET_INTERACTION_DETAILS,
	payload: data
});
export const seeIntroInvite = (data) => ({
	type: InteractionsTypes.SEE_INTRO_INVITE,
	payload: data
});
export const sendMessage = (data:INewMessagePayload) => ({
	type: InteractionsTypes.SEND_MESSAGE,
	payload: data
});
export const getMessages = (id:string, from:string,to:string) => ({
	type: InteractionsTypes.GET_MESSAGES,
	payload: {id,from,to}
});
export const setMessages = (payload?:IVInteraction[]) => ({
	type: InteractionsTypes.SET_MESSAGES,
	payload
});
export const sendNote = (data:INewNotePayload) => ({
	type: InteractionsTypes.SEND_NOTE,
	payload: data
});
export const setIntaractionDetails = (data) => ({
	type: InteractionsTypes.SET_INTERACTION_DETAILS,
	payload: data
});
// export const getSummaryData = createRequestAction(
// 	InteractionsTypes.GET_SUMMARY_DATA,
// 	(coldStartTime: string) => ({
// 		request: {
// 			url: '/Utils/CalcGeneralSumData',
// 			params: {
// 				fromDate: coldStartTime,
// 			}
// 		}
// 	})
// );

// export const getInteractionsData = createPaginatedRequestAction(
// 	createInteractionsAction(InteractionsTypes.GET_INTERACTIONS)
// );

// export const approveOpp = (payload: { id: string, role: string, callback?: () => void }) => ({
// 	type: InteractionsTypes.APPROVE_OPP,
// 	payload,
// });

// export const declineOpp = (payload: { id: string, role: string, callback?: () => void }) => ({
// 	type: InteractionsTypes.DECLINE_OPP,
// 	payload,
// });

// export const clearInteractionState = createClearAction(
// 	InteractionsTypes.GET_INTERACTIONS
// );
