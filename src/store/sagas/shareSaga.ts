import { takeLatest, all } from 'redux-saga/effects';

import { ShareActionTypes } from '../constants';
import { ShareLinksEP } from '../../services/api/routes';
import { IShareApp } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

export function* shareAppSaga({ payload }: { type: ShareActionTypes, payload: IShareApp }) {
  try {
      //yield ShareLinksEP.shareApp(payload);
      
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}

export function* watchShareAppSaga() {
  yield all([takeLatest(ShareActionTypes.SHARE_APP as any, shareAppSaga)]);
}
