import { AuthActionTypes, CrumbizUsersTypes } from '../constants';
import { IUserData } from '../../types/interfaces';

interface IAction {
  type: AuthActionTypes;
  payload: any;
}

interface IAuthInitialState {
  userData: Partial<IUserData>;
  restorePassStepper: number;
  userAuthenticated: boolean | null;
  emailExist:boolean,
  phoneExist:boolean,
  getting:boolean,
  success:false,
  field:boolean,
  upadetLoading:boolean,
  isEmailRegistered:boolean
  errorData:any
}

export enum RestorePasswordSteps {
  ENTER_EMAIL,
  EMAIL_SENT
}

const initialState: IAuthInitialState = {
  userData: {
    id: ''
  },
  restorePassStepper: RestorePasswordSteps.ENTER_EMAIL,
  userAuthenticated: null,
  emailExist: false,
  phoneExist: false,
  success: false,
  getting: false,
  upadetLoading: false,
  field:false,
  isEmailRegistered:true,
  errorData: null
};

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_FIELD:
      return {
        ...state,
        field:true
      };
    case AuthActionTypes.FORGOT_PASSWORD_SENT:
      return {
        ...state,
        restorePassStepper: RestorePasswordSteps.EMAIL_SENT
      };
    case  AuthActionTypes.SET_EMAIL_VALIDATION:
      return {
        ...state,
        isEmailRegistered: action.payload
      };
    case AuthActionTypes.GET_EXISTS:
      return {
        ...state,
        getting:false
      };
    case AuthActionTypes.SET_EXISTS:
      return {
        ...state,
        getting:true,
        ...action.payload,
       
      };
    case AuthActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userData: {
          ...action.payload,
          disableIntroductions: action.payload.disableIntroductions === null ? true : action.payload.disableIntroductions,
          // disableNotification: action.payload.disableNotification === null ? true : action.payload.disableNotification,
          // disableOpportunities: action.payload.disableOpportunities === null ? true : action.payload.disableOpportunities,
        },
        userAuthenticated: true
      };
    case AuthActionTypes.CLEAR_USER_DETAILS:
      return {
        ...initialState,
        userAuthenticated: false
      };
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userAuthenticated: true
      };
    case AuthActionTypes.UPDATE_LOADING_USER_DETAILS:
      return {
        ...state,
        upadetLoading:true
      };
    case CrumbizUsersTypes.UPDATE_USER_ADDITIONALS_INFO:
      return {
        ...state,
        upadetLoading:true
      };
    case AuthActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        errorData: action.payload
      };

    case AuthActionTypes.UPDATE_USER_DETAILS:
      return {
        ...state,
        userData: action.payload,
        upadetLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
