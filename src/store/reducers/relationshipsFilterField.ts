import { IReduxAction, IRelationshipsFilterFileds } from '../../types/interfaces';
import { RelationshipsFilterFieldsActionTypes } from '../constants';

const initialState: IRelationshipsFilterFileds = {
	locations:[],
	oppTypes:[],
	verticals:[],
	interests: [],
	getting:false,
	requestSend:false
}

const RelationshipsFilterFieldReduser = (
	state = initialState,
	action: IReduxAction<RelationshipsFilterFieldsActionTypes>
) => {
	switch (action.type) {
		case RelationshipsFilterFieldsActionTypes.GET_FILTER_FIELDS: {
			return   {...state,requestSend:true};
		}
		case RelationshipsFilterFieldsActionTypes.SET_FILTER_FIELDS: {
			return   {...state,...action.payload, getting:true,requestSend:false};
		}
		default:
			return state;
	}
};
export default RelationshipsFilterFieldReduser;
