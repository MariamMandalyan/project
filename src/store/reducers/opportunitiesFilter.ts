import { IReduxAction, IOpportunitiesFilter } from '../../types/interfaces';
import {  OpportunitiesFilterActionTypes } from '../constants';

const initialState: IOpportunitiesFilter = {
	verticals: [],
	oppTypes: [],
	statuses: [],
	roles: [],
	titleSearch: "",
	oppOrder: 0,
};

const opportunitiesFilterReducer = (
	state = initialState,
	action: IReduxAction<OpportunitiesFilterActionTypes>
) => {
	switch (action.type) {
		case OpportunitiesFilterActionTypes.SET_FILTER_IN_REDUCER: {
			return   {...state,...action.payload};
		}
		default:
			return state;
	}
};

export default opportunitiesFilterReducer;
