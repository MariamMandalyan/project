import { CountriesActionTypes } from "../constants";
import { ICountry } from "../../types/interfaces";

export const setCountries = (payload: ICountry[]) => ({
		type: CountriesActionTypes.SET_ALL_COUNTRIES,
		payload
	});

export const getCountries = () => ({
		type: CountriesActionTypes.GET_ALL_COUNTRIES
});
