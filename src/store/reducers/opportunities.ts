import { IOpportunitiesTypes, IReduxAction } from '../../types/interfaces';
import { OpportunitiesActionTypes, PaginationActionTypes } from '../constants';
import { COUNT_PER_PAGE } from '../../types/constants';

const initialState: IOpportunitiesTypes = {
	isLoading: false,
	isPaginationLoading: false,
	opportunities: [],
	param: -1,
	reachEnd:false,
	count:0,
	empty: true,
};

const opportunitiesReducer = (
	state = initialState,
	action: IReduxAction<OpportunitiesActionTypes | PaginationActionTypes>
) => {
	switch (action.type) {
		case OpportunitiesActionTypes.RESET_OPPORTUNITIES:{
			return initialState
		}
		case OpportunitiesActionTypes.SET_OPPORTUNITIES: {
			const { opportunities, count } = action.payload;
			return {
				...state,
				opportunities: opportunities,
				isPaginationLoading: false,
				isLoading: false,
				count,
				empty: action.payload.opportunities.length === 0,
				reachEnd: opportunities?.length < COUNT_PER_PAGE,
			};
		}
		case OpportunitiesActionTypes.SET_OPPORTUNITIES_LAZY: {
			return {
				...state,
				opportunities: [...state.opportunities,...action.payload],
				isLoading: false,
				empty: action?.payload?.length == 0,
				reachEnd: action?.payload?.length < COUNT_PER_PAGE,
				isPaginationLoading: false,
			};
		}
		case PaginationActionTypes.LOAD_DATA: {
			return { ...state, isPaginationLoading: action.action === OpportunitiesActionTypes.SET_OPPORTUNITIES };
		}
		case PaginationActionTypes.LOAD_FIRST_DATA: {
			return { ...state, isLoading: true };
		}
		case OpportunitiesActionTypes.SET_OPPORTUNITIES_PARAM: {
			return { ...state, param: action.payload };
		}
		default:
			return state;
	}
};
export default opportunitiesReducer;
