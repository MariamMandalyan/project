import { takeLatest, all, put, select, take, takeEvery } from 'redux-saga/effects';

import {OtherUserProfileActionTypes, RelationshipsActionTypes,UserApprovalsActionsTypes,UserBlockActionsTypes} from '../constants';
import crumbizApi from "../../services/api/crumbizInstance";
import {UserApprovalsEP, UserBlocksEP, UsersEP} from "../../services/api/routes";
import {
    getOtherUserProfile,
    getOtherUserProfileSection, setLoadMoreOtherUserProfileSection,
    setOtherUserProfile,
    setOtherUserProfileSection
} from "../actions/otherUserProfileActions";
import {OtherUserProfileSectionTypesEnum} from "../../types/enums";
import {OTHER_USER_SECTION_COUNT_PER_PAGE} from "../../types/constants";

export function* getOtherUserProfileSaga({ payload }) {
    console.log('/Relations2 payload:, ', payload);
    try {
        const {id, userId,invert} = payload
        const to:string = invert?userId:id
        const from:string = invert?id:userId
        const userRes = yield UsersEP.getUserIdById(payload.id);
        const approvel = yield UserApprovalsEP.getByUserId(from,to)
        const block = yield UserBlocksEP.getByUserId(from,to)
        const interestsRes = yield crumbizApi.get(`/UserInterests`, {
            params: {
                $filter: `userId eq ${payload.id}`
            }
        });
        console.log(approvel,block);
        
        const user = userRes[0];

        // user with interests
        user.interests = interestsRes.data.value;
        user.block = block
        user.approvel = approvel
        yield put(setOtherUserProfile(user));

    } catch (ex) {
        console.log('/Relations2 err, ');
        console.dir(ex);
    }
}

function* getOtherUserProfileSectionSaga({ payload }) {
    try {
        const { otherUserProfile } = yield select((state) => ({otherUserProfile: state.otherUserProfile.profile}));
        console.log('getOtherUserProfileSectionSaga: ', payload, otherUserProfile);

        const requestParams = {
            take: OTHER_USER_SECTION_COUNT_PER_PAGE,
            skip: 0,
            orderBy: 1, // most in common sorting
            filterBy: payload.sectionType,
            destinationUserId: otherUserProfile.id
        }

        const response = yield crumbizApi.post(`/Utils/Relations2`, requestParams);

        yield put(setOtherUserProfileSection({sectionType: payload.sectionType, data: response.data}))
    } catch (ex) {
        console.log('err: !!');
        console.dir(ex);
    }
}

function* loadMoreOtherUserProfileSectionSaga({ payload }) {
    try {
        const { otherUserProfile, sections } = yield select((state) => ({otherUserProfile: state.otherUserProfile.profile,
            sections: state.otherUserProfile.sections}));

        console.log('lalal', sections, otherUserProfile, payload);

        const section = sections.filter((s) => s.sectionType === payload.sectionType)[0];

        const requestParams = {
            take: OTHER_USER_SECTION_COUNT_PER_PAGE,
            skip: section.items.length,
            orderBy: 1, // most in common sorting
            filterBy: payload.sectionType,
            destinationUserId: otherUserProfile.id
        }

        const response = yield crumbizApi.post(`/Utils/Relations2`, requestParams);

        yield put(setLoadMoreOtherUserProfileSection({sectionType: payload.sectionType, data: response.data}))

    } catch (ex) {
        console.log('err: !!');
        console.dir(ex);
    }
}

function* setUserApproval({ payload }){
    const {id, userId} = payload
    try{
        yield UserApprovalsEP.create({
            userId,
            requireApprovalFromUserId:id
        })
        yield put(getOtherUserProfile({id, userId}))
    } catch (ex) {
        console.log('err: !!');
        console.dir(ex);
    }
}
function* setBlock({ payload }){
    const {id, userId} = payload
    try{
        yield UserBlocksEP.create({
            userId,
            blockUserId:id
        })
        yield put(getOtherUserProfile({id, userId}))
    } catch (ex) {
        console.log('err: !!');
        console.dir(ex);
    }
}
function* removeUserApproval({ payload }){
    const {id, userId, approvalId} = payload
    console.log('payload',payload);
    
    try{
        yield UserApprovalsEP.deleteById(approvalId)
        yield put(getOtherUserProfile({id, userId}))
    } catch (ex) {
        console.log('err: !!');
        console.dir(ex);
    }
}
function* removeBlock({ payload }){
    const {id, userId,blockId} = payload
    try{
        yield UserBlocksEP.deleteById(blockId)
        yield put(getOtherUserProfile({id, userId}))
    } catch (ex) {
        console.log('err: !!');
        console.dir(ex);
    }
}

export function* watchOtherUserProfileSaga() {
    yield all([
        takeLatest(OtherUserProfileActionTypes.GET_OTHER_USER_PROFILE as any, getOtherUserProfileSaga),
        takeEvery(OtherUserProfileActionTypes.GET_OTHER_USER_PROFILE_SECTION as any, getOtherUserProfileSectionSaga),
        takeEvery(OtherUserProfileActionTypes.GET_LOAD_MORE_OTHER_USER_PROFILE_SECTION as any, loadMoreOtherUserProfileSectionSaga),
        takeEvery(UserApprovalsActionsTypes.SET_USERAPPROVAL as any, setUserApproval),
        takeEvery(UserBlockActionsTypes.SET_BLOCK as any, setBlock),
        takeEvery(UserApprovalsActionsTypes.REMOVE_USERAPPROVAL as any, removeUserApproval),
        takeEvery(UserBlockActionsTypes.REMOVE_BLOCK as any, removeBlock)
    ]);
}
