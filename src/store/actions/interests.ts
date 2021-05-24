import { InterestsActionTypes} from "../constants";

export const getInterests = (payload:any) => {
	return {
		type: InterestsActionTypes.GET_INTERESTS,
		payload
	};
};

export const getInterestsTypes = (payload:any) => {
	return {
		type: InterestsActionTypes.GET_INTERESTS_TYPES,
		payload
	};
};

export const setInterests = (payload:any) => {
	return {
		type: InterestsActionTypes.SET_INTERESTS,
		payload
	};
};

export const setInterestsTypes = (payload:any) => {
	return {
		type: InterestsActionTypes.SET_INTERESTS_TYPES,
		payload
	};
};

export const updateInterests = (payload:any) => {
	return {
		type: InterestsActionTypes.UPDATE_INTERESTS,
		payload
	};
};

