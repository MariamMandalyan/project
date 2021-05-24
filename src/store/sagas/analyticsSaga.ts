import { put, call, takeEvery } from 'redux-saga/effects';
import { AnalyticsActionTypes } from '../constants';
import { AnalyticsEP } from '../../services/api/routes';
import { IAllYourIntros } from '../../types/interfaces';
import { GetAnalytics } from '../../types/enums';
import { setAnalytics } from '../actions/analyticsActions';
import { math, errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

function* getAnalytics(payload: any) {
	try {
		//const userId = store.getState().auth.userData.id;

		const data = payload.payload
		if (data.type === GetAnalytics.PART_1) {
			yield put(setAnalytics({ doneDeals: undefined, firstInside: undefined, secondInside: undefined, thirdInside: undefined }))
			const doneDeals = yield call(AnalyticsEP.getDoneDeals)
			const firstInside = yield call(AnalyticsEP.getFirstInside, data.fromDate, data.toDate)
			const secondInside = yield call(AnalyticsEP.getSecondInside, data.fromDate, data.toDate)
			const thirdInside = yield call(AnalyticsEP.getThirdInside, data.fromDate, data.toDate)
			//			const top5 = yield call(AnalyticsEP.getTop5,data.fromDate,data.toDate)
			yield put(setAnalytics({ doneDeals, firstInside, secondInside, thirdInside:thirdInside?thirdInside:' ' }))
		}
		if (data.type === GetAnalytics.PART_1 || data.type == GetAnalytics.ALL_OPPS) {
			yield put(setAnalytics({ allOpps: undefined }))
			const allOpps = yield call(AnalyticsEP.getAllOpps, data.fromDate, data.toDate, data.role)
			yield put(setAnalytics({ allOpps }))
		}
		if (data.type == GetAnalytics.PART_1 || data.type == GetAnalytics.GLOBAL_OPPS) {
			yield put(setAnalytics({ globalOpps: undefined }))
			const globalOpps = yield call(AnalyticsEP.getGlobalOpps, data.fromDate, data.toDate, data.role)
			yield put(setAnalytics({ globalOpps }))
		}
		if (data.type == GetAnalytics.PART_1 || data.type == GetAnalytics.OPP_TYPES) {
			yield put(setAnalytics({ oppTypes: undefined }))
			const oppTypes = yield call(AnalyticsEP.getOppTypes, data.fromDate, data.toDate, data.role)
			yield put(setAnalytics({ oppTypes }))
		}
		if (data.type == GetAnalytics.PART_1 || data.type == GetAnalytics.VERTICALS) {
			yield put(setAnalytics({ verticals: undefined }))
			const res = yield call(AnalyticsEP.getVerticals, data.fromDate, data.toDate, data.role)
			let verticals:IAllYourIntros[] = []
			Object.keys(res).map((key, index) => {
				verticals.push({
					id:key,
					name:key,
					opps:res[key]
				})
			})
			
			const sorted: IAllYourIntros[] = verticals.sort((a, b) => b.opps - a.opps)
			const topVerticals: IAllYourIntros[] = sorted.slice(0, 5);
			const moreVerticals: IAllYourIntros[] = sorted.length > 5 ? sorted.slice(5, sorted.length) : [];
			const more: IAllYourIntros = { id: '', name: 'Other', opps: math.sum(moreVerticals.map(item => item.opps)) }
			yield put(setAnalytics({ verticals: [...topVerticals, more]  }))
		}

		if (data.type === GetAnalytics.PART_2) {
			yield put(setAnalytics({ conversationRate: undefined, fourthInside: undefined, fifthInside: undefined }))
			const conversationRate = yield call(AnalyticsEP.getConversationRate, data.fromDate, data.toDate)
			const fourthInside = yield call(AnalyticsEP.getFourthInside, data.fromDate, data.toDate)
			const fifthInside = yield call(AnalyticsEP.getFifthInside, data.fromDate, data.toDate)
			yield put(setAnalytics({ conversationRate, fourthInside, fifthInside }))
		}
		if (data.type === GetAnalytics.PART_2 || data.type === GetAnalytics.TOP_5) {
			yield put(setAnalytics({ top5: undefined }))
			const top5 = yield call(AnalyticsEP.getTop5, data.fromDate, data.toDate, data.vertical)
			yield put(setAnalytics({ top5 }))
		}
		if (data.type === GetAnalytics.PART_2 || data.type === GetAnalytics.GLOBAL_CONTRIBUTORS) {
			yield put(setAnalytics({ globalContributors: undefined }))
			const globalContributors = yield call(AnalyticsEP.getGlobalContributors, data.fromDate, data.toDate, data.continents)
			yield put(setAnalytics({ globalContributors }))
		}
		if (data.type === GetAnalytics.PART_2 || data.type === GetAnalytics.ALL_CONTRIBUTORS) {
			yield put(setAnalytics({ allContributors: undefined }))
			const allContributors = yield call(AnalyticsEP.getAllContributors, data.fromDate, data.toDate, data.vertical, data.oppType)
			yield put(setAnalytics({ allContributors }))
		}
		if (data.type === GetAnalytics.PART_2 || data.type === GetAnalytics.ALL_YOUR_INTROS) {
			yield put(setAnalytics({ allYourIntros: undefined }))
			const allYourIntros: IAllYourIntros[] = yield call(AnalyticsEP.getAllYourIntros, data.fromDate, data.toDate, data.oppType)
			const sorted: IAllYourIntros[] = allYourIntros.sort((a, b) => b.opps - a.opps)
			const topTourIntors: IAllYourIntros[] = sorted.slice(0, 5);
			const moreTourIntors: IAllYourIntros[] = sorted.length > 5 ? sorted.slice(5, sorted.length) : [];
			const more: IAllYourIntros = { id: '', name: 'Other', opps: math.sum(moreTourIntors.map(item => item.opps)) }
			yield put(setAnalytics({ allYourIntros: [...topTourIntors, more] }))
		}
		if (data.type === GetAnalytics.PART_3) {
			yield put(setAnalytics({ crumbizStatistics: undefined, topInOutIntros:undefined, inOutIntros:undefined }))
			const crumbizStatistics = yield call(AnalyticsEP.getCrumbizStatistics)
			const topInOutIntros = yield call(AnalyticsEP.getTopInOutIntros,data.fromDate, data.toDate)
			const inOutIntros = yield call(AnalyticsEP.getInOutIntros,data.fromDate, data.toDate)
			yield put(setAnalytics({ crumbizStatistics,topInOutIntros ,inOutIntros}))
		}
		if (data.type === GetAnalytics.PART_3 || data.type === GetAnalytics.OPPORTUNITY_TIMELINE) {
			yield put(setAnalytics({ opportunityTimeline: undefined }))
			const opportunityTimeline = yield call(AnalyticsEP.getOpportunityTimeline, data.fromDate, data.toDate, data.vertical, data.oppType)
			yield put(setAnalytics({ opportunityTimeline }))
		}
		if (data.type === GetAnalytics.PART_3 || data.type === GetAnalytics.NUMBER_OF_INTROS_WEEKLY) {
			yield put(setAnalytics({ numberOfIntrosWeekly: undefined }))
			const numberOfIntrosWeekly = yield call(AnalyticsEP.getNumberOfIntrosWeekly, data.fromDate, data.toDate, data.vertical, data.oppType)
			yield put(setAnalytics({ numberOfIntrosWeekly }))
		}

	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'),i18n.t('modals.errorHandler.message',{error:ex.toString().substring(0,156)}))

	}
}

export function* watchAnalytics() {

	yield takeEvery(
		AnalyticsActionTypes.GET_ANALYTICS as any,
		getAnalytics
	)
}
