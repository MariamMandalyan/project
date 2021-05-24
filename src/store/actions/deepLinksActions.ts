import { DeepLinksTypes } from '../constants';

export const setDeepLink = (link: string) => {
	return {
		type: DeepLinksTypes.SET_DEEP_LINK,
		payload: link
	};
};
export const setUserIdToDeepLink = (userId: string,isMail:boolean) => {
	return {
		type: DeepLinksTypes.SET_USER_ID,
		payload: {userId,isMail}
	};
};

export const clearDeepLink = () => ({
	type: DeepLinksTypes.CLEAR_DEEP_LINK
});
