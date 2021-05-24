import {IReduxAction, IWorkExperience, IWorkExperienceState} from '../../types/interfaces';
import { WorkExperienceActionTypes } from '../constants';

const initialState: IWorkExperienceState = {
	items: [],
	isLoading: false
}

const workExperienceReduser = (
	state = initialState,
	action: IReduxAction<WorkExperienceActionTypes>
) => {
	switch (action.type) {
		case WorkExperienceActionTypes.GET_WORK_EXPERIENCES: {
			return {
				...state,
				isLoading: true,
			}
		}
		case WorkExperienceActionTypes.SET_WORK_EXPERIENCES: {
			return {
				items: action.payload,
				isLoading: false
			}
		}
		default:
			return state;
	}
};
export default workExperienceReduser;
