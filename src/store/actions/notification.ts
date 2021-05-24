import { NotificationsActionTypes } from "../constants";
import { INotificationResponseItem, INotificationFilter } from "../../types/interfaces";

export const getNotifications = (payload:Date) => {
	return {
		type: NotificationsActionTypes.GET_NOTIFICATION,
		payload
	};
};
export const setNotifications = (payload:INotificationResponseItem[]) => {
	return {
		type: NotificationsActionTypes.SET_NOTIFICATION,
		payload
	};
};
export const readNotifications = (payload:{ids:string[],userId:string}) => {
	return {
		type: NotificationsActionTypes.READ_NOTIFICATIONS,
		payload
	};
};

export const getFilter = (all:boolean = true) => {
	return {
		type: NotificationsActionTypes.GET_FILTER_FIELDS,
		payload:all
	};
};
export const setFilter = (payload:INotificationFilter) => {
	return {
		type: NotificationsActionTypes.SET_FILTER,
		payload
	};
};

export const setFilterFileds = (payload:INotificationFilter) => {
	return {
		type: NotificationsActionTypes.SET_FILTER_FIELDS,
		payload
	};
};

export const saveFilter = () => {
	return {
		type: NotificationsActionTypes.SAVE_FILTER
		};
};
export const dontSaveFilter = () => {
	return {
		type: NotificationsActionTypes.DONT_SAVE_FILTER
		};
};
export const clearFilter = () => {
	return {
		type: NotificationsActionTypes.CLEAR_FILTER
	};
};

