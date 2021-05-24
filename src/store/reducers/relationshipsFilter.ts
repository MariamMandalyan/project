import { IReduxAction, IRelationshipsFilter } from '../../types/interfaces';
import {  RelationshipsFilterActionTypes } from '../constants';

const initialState: IRelationshipsFilter = {
	verticals: [],
	oppTypes: [],
	locations: [],
	interests: [],
	orderBy: 2,
	titleSearch: ""
}

const relationshipsFilterReduser = (
	state = initialState,
	action: IReduxAction<RelationshipsFilterActionTypes>
) => {
	switch (action.type) {
		case RelationshipsFilterActionTypes.SET_FILTER: {
			return   {...state,...action.payload};
		}
		default:
			return state;
	}
};
export default relationshipsFilterReduser;
