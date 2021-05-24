import {IInterestsTypes, IReduxAction} from '../../types/interfaces';
import {InterestsActionTypes} from '../constants';

const initialState: IInterestsTypes = {
	isLoading: false,
	isTypesLoading: false,
	interests: [],
	typesInterests: []
}

const interestsReduser = (
	state = initialState,
	action: IReduxAction<InterestsActionTypes>
) => {
	switch (action.type) {
		case InterestsActionTypes.SET_INTERESTS: {
			const { interests } = action.payload;
			return {
				...state,
				interests,
				isLoading: false,
			};
		}
		case InterestsActionTypes.SET_INTERESTS_TYPES: {
			const { typesInterests } = action.payload;
			return {
				...state,
				typesInterests,
				isTypesLoading: false,
			};
		}
		case InterestsActionTypes.GET_INTERESTS: {
			return   {...state, isLoading: true};
		}
		case InterestsActionTypes.GET_INTERESTS_TYPES: {
			return   {...state, isTypesLoading: true};
		}
		default:
			return state;
	}
};
export default interestsReduser;
