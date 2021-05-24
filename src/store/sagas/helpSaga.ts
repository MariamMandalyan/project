import crumbizApi from "../../services/api/crumbizInstance";
import {all, put, takeLatest, select} from "redux-saga/effects";
import {errorHandler} from "../../utils";
import i18n from "../../locale/i18n";
import {HelpActionTypes} from "../constants";
import {setCategories, setTopics} from "../actions/helpActions";
import {IStoreProps} from "../../types/interfaces";

export function* getHelpTopicsSaga() {
    try {
        const response = yield crumbizApi.get('/HelpTopics?$orderby=position');

        console.log('getHelpTopicsSaga', response);

        yield put(setTopics({ topics: response.data.value }));
    } catch (ex) {
        errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
    }
}
export function* getHelpCategoriesSaga({ payload }: {payload: { helpTopicId: string }}) {
    try {
        const categories = yield select((state: IStoreProps) => state.help.categories);

        // check if already loaded then only change isLoading prop to false
        const oldCategories = categories.filter((c) => c.helpTopicId === payload.helpTopicId);

        if (oldCategories.length) {
            yield put(setCategories({ categories: []}))
        } else {
            const response = yield crumbizApi.get(`/HelpCategories?$orderby=position&$filter=helpTopicId eq ${payload.helpTopicId}`);

            yield put(setCategories({ categories: response.data.value}))
        }

    } catch (ex) {
        errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))
    }
}
export function* watchHelpSaga() {
    yield all([
        takeLatest(HelpActionTypes.GET_TOPICS as any, getHelpTopicsSaga),
        takeLatest(HelpActionTypes.GET_CATEGORIES as any, getHelpCategoriesSaga)
    ]);
}
