import { IReduxAction, IInteractionType } from '../../types/interfaces';
import { InteractionTypeTypes } from '../constants';


const initialState: IInteractionType[] = []

const interactionTypeReducer = (
	state = initialState,
	action: IReduxAction<InteractionTypeTypes>
) => {
	switch (action.type) {
		case InteractionTypeTypes.SET_INTERACTION_TYPES: {
			return  action.payload;
		}
		default:
			return state;
	}
};
export default interactionTypeReducer;
