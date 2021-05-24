import { RegistrationActionTypes } from '../constants';
import { IRegistrationInitialState } from '../../types/interfaces';

interface IAction {
  type: RegistrationActionTypes;
  payload: any;
}


const initialState: IRegistrationInitialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  countryId: '',
  cityId: '',
  stateId: null,
  phoneNumber: '',
  userPhones: [],
  userEmails: [],
  userAdditional: [],
};

const registrationReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case RegistrationActionTypes.UPDATE:
      return { ...state, ...action.payload }
    case RegistrationActionTypes.RESET:
      return { ...initialState }
    default:
      return state;
  }
};

export default registrationReducer;
