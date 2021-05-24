import { put, call, takeEvery } from 'redux-saga/effects';

import { OppStatusesActionTypes } from '../constants';
import { IAction } from '../../types/interfaces';
import { IOppStatusItem } from '../../services/OppStatusProvider';
import OppStatusesEP from '../../services/api/routes/OppStatuses';
import { setOppStatuses } from '../actions/oppStatusesActions';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

function* setOppStatusesSaga(action: IAction<OppStatusesActionTypes, IOppStatusItem[]>) {
  try {
    const oppStatuses: IOppStatusItem[] = yield call(OppStatusesEP.getOppStatuses);
    yield put(setOppStatuses(oppStatuses));
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
  }
}

export function* watchOppStatusesSaga() {
  yield takeEvery(
    OppStatusesActionTypes.GET_OPP_STATUSES as any,
    setOppStatusesSaga
  );
}
