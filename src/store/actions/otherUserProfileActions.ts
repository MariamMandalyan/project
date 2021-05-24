import {OtherUserProfileActionTypes, UserApprovalsActionsTypes, UserBlockActionsTypes} from "../constants";
import {OtherUserProfileSectionTypesEnum} from "../../types/enums";

export const getOtherUserProfile = (payload: {id: string, userId:string,invert:boolean}) => {
    return {
        type: OtherUserProfileActionTypes.GET_OTHER_USER_PROFILE,
        payload
    };
};
export const removeUserApproval = (payload: {id: string, userId:string,approvelId:string}) => {
    return {
        type: UserApprovalsActionsTypes.REMOVE_USERAPPROVAL,
        payload
    };
};
export const removeUserBlock = (payload: {id: string, userId:string,blockId:string}) => {
    return {
        type: UserBlockActionsTypes.REMOVE_BLOCK,
        payload
    };
};
export const setUserApproval = (payload: {id: string, userId:string}) => {
    return {
        type: UserApprovalsActionsTypes.SET_USERAPPROVAL,
        payload
    };
};
export const setUserBlock = (payload: {id: string, userId:string}) => {
    return {
        type: UserBlockActionsTypes.SET_BLOCK,
        payload
    };
};
export const setOtherUserProfile = (payload: any) => {
    return {
        type: OtherUserProfileActionTypes.SET_OTHER_USER_PROFILE,
        payload
    };
};

export const getOtherUserProfileSection = (payload: {sectionType: OtherUserProfileSectionTypesEnum}) => {
    return {
        type: OtherUserProfileActionTypes.GET_OTHER_USER_PROFILE_SECTION,
        payload
    }
}

export const setOtherUserProfileSection = (payload: {sectionType: OtherUserProfileSectionTypesEnum, data: any}) => {
    return {
        type: OtherUserProfileActionTypes.SET_OTHER_USER_PROFILE_SECTION,
        payload
    }
}

export const getLoadMoreOtherUserProfileSection = (payload: {sectionType: OtherUserProfileSectionTypesEnum}) => {
    return {
        type: OtherUserProfileActionTypes.GET_LOAD_MORE_OTHER_USER_PROFILE_SECTION,
        payload
    }
}

export const setLoadMoreOtherUserProfileSection = (payload: {sectionType: OtherUserProfileSectionTypesEnum, data: any}) => {
    return {
        type: OtherUserProfileActionTypes.SET_LOAD_MORE_OTHER_USER_PROFILE_SECTION,
        payload
    }
}
