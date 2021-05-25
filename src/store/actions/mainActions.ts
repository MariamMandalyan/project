import { MainTypes } from "../constants";


export const setUsers = (payload: any) => {
	return {
		type: MainTypes.SETUSERS,
		payload:payload,
	};
};

export const getUsers = (payload: any) => {
	return {
		type: MainTypes.GETUSERS,
		payload:payload,
	};
};


