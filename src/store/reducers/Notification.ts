import { IReduxAction, INotificationResponseItem } from '../../types/interfaces';
import {  NotificationsActionTypes } from '../constants';

const initialState: INotificationResponseItem[] =[]

const notificationsReducer = (
	state = initialState,
	action: IReduxAction<NotificationsActionTypes>
) => {
	switch (action.type) {
		case NotificationsActionTypes.SET_NOTIFICATION_LAZY:{
			let list 
			if(action.payload.length == 0){
				list = []
			}
			else{
				list = action.payload
			}
			return [...state,...list];
		}
		case NotificationsActionTypes.SET_NOTIFICATION: {
			let list 
			if(action.payload.length == 0){
				list = null
			}
			else{
				list = action.payload
			}
			return list;
		}
		default:
			return state;
	}
};
export default notificationsReducer;
