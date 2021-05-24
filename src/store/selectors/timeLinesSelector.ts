import { IStoreProps } from "../../types/interfaces";

//export const timeLineSelector = (state: IStoreProps) => state.timeLines;
export const timeLineFilterSelector = (state: IStoreProps) => state.timeLineFilter.filter;
//export const timeLineFilterFieldsSelector = (state: IStoreProps) => state.timeLineFilter.filterFields;
export const timeLineFilterSavedSelector = (state: IStoreProps) => state.timeLineFilter.filterSaved;