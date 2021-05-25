import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { MainTypes } from '../constants';
import Main from "../../services/api/main"
import { setUsers } from '../actions/mainActions';

function* users({ payload }: any) {
	try {
		//@ts-ignore
		const data = yield Main.getUsers(payload);				
		yield put(setUsers(data.data))
	} catch (ex) {
		console.log(ex,"error");
	}
}
export function* watchUsers() {
	yield takeEvery(
		MainTypes.GETUSERS as any,
		users
	)
}
