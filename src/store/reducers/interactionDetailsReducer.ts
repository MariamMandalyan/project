import { IReduxAction, IInteractionDetails } from '../../types/interfaces';
import { InteractionsTypes } from '../constants';


const initialState: IInteractionDetails = {
	
}
const interactionDetailsReducer = (
	state = initialState,
	action: IReduxAction<InteractionsTypes>
) => {
	switch (action.type) {
		case InteractionsTypes.SET_INTERACTION_DETAILS: {
			return  action.payload;
		}
		default:
			return state;
	}
};
export default interactionDetailsReducer;
