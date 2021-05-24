
import { CrumbizUsersTypes } from '../constants';
import {
	IUserData,
	IUserExpandedWithRelationships
} from '../../types/interfaces';

export interface ICrumbizUsersTypes {
	crumbizUsersList: any;
	crumbizRelationshipsList: Array<IUserExpandedWithRelationships>;
	isLoading: boolean;
}

const initialState: ICrumbizUsersTypes = {
	crumbizUsersList: null,
	crumbizRelationshipsList: [],
	isLoading: false
};

const crumbizUsersReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case CrumbizUsersTypes.SET_CRUMBIZ_USERS:
			return {
				...state,
				crumbizUsersList: action.payload
			};
		case CrumbizUsersTypes.GET_RELATIONSHIPS_DATA:
			return {
				...state,
				crumbizRelationshipsList: [],
				isLoading: true
			};
		case CrumbizUsersTypes.SET_RELATIONSHIPS_DATA:
			return {
				...state,
				crumbizRelationshipsList: action.payload,
				isLoading: false
			};
		case CrumbizUsersTypes.RESET_CRUMBIZ_USERS_STATE:
			return {
				...initialState
			};
		default:
			return state;
	}
};

export default crumbizUsersReducer;
