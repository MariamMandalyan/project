import { IReduxAction } from '../../types/interfaces';
import { OppStatusesActionTypes } from '../constants';
import { IOppStatusItem } from '../../services/OppStatusProvider';

const initialState: IOppStatusItem[] = [];

const oppStatusesReducer = (
  state = initialState,
  action: IReduxAction<OppStatusesActionTypes>
) => {
  switch (action.type) {
    case OppStatusesActionTypes.GET_OPP_STATUSES:
      return state;
    case OppStatusesActionTypes.SET_OPP_STATUSES:
      return action.payload;
    default:
      return state;
  }
};

export default oppStatusesReducer;
