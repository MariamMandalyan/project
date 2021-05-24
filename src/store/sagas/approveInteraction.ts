import { takeLatest, all, put, call } from 'redux-saga/effects';

import { OppOverviewTypes, } from '../constants';
import { UtilsEP } from '../../services/api/routes';
import { IVInteraction, } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import { setApproveInteraction } from '../actions/oppOverviewActions';

export function* getApproveInteractions(data: any) {
  try {
    const { payload } = data;
    const approveInteraction: IVInteraction[] = yield call(UtilsEP.getVInteractionsByTarget, payload);
    yield put(setApproveInteraction(approveInteraction))
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
  }
}
export function* watchTargetVInteractionsSaga() {
  yield all([
    takeLatest(
        OppOverviewTypes.GET_APPROVE_INTERACTION as any,
        getApproveInteractions),
  ]);
}