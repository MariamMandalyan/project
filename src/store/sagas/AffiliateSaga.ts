import { takeLatest, all, put, call } from 'redux-saga/effects';

import { AffiliateActionsTypes, OppOverviewTypes, } from '../constants';
import { AffiliateUsersEP, UtilsEP } from '../../services/api/routes';
import { IAffilate, IVInteraction, } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import { setApproveInteraction } from '../actions/oppOverviewActions';


export function* addAffiliateSaga({ payload }: { type: AffiliateActionsTypes, payload: IAffilate }) {
    try {
        //yield ShareLinksEP.shareApp(payload);
        yield AffiliateUsersEP.create(payload)
    } catch (ex) {
      errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
  
    }
  }
  
  export function* watchAffiliateSaga() {
    yield all([takeLatest(AffiliateActionsTypes.ADD_AFFILIATE as any, addAffiliateSaga)]);
  }
  