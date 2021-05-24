import { takeLatest, all, put } from 'redux-saga/effects';

import {FeedbackActionTypes, InterestsActionTypes} from '../constants';
import { IFeedback } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import crumbizApi from "../../services/api/crumbizInstance";
import {setInterests, setInterestsTypes} from "../actions/interests";

export function* getInterestsSaga({ payload }: { type: FeedbackActionTypes, payload: IFeedback }) {
  try {
      const response = yield crumbizApi.get(`/UserInterests`, {
          params: {
              $filter: `userId eq ${payload.id}`
          }
      });

      yield put(setInterests({interests: response.data.value}));
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}

export function* updateInterestsSaga({ payload }: { type: FeedbackActionTypes, payload: IFeedback }) {
    try {
        const { oldInterests, newInterests } = payload;

        for(let i = 0; i < oldInterests.length; ++i) {
            yield crumbizApi.delete(`/UserInterests(${oldInterests[i].id})`);
        }

        for (let i = 0; i < newInterests.length; ++i) {
            yield crumbizApi.post(`/UserInterests`, newInterests[i]);
        }

        yield put(setInterests({interests: newInterests}));
    } catch (ex) {
        errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

    }
}

export function* getInterestsTypesSaga({ payload }) {
    try {
        const response = yield crumbizApi.get(`/UserInterestTypes`);
        yield put(setInterestsTypes({typesInterests: response.data.value}));
    } catch (ex) {
        errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
    }
}

export function* watchInterestsSaga() {
  yield all([
      takeLatest(InterestsActionTypes.GET_INTERESTS as any, getInterestsSaga),
      takeLatest(InterestsActionTypes.GET_INTERESTS_TYPES as any, getInterestsTypesSaga),
      takeLatest(InterestsActionTypes.UPDATE_INTERESTS as any, updateInterestsSaga)
  ]);
}
