import { MyOppsTypes } from '../constants';
import { IOppItem } from '../../types/interfaces';

interface MuteOppDataI {
	opportunityId: string,
	userId: string
	muteId: string | undefined
}

export const getMyOpps = (authId: string) => {
	return {
		type: MyOppsTypes.GET_MY_OPPS,
		payload: { authId }
	};
};

export const getMyStatuses = () => {
	return {
		type: MyOppsTypes.GET_MY_OPPS_STATUSES
	}
};

export const setMyStatuses = (payload) => {
	return {
		type: MyOppsTypes.SET_MY_OPPS_STATUSES,
		payload
	}
};

export const getMyTopNotifications = () => {
	return {
		type: MyOppsTypes.GET_MY_OPPS_TOP_NOTIFICATIONS
	}
};

export const setMyTopNotifications = (payload) => {
	return {
		type: MyOppsTypes.SET_MY_OPPS_TOP_NOTIFICATIONS,
		payload
	}
};


export const setMyOpps = (opps?: Array<IOppItem>) => ({
	type: MyOppsTypes.SET_MY_OPPS,
	payload: opps
});

export const resetMyOppsState = () => ({
	type: MyOppsTypes.RESET_MY_OPPS_STATE
});

export const muteMyOpp = (payload: MuteOppDataI) => ({
	type: MyOppsTypes.MUTE_OPP,
	payload
})
