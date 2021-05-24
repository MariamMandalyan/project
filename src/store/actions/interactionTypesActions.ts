import { InteractionTypeTypes } from '../constants';
import { IInteractionType } from '../../types/interfaces';
export const getInteractionsTypes = () => ({
	type: InteractionTypeTypes.GET_INTERACTION_TYPES
});


export const setInteractionsTypes = (payload:IInteractionType[]) => ({
	type: InteractionTypeTypes.SET_INTERACTION_TYPES,
	payload
});
