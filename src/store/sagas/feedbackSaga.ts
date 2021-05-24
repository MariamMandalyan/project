import { takeLatest, all } from 'redux-saga/effects';

import { FeedbackActionTypes } from '../constants';
import { UtilsEP } from '../../services/api/routes';
import { IFeedback } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

export function* sendFeedbackSaga({ payload }: { type: FeedbackActionTypes, payload: IFeedback }) {
  try {
      yield UtilsEP.sendFeedback(payload);
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}

export function* watchFeedbackSaga() {
  yield all([takeLatest(FeedbackActionTypes.SEND_FEEDBACK as any, sendFeedbackSaga)]);
}
