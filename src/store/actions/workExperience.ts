import { WorkExperienceActionTypes } from "../constants";
import { IWorkExperience, IUserData } from "../../types/interfaces";

export const getUserWorkExperiences = (userId:string) => {
	return {
		type: WorkExperienceActionTypes.GET_WORK_EXPERIENCES,
		payload:userId
	};
};
export const saveUserWorkExperiences = (payload:IWorkExperience[],userData:IUserData) => {
	return {
		type: WorkExperienceActionTypes.SAVE_WORK_EXPERIENCES,
		payload,
		userData
	};
};

export const setUserWorkExperiences = (payload:IWorkExperience[]) => {
	return {
        type: WorkExperienceActionTypes.SET_WORK_EXPERIENCES,
        payload
	};
};
