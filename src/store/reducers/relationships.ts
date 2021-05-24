import { IReduxAction,  IRelationshipsTypes } from '../../types/interfaces';
import {RelationshipsActionTypes, PaginationActionTypes} from '../constants';
import {COUNT_PER_PAGE} from "../../types/constants";

const initialState: IRelationshipsTypes = {
	isLoading: false,
	relationships: [],
	count: 0,
	empty: true,
	reachEnd: false,
	isPaginationLoading: false,
}

const relationshipsReduser = (
	state = initialState,
	action: IReduxAction<RelationshipsActionTypes | PaginationActionTypes>
) => {
	switch (action.type) {
		case RelationshipsActionTypes.SET_RELATIONSHIPS: {
			const { relations, count } = action.payload;
			return {
				relationships: relations,
				isPaginationLoading: false,
				isLoading: false,
				count,
				empty: relations.length === 0,
				reachEnd: relations.length < COUNT_PER_PAGE
			};
		}
		case RelationshipsActionTypes.SET_RELATIONSHIPS_LAZY: {
			return   {
				...state,
				relationships: [...state.relationships,...action.payload],
				isLoading: false,
				isPaginationLoading: false,
				empty: action.payload.length == 0,
				reachEnd: action.payload.length < COUNT_PER_PAGE
			}
		}
		case PaginationActionTypes.LOAD_DATA: {
			return { ...state, isPaginationLoading: action.action === RelationshipsActionTypes.SET_RELATIONSHIPS };
		}
		case PaginationActionTypes.LOAD_FIRST_DATA: {
			return { ...state, isLoading: action.action === RelationshipsActionTypes.SET_RELATIONSHIPS };
		}
		case RelationshipsActionTypes.GET_RELATIONSHIPS: {
			return   {...state, isLoading: true};
		}
		default:
			return state;
	}
};
export default relationshipsReduser;
