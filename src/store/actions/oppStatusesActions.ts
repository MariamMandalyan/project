import { OppStatusesActionTypes } from '../constants';
import { IOppStatusItem } from '../../services/OppStatusProvider';

export const getOppStatuses = () => ({
    type: OppStatusesActionTypes.GET_OPP_STATUSES,
});

export const setOppStatuses = (payload: IOppStatusItem[]) => ({
  type: OppStatusesActionTypes.SET_OPP_STATUSES,
  payload,
});
