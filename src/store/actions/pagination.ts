import {  PaginationActionTypes } from '../constants';
import { ILazyLoaderData } from '../../types/interfaces';

export const loadDataByPage = (payload:ILazyLoaderData, action:string) => ({
    type: PaginationActionTypes.LOAD_DATA,
    payload,
    action
});

export const loadFirstData = (payload:ILazyLoaderData, action:string) => ({
    type: PaginationActionTypes.LOAD_FIRST_DATA,
    payload:payload,
    action

});
export const makeAction = (type:string, payload:any) => ({
    type,
    payload
});

