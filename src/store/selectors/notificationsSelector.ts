import { IStoreProps } from "../../types/interfaces";

export const notificationSelector = (state: IStoreProps) => state.notifications;
export const notificationFilterSelector = (state: IStoreProps) => state.notificationFilter.filter;
export const notificationFilterFieldsSelector = (state: IStoreProps) => state.notificationFilter.filterFields;
export const notificationFilterSavedSelector = (state: IStoreProps) => state.notificationFilter.filterSaved;