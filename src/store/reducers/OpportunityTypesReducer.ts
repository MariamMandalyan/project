import { IReduxAction, IInteractionType } from '../../types/interfaces';
import { OpportunityTypesTypes } from '../constants';


const initialState: IInteractionType[] = []

const opportunityTypesReducer = (
	state = initialState,
	action: IReduxAction<OpportunityTypesTypes>
) => {
	switch (action.type) {
		case OpportunityTypesTypes.SET_OPPORTUNITY_TYPES: {
			return  action.payload;
		}
		default:
			return state;
	}
};
export default opportunityTypesReducer;
