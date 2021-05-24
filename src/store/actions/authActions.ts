import { AuthActionTypes } from '../constants';
import {
	IRegisterPayload,
	IUserData,
	IResetPasswordPayload,
	IExistsPayload,
	IExistsResponsePayload
} from '../../types/interfaces';
import { ILoginMethodResponse } from '../../services/api/Auth';

import { createErrorAction, createSuccessAction } from './utils';

//------------------------------------//
//  Sagas actions - async             //
//------------------------------------//

export const initAuthenticationFlow = () => ({
	type: AuthActionTypes.INIT_AUTHENTICATION_FLOW,
	meta: {
		loading: true,
		finishOn: [
			AuthActionTypes.SET_USER_DETAILS,
			AuthActionTypes.CLEAR_USER_DETAILS
		]
	}
});

export const getUserDetails = (accessToken: string) => {
	return {
		type: AuthActionTypes.GET_USER_DETAILS,
		payload: accessToken
	};
};

export const updateUserDetails = (payload: IUserData) => ({
	type: AuthActionTypes.UPDATE_USER_DETAILS,
	payload
});
export const updateLoadingUserDetails = () => ({
	type: AuthActionTypes.UPDATE_LOADING_USER_DETAILS,
});

export const login = (payload: Partial<IRegisterPayload>) => {
	return {
		type: AuthActionTypes.LOGIN,
		payload,
		meta: {
			loading: true
		}
	};
};

export const loginSuccess = createSuccessAction(AuthActionTypes.LOGIN);
export const loginError = createErrorAction(AuthActionTypes.LOGIN);

export const register = (payload: Partial<IRegisterPayload>) => {
	return {
		type: AuthActionTypes.REGISTER,
		payload,
		meta: {
			loading: true
		}
	};
};
export const loginField = (payload: boolean) => {
	return {
		type: AuthActionTypes.LOGIN_FIELD,
		payload,
	};
};
export const setEmailValidation = (payload: boolean) => {
	return {
		type: AuthActionTypes.SET_EMAIL_VALIDATION,
		payload,
	};
};
export const getExists = ({payload}: Partial<IExistsPayload>) => {
	return {
		type: AuthActionTypes.GET_EXISTS,
		payload,
	};
};
export const setExists = (payload: Partial<IExistsResponsePayload>) => {
	return {
		type: AuthActionTypes.SET_EXISTS,
		payload,
	};
};

export const registerSuccess = createSuccessAction(AuthActionTypes.REGISTER);
export const registerError = createErrorAction(AuthActionTypes.REGISTER);

export const refreshToken = (refreshToken: Partial<ILoginMethodResponse>) => {
	return {
		type: AuthActionTypes.REFRESH_TOKEN,
		payload: refreshToken
	};
};

export const forgotPassword = (email: Partial<IRegisterPayload>, cb?: () => void) => {
	return {
		type: AuthActionTypes.FORGOT_PASSWORD,
		payload: { email: email, cb: cb || null },
		meta: {
			loading: true
		}
	};
};

export const forgotPasswordSuccess = createSuccessAction(
	AuthActionTypes.FORGOT_PASSWORD
);
export const forgotPasswordError = createErrorAction(
	AuthActionTypes.FORGOT_PASSWORD
);

export const forgotPasswordFailed = (payload: any) => {
	return {
		type: AuthActionTypes.FORGOT_PASSWORD_FAILURE,
		payload: payload
	}
};

export const forgotPasswordSent = () => {
	return {
		type: AuthActionTypes.FORGOT_PASSWORD_SENT
	};
};

export const changePassword = (newPassword: string, change:boolean = false) => {
	return {
		type: AuthActionTypes.CHANGE_PASSWORD,
		payload: { NewPassword: newPassword ,change}
	};
};

export const resetPassword = (params: IResetPasswordPayload) => {
	return {
		type: AuthActionTypes.RESET_PASSWORD,
		payload: params
	};
};

export const confirmRegistration = (email: string, code: string,cb:(status:boolean)=>void) => {
	return {
		type: AuthActionTypes.CONFIRM_REGISTERATION,
		payload: { email, code, cb}
	};
};

//------------------------------------//
//  Reducer actions - sync            //
//------------------------------------//

export const setUserDetails = (payload: IUserData) => {
	return {
		type: AuthActionTypes.SET_USER_DETAILS,
		payload
	};
};

export const logoutUser = () => {
	return {
		type: AuthActionTypes.LOGOUT_USER
	};
};

export const clearUserDetails = () => {
	return {
		type: AuthActionTypes.CLEAR_USER_DETAILS
	};
};
