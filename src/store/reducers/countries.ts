import { IReduxAction, ICountry } from '../../types/interfaces';
import {  CountriesActionTypes } from '../constants';

const initialState: ICountry[] = []

const CountriesReduser = (
	state = initialState,
	action: IReduxAction<CountriesActionTypes>
) => {
	switch (action.type) {
		case CountriesActionTypes.SET_ALL_COUNTRIES: {
			return   action.payload;
		}
		default:
			return state;
	}
};
export default CountriesReduser;
