import { call, put, select, takeLatest } from 'redux-saga/effects';

import { OpportunitiesEP } from '../../services/api/routes';
import { setOpportunities } from '../actions/opportunities';

import filterRejectedOpps from './utils/opps/filterRejectedOpps';
import { filterOutHiddenOpps } from '../../utils';

import { getUserDataSelector } from '../selectors/authSelector';
import { opportunitiesParamSelector } from '../selectors/opportunities';

import { EntityEnum, OpportunityTypesEnum } from '../../types/enums';
import { IAction, IOpp, IOppItem, IOpportunitiesFilter } from '../../types/interfaces';
import { OpportunitiesFilterActionTypes } from '../constants';
import {setOpportunitiesFilterInReducer} from '../actions/opportunities'

export function* OpportunitiesFilter(action: IAction<any, any>,skip:number) {
	try {
		const { id } = yield select(getUserDataSelector);
		const param = yield select(opportunitiesParamSelector)

		const {value:opps,count:count} = yield call(OpportunitiesEP.getMyOpps, action.payload,param,id,skip);
		const opportunityTypeIds:OpportunityTypesEnum[] = []

		let response: Array<IOppItem> = opps
			.map((opp:IOpp) => {
				const {
					opportunityConnectors: connectors,
					opportunityStatusId,
					...rest
				} = opp;
				if(rest.opportunityTypeId)
				opportunityTypeIds.push(rest.opportunityTypeId)
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
						opportunityStatusId,
						connectors,
					};
					return res;
				}
				return;
			})
			.filter((obj:IOpp) => obj);
			// for (let i = 0; i < opportunityTypeIds.length; i++) {
			// 	const opportunityTypeId = opportunityTypeIds[i];
			// 	if(!opportunityTypeStatuses[opportunityTypeId]){
			// 		const statuses = yield call(UtilsEP.getOpportunityTargetStatuses, opportunityTypeId.toString());
			// 		opportunityTypeStatuses[opportunityTypeId] = statuses
			// 	}
			// }

			const opportunities:IOppItem[] = response.map((opportunity)=>{
			return opportunity
		})
		const filterHiddenOpps = filterOutHiddenOpps(opportunities);
		const filteredOpps = filterRejectedOpps(filterHiddenOpps);
		
		return {filteredOpps,count};

		//yield put(setOpportunities(filteredOpps));
		//yield put(setUserWorkExperiences(works))

	} catch (ex) {
		console.log(ex);
		
		yield put(setOpportunities({filteredOpps:[],count:0}));
		console.log('could not load templates',ex);
	}
}
function* setFilter({payload}:{payload:IOpportunitiesFilter}){
	const {callback} = payload
	try {
		
		yield put(setOpportunitiesFilterInReducer(payload))
		
		callback(payload)
	} catch (error) {
		console.log(error);
		callback(payload)
		
	}
		
}

export function* watchOpportunitiessFilter() {
		yield takeLatest(OpportunitiesFilterActionTypes.SET_FILTER as any, setFilter)
	// yield takeLatest(
	// 	OpportunitiesActionTypes.GET_OPPORTUNITIES as any,
	// 	OpportunitiesFilter
	// )



}
