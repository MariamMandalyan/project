import {IReduxAction, IUtils} from '../../types/interfaces';
import {UtilityActionTypes} from '../constants';

const initialState: IUtils = {
  lastColdStartTime: "",
  onBoardingFinished: false,
  currentScreen: ''
};

const utilsReducer = (
  state = initialState,
  action: IReduxAction<UtilityActionTypes>
) => {
  switch (action.type) {
    case UtilityActionTypes.SET_COLD_START_TIME:
      return { ...state, lastColdStartTime: action.payload };
    case UtilityActionTypes.SET_ONBOARDING_FINISHED:
      return { ...state, onBoardingFinished: true };
    case UtilityActionTypes.SAVE_CURRENT_SCREEN:
      return {...state, currentScreen: action.payload };
    default:
      return state;
  }
};

export default utilsReducer;
