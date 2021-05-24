import { DeepLinksTypes } from '../constants';
import { DynamicObject, IReduxAction } from '../../types/interfaces';

export interface IDeepLinksReducerState {
	deepLinkParams: DynamicObject<string> | null;
}

const initialState: IDeepLinksReducerState = {
	deepLinkParams: null
};

const deepLinksReducer = (
	state = initialState,
	action: IReduxAction<DeepLinksTypes>
) => {
	switch (action.type) {
		case DeepLinksTypes.CLEAR_DEEP_LINK:
			return {
				...state,
				deepLinkParams: null
			};

		case DeepLinksTypes.SET_DEEP_LINK:
			return {
				...state,
				deepLinkParams: action.payload
			};
			case DeepLinksTypes.SET_USER_ID:
					return {
						...state,
						deepLinkParams: {...state.deepLinkParams,...action.payload }
					};
		default:
			return state;
	}
};

export default deepLinksReducer;
