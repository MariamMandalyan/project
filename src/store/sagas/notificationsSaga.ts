import { takeLatest, all, put } from 'redux-saga/effects';

import { NotificationsActionTypes } from '../constants';
import { NotificationsEP, TriggerNewsEP } from '../../services/api/routes';
import { INotificationResponseItem } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import { setNotifications, setFilterFileds } from '../actions/notification';

export function* getNotification(filter:any,skip:number) {
  try {
    const response: INotificationResponseItem[] = yield NotificationsEP.getNotification(filter,skip)
   return response
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}
export function* readNotifications({ payload }: { type: NotificationsActionTypes, payload: { ids: string[], userId: string } }) {
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
function* getFilterFileds({ payload }: any) {
  try {
    const count = yield NotificationsEP.getCount()
    let persons:any[] = []
    let opportunities:any[] = []
   
    if (payload) {
      persons = yield NotificationsEP.getFilterPersons()
      opportunities = yield NotificationsEP.getFilterOpportunities()      
      const _persons:string[] = []
		  if(persons && persons.length>0){
			  for (let i = 0; i < persons.length; i++) {
				  const person = persons[i];
				  if(!_persons.includes(person.FromUserId)){
					  _persons.push(person.FromUserId)
				  }
        }
        persons = _persons
      }      
    }
    yield put(setFilterFileds({
      opportunities: opportunities.map(item => {
        return {
          id: item.Id,
          title: item.Title
        }
      }),
      persons: persons.map(item=>{
        return{id:item}
      }),
      count: count
    }))
  } catch (ex) {
    errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

  }
}
export function* watchNotificationsSaga() {
  yield all([
    takeLatest(NotificationsActionTypes.GET_NOTIFICATION as any, getNotification),
    takeLatest(NotificationsActionTypes.READ_NOTIFICATIONS as any, readNotifications),
    takeLatest(NotificationsActionTypes.GET_FILTER_FIELDS as any, getFilterFileds)
  ]);
}
