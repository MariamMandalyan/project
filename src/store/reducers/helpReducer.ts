import {IHelpReducer, IReduxAction} from '../../types/interfaces';
import {HelpActionTypes} from '../constants';

const initialState: IHelpReducer = {
	categories: [],
	isCategoriesLoading: false,
	topics: [],
	isTopicsLoading: false
}

const helpReducer = (
	state = initialState,
	action: IReduxAction<HelpActionTypes>
) => {
	switch (action.type) {
		case HelpActionTypes.GET_CATEGORIES: {
			return {
				...state,
				isCategoriesLoading: true
			}
		}
		case HelpActionTypes.GET_TOPICS: {
			return {
				...state,
				isTopicsLoading: true
			}
		}
		case HelpActionTypes.SET_TOPICS: {
			const { topics } = action.payload;

			return {
				...state,
				topics,
				isTopicsLoading: false
			}
		}
		case HelpActionTypes.SET_CATEGORIES: {
			const { categories } = action.payload;

			return {
				...state,
				categories: [...state.categories, ...categories],
				isCategoriesLoading: false
			}
		}
		default:
			return state;
	}
};
export default helpReducer;
