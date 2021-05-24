import { RegistrationActionTypes } from "../constants";

export const updateRegistrationForm = (payload:any) => {
	return {
		type: RegistrationActionTypes.UPDATE,
		payload
	};
};
export const resetRegistrationForm = ( ) => {
	return {
		type: RegistrationActionTypes.RESET,
	};
};


