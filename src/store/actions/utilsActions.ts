import { UtilityActionTypes} from "../constants";

export const setColdStartTime = (payload: string) => {
  return {
    type: UtilityActionTypes.SET_COLD_START_TIME,
    payload
  };
};

export const setOnBoardingFinished = () => ({ type: UtilityActionTypes.SET_ONBOARDING_FINISHED });

export const saveCurrentScreen = (payload: string) => ({
  type: UtilityActionTypes.SAVE_CURRENT_SCREEN,
  payload
});
