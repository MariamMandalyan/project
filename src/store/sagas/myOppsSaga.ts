import { put, takeLatest, all, select } from 'redux-saga/effects';
import {setMyOpps, setMyStatuses, setMyTopNotifications} from '../actions/myOppsActions';
import { MyOppsTypes } from '../constants';
import {
	IPayload,
	IGetMyOppsPayload,
	IOpp,
	IOppItem
} from '../../types/interfaces';
import {OpportunitiesEP, UsersEP} from '../../services/api/routes';
import { EntityEnum } from '../../types/enums';
import filterRejectedOpps from './utils/opps/filterRejectedOpps';
import { getUserDataSelector } from '../selectors/authSelector';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import opportunitiesMutesEP from '../../services/api/routes/OpportunityMutes';
import crumbizApi from "../../services/api/crumbizInstance";
import moment from "moment";

function* muteOpportunitySaga({ payload }: IPayload<{
	opportunityId: string, userId: string, muteId: string | undefined
}>) {
	try {
		if(payload.muteId) yield opportunitiesMutesEP.unMuteOpportunityRequest(payload.muteId);
		else yield opportunitiesMutesEP.muteOpportunityRequest(payload.opportunityId, payload.userId);
	} catch (e) {
		console.log('e muteOpportunitySaga')
	}
}

export function* getMyOppsSaga({ payload }: IPayload<IGetMyOppsPayload>) {
	const { authId: contactAuthId } = payload;

	try {
		const { id } = yield select(getUserDataSelector);
		const opps: IOpp[] = yield OpportunitiesEP.getOpportunityById(contactAuthId,id);
		//@ts-ignore
		let response: Array<IOppItem> = opps
			.map(opp => {
				const {
					opportunityConnectors: connectors,
					opportunityStatusId,
					...rest
				} = opp;
				if (connectors && connectors.length) {
					const {
						ownerUserId,
						connectorUserId,
						opportunityStatusId: connectorStatusId,
						opportunityTargets: targets
					} = connectors[0];

					const role =
						ownerUserId === id
							? EntityEnum.OWNER
							: connectorUserId === id
							? EntityEnum.CONNECTOR
							: EntityEnum.TARGET;

					const targetStatusId =
						targets && targets.length
							? targets[0].opportunityTargetStatusId
							: undefined;

					const res: IOppItem = {
						...rest,
						role,
						connectorStatusId,
						targetStatusId,
						opportunityStatusId
					};
					return res;
				}
				return;
			})
			.filter(obj => obj);
		const filteredOpps = filterRejectedOpps(response);

		yield put(setMyOpps(filteredOpps));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))


	}
}

function* getMyOppsStatusesSaga() {
	try {
		const statuses = yield OpportunitiesEP.getMyOpportunityStatuses();

		yield put(setMyStatuses(statuses));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
	}
}

function* getMyTopNotifications() {
	try {
		const res = yield crumbizApi.get(`TriggerQueues`, {
			params: {
				$expand: `TriggerNews`,
				$filter: `timeStamp lt ${moment(new Date()).toISOString()}`,
				$top: '3'
			}
		});

		const notifications = res.data.value;

		for (let i = 0; i < notifications.length; ++i) {
			const { fromUserId, opportunityId } = notifications[i];

			const resOpp = yield OpportunitiesEP.getOppDetails(opportunityId);
			const resFromUser = yield UsersEP.getUserIdById(fromUserId);

			notifications[i].opportunity = resOpp[0];
			notifications[i].fromUser = resFromUser[0];
		}

		yield put(setMyTopNotifications(notifications));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
	}
}

export function* watchMyOppsSaga() {
	yield all([
		takeLatest(MyOppsTypes.GET_MY_OPPS as any, getMyOppsSaga),
		takeLatest(MyOppsTypes.MUTE_OPP as any, muteOpportunitySaga),
		takeLatest(MyOppsTypes.GET_MY_OPPS_STATUSES as any, getMyOppsStatusesSaga),
		takeLatest(MyOppsTypes.GET_MY_OPPS_TOP_NOTIFICATIONS as any, getMyTopNotifications)
	]);
}
