import {  MainTypes } from '../constants';
import { useReducer } from 'react';
interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IMainState {
    users: [],
}


export const initialState: IMainState = {
    users: [],
}
const mainReducer = (state = initialState, action: IReduxAction<MainTypes>) => {
    switch (action.type) {
        case MainTypes.SETUSERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}
export default mainReducer;