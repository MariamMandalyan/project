import { IReduxAction, INotificationFilterField } from '../../types/interfaces';
import { NotificationsActionTypes } from '../constants';

const initialState: INotificationFilterField = {
	filter: {
		opportunities: [],
		persons: [],
		roles: []
	},
	filterFields: {},
	filterSaved: {
		opportunities: [],
		persons: [],
		roles: []
	}
}

const notificationFilterReducer = (
	state = initialState,
	action: IReduxAction<NotificationsActionTypes>
) => {
	switch (action.type) {
		case NotificationsActionTypes.SET_FILTER: {
			return {
				...state,
				filter: {
					...state.filter,
					...action.payload
				}
			}
		}
		case NotificationsActionTypes.CLEAR_FILTER: {
			return {
				...state,
				filter: {
					opportunities: [],
					persons: [],
					roles: []
				},
				filterSaved: {
					opportunities: [],
					persons: [],
					roles: []
				}
			}
		}
		case NotificationsActionTypes.DONT_SAVE_FILTER: {
			return {
				...state,
				filter: { ...state.filterSaved }
			}
		}
		case NotificationsActionTypes.SAVE_FILTER: {
			return {
				...state,
				filterSaved: { ...state.filter }
			}
		}
		case NotificationsActionTypes.SET_FILTER_FIELDS: {
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
export default notificationFilterReducer;
