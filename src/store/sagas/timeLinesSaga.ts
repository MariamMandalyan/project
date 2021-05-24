import { takeLatest, all, put } from 'redux-saga/effects';

import { TimeLineActionTypes } from '../constants';
import { NotificationsEP, TriggerNewsEP } from '../../services/api/routes';
import { ITimeLineResponseItem } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import { setNotifications, setFilterFileds } from '../actions/notification';

export function* getTimeLine({ payload }: { type: TimeLineActionTypes, payload: Date }) {
  try {
    const response: ITimeLineResponseItem[] = yield NotificationsEP.getNotification(payload)
    yield put(setNotifications(response))
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}
export function* readTimeLines({ payload }: { type: TimeLineActionTypes, payload: { ids: string[], userId: string } }) {
  try {

    for (let i = 0; i < payload.ids.length; i++) {
      const notificationId = payload.ids[i];
      yield TriggerNewsEP.create({
        triggerQueueId: notificationId,
        userId: payload.userId
      })
    }
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}
function* getFilterFileds() {
  try {
    yield put(setFilterFileds({
      opportunities: [{
        id: '1',
        title: "Seed Round for Big Data Startup",
      },
      {
        id: '2',
        title: "Agtech - Sales Manager",
      },
      {
        id: '3',
        title: "Sponsorship for Health App Product & Service Opportunity",
      }],
      persons: [{
        id: '19551d52-51ca-42c8-96ad-d00f5efb37ed'
      }, {
        id: '4cead7fc-9583-40e2-b640-a4262d7df125'
      },
      {
        id: '4efc67f0-c90c-46fa-bd4d-d1ba42cbd8d9'
      }]
    }))
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}
export function* watchTimeLinesSaga() {
  yield all([
    takeLatest(TimeLineActionTypes.GET_TIMELINE as any, getTimeLine),
    takeLatest(TimeLineActionTypes.READ_TIMELINE as any, readTimeLines),
    takeLatest(TimeLineActionTypes.GET_FILTER_FIELDS as any, getFilterFileds)
  ]);
}
