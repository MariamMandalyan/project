import { call } from 'redux-saga/effects';
import { RelationshipsFilterActionTypes } from '../constants';
import { IAction, IRelationshipsFilter } from '../../types/interfaces';
import { UtilsEP } from '../../services/api/routes';

export function* relationShipFilter(action: IAction<RelationshipsFilterActionTypes, IRelationshipsFilter>,skip:number) {
	try {

		//yield put(getRelationShips());
		const {Data, Count } = yield call(UtilsEP.getRelations, action.payload, skip)
		
		
		return 	{Data, Count};
		//yield put(setRelationShips(usersList));
		//yield put(setUserWorkExperiences(works))

	} catch (ex) {
		//yield put(setRelationShips([]));
		return 	{Data:[], Count:0};
	}
}
export function* relationShipContacts() {
	try {
		const {Data, Count } = yield call(UtilsEP.getRelationsContacts)
		return 	{Data, Count };

	} catch (ex) {
		return 	{Data:[], Count:0};
	}
}
export function* watchRelationShipsFilter() {

	// yield takeLatest(
	// 	RelationshipsActionTypes.GET_RELATIONSHIPS as any,
	// 	relationShipFilter
	// )



}
