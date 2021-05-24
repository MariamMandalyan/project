import { requestsReducer } from 'redux-saga-requests';
import { InteractionsTypes } from '../constants';

export default requestsReducer({
	actionType: InteractionsTypes.GET_SUMMARY_DATA,
	getDefaultData: () => ({}),
	getData: (state, { data }) => ({
		incomingIntros: data.IncommingIntros,
		incomingIntrosDelta: data.IncommingIntrosDelta,
		intros: data.Intros,
		openOpps: data.OpenOpps,
		openOppsDelta: data.OpenOppsDelta,
		outgoingIntros: data.OutgoingIntros,
		outgoingIntrosDelta: data.OutgoingIntrosDelta,
		pendingIntros: data.Pending,
		pendingInvites: data.PendingInvites,
		pendingInvitesDelta: data.PendingInvitesDelta,
		incomming:data.Incomming,
		outgoing:data.Outgoing
	})
});
