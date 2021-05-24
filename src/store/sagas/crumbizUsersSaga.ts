import { put, all, takeLatest, select } from 'redux-saga/effects';
import { CrumbizUsersTypes } from '../constants';
import usersEP from '../../services/api/routes/Users';
import {
	IupdateUserInfoPayload,
	IPayload,
	IUpdateUserAdditionalsPayload
} from '../../types/interfaces';
import {
	updateuserAdditionalInfoSuccess,
	updateuserAdditionalInfoError,
	getCrumbizUsersSuccess,
	getCrumbizUsersError
} from '../actions/crumbizUsersActions';
import {
	getUserDataSelector,
	getUserAdditionals
} from '../selectors/authSelector';
import { updateUserDetails, updateLoadingUserDetails } from '../actions/authActions';
import userAdditionalsEP from '../../services/api/routes/UserAdditionals';
import extractIdFromResponseHeaders from '../../utils/extractIdFromResponseHeaders';
import AsyncStorage from '@react-native-community/async-storage';
import {
	setCrumbizUsers,
	setRelationshipsData
} from '../actions/crumbizUsersActions';
import {
	IUserData,
	IUserExpandedWithRelationships
} from '../../types/interfaces';
import { UserEmailsEP, UserPhonesEP, UserAdditionalsEP, UtilsEP } from '../../services/api/routes';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

//------------------------------------//
//  Watched Sagas                     //
//------------------------------------//

function* getCrumbizUsersSaga() {
	const userData = yield select(getUserDataSelector);
	try {
		const crumbizUsers: Array<IUserData> = yield usersEP.getCrumbizUsers(
			userData.id
		);

		const sortedCrumbizUsers = crumbizUsers.sort((contactA, contactB) => {
			if (contactA.firstName && contactB.firstName) {
				return contactA.firstName.localeCompare(contactB.firstName);
			}
			// firstname can be null
			return 0;
		});

		yield put(setCrumbizUsers(sortedCrumbizUsers));
		yield put(getCrumbizUsersSuccess());
	} catch (ex) {
		yield put(getCrumbizUsersError());
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Error getCrumbizUsersSaga', ex);
	}
}

function* getRelationshipsDataSaga() {
	const userData = yield select(getUserDataSelector);
	try {
		const usersList: Array<IUserExpandedWithRelationships> = yield usersEP.getRelationshipsData(
			userData.id
		);
		yield put(setRelationshipsData(usersList));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Error fetching getRelationshipsDataSaga ', ex);
	}
}

function* updateUserInfoSaga({ payload }: IPayload<IupdateUserInfoPayload>) {
	yield put (updateLoadingUserDetails());
	const userData = yield select(getUserDataSelector);
	const { userAdditionals, ...restUserData } = userData;

	try {
		const { updatedUserObject } = payload;
		const newUserObj = {
			...restUserData,
			...updatedUserObject
		};
		const {userPhones, userEmails, userAdditionals, ...sendData } = newUserObj;
		yield usersEP.putById(userData.id, sendData);
		if (updatedUserObject.userAdditionals && updatedUserObject.userAdditionals.length > 0) {
			const element = updatedUserObject.userAdditionals[0];
			yield UserAdditionalsEP.putById(element ?.id, element);
		}
		let isExist: boolean = false;
		if (updatedUserObject.userPhones)
			for (let i = 0; i < updatedUserObject.userPhones.length; i++) {
				const phone = updatedUserObject.userPhones[i];
				if(phone.isDeleted || phone.id || phone.phone ==='') continue;
				const exist = yield UtilsEP.checkUserExistence({ phone: '+' + ('' + phone.phone).replace(/\D/g, '') });
				phone.exist = (!!exist &&  exist.map((i: any) => i.Id).indexOf(userData.id) == -1) || updatedUserObject.userPhones.filter(i => (i.phone.replace(/\D/g, '') == phone.phone.replace(/\D/g, ''))).length > 1
				//!(!!!exist || ((!!exist && exist.map((i: any) => i.Id).indexOf(userData.id) > -1) && phone.id) || updatedUserObject.userPhones.filter(i => i.phone.replace(/\D/g, '') == phone.phone.replace(/\D/g, '')).length < 2)
				if(!phone.exist)
					phone.exist = updatedUserObject.userPhones.filter(i => (i.phone.replace(/\D/g, '') == phone.phone.replace(/\D/g, '') && !i.isDeleted)).length > 1

				if (phone.exist) {
					isExist = true
				}
			}
			//return 
		if (updatedUserObject.userEmails){
			for (let i = 0; i < updatedUserObject.userEmails.length; i++) {
				const email = updatedUserObject.userEmails[i];
				if(email.isDeleted || email.id) continue;
				const exist = yield UtilsEP.checkUserExistence({ email: email.email })
				email.exist = !(!!!exist || ((!!exist && exist.map((i: any) => i.Id).indexOf(userData.id) > -1) && email.id))
				if(!email.exist)
					email.exist = updatedUserObject.userEmails.filter(i => (i.email == email.email && !i.isDeleted)).length > 1
				if (email.exist) {
					isExist = true
				}
			}
		}

		if (isExist) {
			yield put(updateUserDetails({ ...userData, ...newUserObj, success: false ,updated:true}));
		}
		if (updatedUserObject.userPhones) {
			for (let i = 0; i < updatedUserObject.userPhones.length; i++) {
				const element = updatedUserObject.userPhones[i];
				if (!element.id && element.phone !='') {
					yield UserPhonesEP.create(element)
				}
				else if (element.isDeleted)
					yield UserPhonesEP.deleteById(element.id)
				else if(element.id)
					yield UserPhonesEP.putById(element.id, { ...element })

			}
			updatedUserObject.userPhones = updatedUserObject.userPhones.filter(item=>!item.isDeleted)
		}



		

		if (updatedUserObject.userEmails)
		{
			for (let i = 0; i < updatedUserObject.userEmails.length; i++) {
				const element = updatedUserObject.userEmails[i];
				if (!element.id)
					yield UserEmailsEP.create(element);
				else if (element.isDeleted)
					yield UserEmailsEP.deleteById(element.id);
				else if(element.id)
					yield UserEmailsEP.putById(element.id, { ...element })
			}
			updatedUserObject.userEmails = updatedUserObject.userEmails.filter(item=>!item.isDeleted)

		}

		
		yield put(updateUserDetails({ ...userData, ...newUserObj,...updatedUserObject, success: true,updated:true }));

	} catch (ex) {
		yield put(updateUserDetails({ ...userData, success: false,updated:true }));
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		console.log('Failed to updateUserInfoSaga', ex);
	}
}

function* updateUserAdditionalsSaga({
	payload
}: IPayload<IUpdateUserAdditionalsPayload>) {
	const userAdditionals = yield select(getUserAdditionals);
	const userData = yield select(getUserDataSelector);
	const { updatedUserAdditionalsKeys } = payload;

	try {
		if (userAdditionals.length && userAdditionals[0].id) {
			const userAdditionalsData = {
				...userAdditionals[0],
				...updatedUserAdditionalsKeys
			};
			yield userAdditionalsEP.putById(
				userAdditionals[0].id,
				userAdditionalsData
			);
			for (let user = 0; user < userAdditionalsData.length; user++) {
				//const element = array[user];

			}
			yield put(
				updateUserDetails({
					...userData,
					userAdditionals: [
						{
							...userAdditionals[0],
							...updatedUserAdditionalsKeys
						}
					]
				})
			);
		} else {
			const userAdditionalsData = {
				...updatedUserAdditionalsKeys,
				userId: userData.id
			};
			const response = yield userAdditionalsEP.create(userAdditionalsData);
			const userAdditionalsId = extractIdFromResponseHeaders(response.headers);
			yield put(
				updateUserDetails({
					...userData,
					userAdditionals: [
						{ ...updatedUserAdditionalsKeys, id: userAdditionalsId }
					]
				})
			);
		}
		const userCachedDetailsKey = `userDetails-${userData.authId}`;
		yield AsyncStorage.removeItem(userCachedDetailsKey);
		yield put(updateuserAdditionalInfoSuccess());
	} catch (ex) {
		console.log('Error updateUserAdditionalsSaga', ex);
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		yield put(updateuserAdditionalInfoError());
	}
}

export function* watchCrumbizUsersSaga() {
	yield all([
		takeLatest(CrumbizUsersTypes.GET_CRUMBIZ_USERS as any, getCrumbizUsersSaga),
		takeLatest(
			CrumbizUsersTypes.GET_RELATIONSHIPS_DATA as any,
			getRelationshipsDataSaga
		),
		takeLatest(CrumbizUsersTypes.UPDATE_USER_INFO as any, updateUserInfoSaga),
		takeLatest(
			CrumbizUsersTypes.UPDATE_USER_ADDITIONALS_INFO as any,
			updateUserAdditionalsSaga
		)
	]);
}
