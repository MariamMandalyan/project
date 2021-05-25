import { all } from 'redux-saga/effects';

import { watchUsers } from './main';

export default function* rootSaga() {
	yield all([
		watchUsers()
	]);
}
