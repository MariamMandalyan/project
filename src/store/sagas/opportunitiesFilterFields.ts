import { put, call, takeEvery } from 'redux-saga/effects';
import { OpportunitiesFilterActionTypes, OpportunitiesFilterFieldsActionTypes } from '../constants';
import { IAction, IOpportunitiesFilter, IFilterMenuEntry } from '../../types/interfaces';
import { UtilsEP } from '../../services/api/routes';
import { setOpportunitiesFilterFields } from '../actions/opportunitiesFilterFields';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

function* setOpportunitiesFiltersData(action: IAction<OpportunitiesFilterActionTypes, IOpportunitiesFilter>) {
	try {
		const oppTypes: IFilterMenuEntry[] = yield call(UtilsEP.getOppTypes4FilterOpp);
		yield put(setOpportunitiesFilterFields({
			oppTypes
		}));
		//const locations:IFilterMenuEntry[] = yield call(CountriesEP.getForRelations);
		const statuses: IFilterMenuEntry[] = yield call(UtilsEP.getOppStatuses4Filter);
		yield put(setOpportunitiesFilterFields({
			statuses,
		}));
		const verticals: IFilterMenuEntry[] = yield call(UtilsEP.getVerticals4Filter);

		yield put(setOpportunitiesFilterFields({
			verticals
		}));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('could not load templates', ex);
	}
}

export function* watchOpportunitiesFilterField() {
	yield takeEvery(
		OpportunitiesFilterFieldsActionTypes.GET_FILTER_FIELDS as any,
		setOpportunitiesFiltersData
	);
}
