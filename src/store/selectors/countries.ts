import { IStoreProps } from "../../types/interfaces";

export const countriesStateSelector = (state: IStoreProps) => state.countries;

export const userLocationSelector = (state: IStoreProps) => {
  const { userAdditionals } = state.auth.userData;

  if (userAdditionals && userAdditionals[0]) {
    return {
      cityId: userAdditionals[0].cityId,
      cityName: userAdditionals[0].cityName,
      countryId: userAdditionals[0].countryId,
      countryName: userAdditionals[0].countryName,
      stateId: userAdditionals[0].stateId,
    }
  }

  return {
    cityId: null,
    cityName: null,
    countryId: null,
    countryName: null,
    stateId: null,
  }
};
