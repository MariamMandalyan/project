import { takeLatest, all,put } from 'redux-saga/effects';

import { InteractionTypeTypes } from '../constants';
import { IInteractionType } from '../../types/interfaces';
import interactionsTypeEP from '../../services/api/routes/InteractionsType';
import { setInteractionsTypes } from '../actions/interactionTypesActions';

export function* getInteractionTypes() {
  try {
      const response:IInteractionType[] = yield interactionsTypeEP.getInteractionsTypes()
      
      yield put(setInteractionsTypes(response))
  } catch (ex) {
    setInteractionsTypes([])
    //errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}

export function* watchInteractionTypesSaga() {
  yield all([takeLatest(InteractionTypeTypes.GET_INTERACTION_TYPES as any, getInteractionTypes)]);
}
