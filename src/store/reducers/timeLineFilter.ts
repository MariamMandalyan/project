import { IReduxAction, ITimeLineFilterField } from '../../types/interfaces';
import { TimeLineActionTypes } from '../constants';

const initialState: ITimeLineFilterField = {
	filter: {
		interactionTypes:[],
		persons:[],
		dates:[]
	},
	filterFields: {},
	filterSaved: {
		interactionTypes:[],
		persons:[],
		dates:[]
	}
}
 
const timeLineFilterReducer = (
	state = initialState,
	action: IReduxAction<TimeLineActionTypes>
) => {
	switch (action.type) {
		case TimeLineActionTypes.SET_FILTER: {
			return {
				...state,
				filter: {
					...state.filter,
					...action.payload
				}
			}
		}
		case TimeLineActionTypes.CLEAR_FILTER: {
			return {
				...state,
				filterSaved:{
					interactionTypes:[],
					persons:[],
					dates:[]
				},
				filter: {
					interactionTypes:[],
					persons:[],
					dates:[]
				}
			}
		}
		case TimeLineActionTypes.DONT_SAVE_FILTER: {
			return {
				...state,
				filter: { ...state.filterSaved }
			}
		}
		case TimeLineActionTypes.SAVE_FILTER: {
			return {
				...state,
				filterSaved: { ...state.filter }
			}
		}
		case TimeLineActionTypes.SET_FILTER_FIELDS: {
			return {
				...state,
				filterFields: {
					...state.filterFields,
					...action.payload
				}
			}

		}
		default:
			return state;
	}
};
export default timeLineFilterReducer;