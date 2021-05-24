import { put, takeLatest } from 'redux-saga/effects';
import { PaginationActionTypes, OpportunitiesActionTypes, RelationshipsActionTypes, NotificationsActionTypes } from '../constants';
import { INotificationResponseItem, IOppItem } from '../../types/interfaces';
import { OpportunitiesFilter } from './opportunitiesFilter'
import { makeAction } from '../actions/pagination';
import { COUNT_PER_PAGE } from '../../types/constants';
import { relationShipFilter } from './relationshipFilter';
import { getNotification } from './notificationsSaga';
let skip = 0;
function* loadFirstDate(action: any) {
  skip = 0
  try {
    switch (action.action) {
      case NotificationsActionTypes.SET_NOTIFICATION as string:
      //  yield put(setNotifications(response))
        const  notificstions:INotificationResponseItem[]  = yield getNotification(action.payload, skip)
        yield put(makeAction(action.action, notificstions ))
        break
      case OpportunitiesActionTypes.SET_OPPORTUNITIES as string:
        const {filteredOpps:opportunities,count}: IOppItem[] = yield OpportunitiesFilter(action, skip)

        yield put(makeAction(action.action, { opportunities, count }))
        break
      case RelationshipsActionTypes.SET_RELATIONSHIPS as string:
        const { Data: relations, Count }: IOppItem[] = yield relationShipFilter(action, skip)
        yield put(makeAction(action.action, { relations, count: Count }))
        break;
      default:
        break;
    }
  } catch (ex) {
    console.log(ex);
  }
}
function* loadDate(action: any) {
  skip += COUNT_PER_PAGE
  try {
    switch (action.action) {
      case NotificationsActionTypes.SET_NOTIFICATION as string:
        //  yield put(setNotifications(response))
          const  notificstions:INotificationResponseItem[]  = yield getNotification(action.payload, skip)
          yield put(makeAction(action.action+ '_LAZY', notificstions ))
          break
      case OpportunitiesActionTypes.SET_OPPORTUNITIES as string:
        const {filteredOpps}: IOppItem[] = yield OpportunitiesFilter(action, skip)
        yield put(makeAction(action.action + '_LAZY', filteredOpps))
        break;
      case RelationshipsActionTypes.SET_RELATIONSHIPS as string:
        const { Data: relations }: IOppItem[] = yield relationShipFilter(action, skip)
        yield put(makeAction(action.action + '_LAZY', relations))
        break;
      default:
        break;
    }
  } catch (ex) {
    console.log(ex);

  }
}

export function* watchPaginatonSaga() {
  yield takeLatest(
    PaginationActionTypes.LOAD_FIRST_DATA as any,
    loadFirstDate
  );
  yield takeLatest(
    PaginationActionTypes.LOAD_DATA as any,
    loadDate
  );
}
