import { put, call, takeEvery } from 'redux-saga/effects';
import { RelationshipsFilterActionTypes, RelationshipsFilterFieldsActionTypes } from '../constants';
import { IAction, IRelationshipsFilter, IFilterMenuEntry } from '../../types/interfaces';
import { UtilsEP } from '../../services/api/routes';
import { setRelationShipsFilterFields } from '../actions/relationShipsFilterFileds';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

function* setRelationShipFiltersData(action: IAction<RelationshipsFilterActionTypes, IRelationshipsFilter>) {
	try {

		const oppTypes:IFilterMenuEntry[] = yield call(UtilsEP.getOppTypes4FilterRelation)

		const locations:IFilterMenuEntry[] = yield call(UtilsEP.getCountries4FilterRelation)

		const verticals:IFilterMenuEntry[] = yield call(UtilsEP.getVerticals4FilterRelation)

		const interests:IFilterMenuEntry[] = yield call(UtilsEP.getInterests4FilterRelation)

		const normalizedInterests = interests.map(({Id, Title}) => ({id: Id, title: Title}));

		yield put(setRelationShipsFilterFields({oppTypes,locations,verticals, interests: normalizedInterests}));

	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('could not load templates',ex);
	}
}

export function* watchRelationShipsFilterField() {

	yield takeEvery(
		RelationshipsFilterFieldsActionTypes.GET_FILTER_FIELDS as any,
		setRelationShipFiltersData
	)



}
