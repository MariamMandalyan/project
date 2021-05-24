import { put, call, takeEvery } from 'redux-saga/effects';
import { CountriesActionTypes } from '../constants';
import { IAction, ICountry } from '../../types/interfaces';
import { CountriesEP } from '../../services/api/routes';
import { setCountries } from '../actions/countries';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

function* setCountriesData(action: IAction<CountriesActionTypes, ICountry[]>) {
	try {
		const countries:ICountry[] = yield call(CountriesEP.getCountries);
		yield put(setCountries(countries));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'),i18n.t('modals.errorHandler.message',{error:ex.toString().substring(0,156)}))

		console.log('could not load templates',ex);
	}
}

export function* watchCountries() {
	yield takeEvery(
		CountriesActionTypes.GET_ALL_COUNTRIES as any,
		setCountriesData
	);
}
