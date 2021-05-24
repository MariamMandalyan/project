import { put, call, takeEvery } from 'redux-saga/effects';
import { WorkExperienceActionTypes } from '../constants';
import { WorkExperienceEP, UsersEP } from '../../services/api/routes';
import { setUserWorkExperiences } from '../actions/workExperience';
import { IWorkExperience, IAction } from '../../types/interfaces';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';
import { setUserDetails } from '../actions/authActions';

function* getWorkExperiences({payload}:any) {
	try {
		const works = yield call(WorkExperienceEP.getWorkExperiancesByUserId, payload)
		yield put(setUserWorkExperiences(works))
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('could not load WorkExperiences');
	}
}
function* addNewWorkExperiences(action:IAction<WorkExperienceActionTypes,IWorkExperience[]>) {
	try {
		const {authId, id:userId} = action.userData;
		
		for (let i = 0; i < action.payload.length; i++) {
			if(action.payload[i].isDeleted){
				if(action.payload[i].id)
				yield WorkExperienceEP.deleteById(action.payload[i]?.id);
			}else{
				if(!action.payload[i].id)
					yield call(WorkExperienceEP.addWorkExperiances, action.payload[i])
				else
					yield WorkExperienceEP.putById(action.payload[i]?.id, action.payload[i])
			}
			
		}
		const works = yield call(WorkExperienceEP.getWorkExperiancesByUserId, userId)
		yield put(setUserWorkExperiences(works))
		const data = yield UsersEP.getUserIdByAuthId(authId);
		yield put(setUserDetails(data.value[0]));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('could not load templates');
	}
}

export function* watchWorkExperience() {
	
	yield takeEvery(
		WorkExperienceActionTypes.GET_WORK_EXPERIENCES as any,
		getWorkExperiences
	)
	yield takeEvery(
		WorkExperienceActionTypes.SAVE_WORK_EXPERIENCES as any,
		addNewWorkExperiences
	)
	

}
