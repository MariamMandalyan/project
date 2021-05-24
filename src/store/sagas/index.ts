import { all } from 'redux-saga/effects';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

import crumbizApi from '../../services/api/crumbizInstance';

import { watchAuthSaga } from './authSaga';
import { watchCreateOppSaga } from './createOpportunitySaga';
import { watchSendIntroSaga } from './sendIntroSaga';
import { watchOppOverviewSaga } from './oppOverviewSaga';
import { watchCrumbizUsersSaga } from './crumbizUsersSaga';
import { watchMyOppsSaga } from './myOppsSaga';
import { watchInteractionsSaga } from './interactionsSaga';
import { watchEntitySaga } from './entitySaga';
import { watchWorkExperience } from './workExperience';
import { watchRelationShipsFilter } from './relationshipFilter';
import { watchRelationShipsFilterField } from './relationshipFilterFields';
import { watchOpportunitiesFilterField } from './opportunitiesFilterFields';
import { watchOpportunitiessFilter } from './opportunitiesFilter';
import { watchCountries } from './countries';
import { watchAnalytics } from './analyticsSaga';
import { watchFeedbackSaga } from './feedbackSaga';
import { watchShareAppSaga } from './shareSaga';
import { watchOppStatusesSaga } from './oppStatusesSaga';
import { watchPaginatonSaga } from './paginationSaga';
import { watchPortfolio } from './portfolioSaga';
import { watchInteractionTypesSaga } from './interactionsTypesSaga';
import { watchNotificationsSaga } from './notificationsSaga';
import { watchInterestsSaga } from './interestsSaga';
import { watchOtherUserProfileSaga } from './otherUserProfileSaga';
import {watchTargetVInteractionsSaga} from './approveInteraction'
import { watchAffiliateSaga } from './AffiliateSaga';
import { watchHelpSaga } from './helpSaga';

function* sagaRequestsMiddleware() {
	yield createRequestInstance({ driver: createDriver(crumbizApi) });
	yield watchRequests();
}

export default function* rootSaga() {
	yield all([
		sagaRequestsMiddleware(),
		watchAuthSaga(),
		watchCreateOppSaga(),
		watchSendIntroSaga(),
		watchInteractionsSaga(),
		watchOppOverviewSaga(),
		watchCrumbizUsersSaga(),
		watchMyOppsSaga(),
		watchEntitySaga(),
		watchWorkExperience(),
		watchRelationShipsFilter(),
		watchRelationShipsFilterField(),
		watchOpportunitiessFilter(),
		watchOpportunitiesFilterField(),
		watchCountries(),
		watchAnalytics(),
		watchFeedbackSaga(),
		watchShareAppSaga(),
		watchOppStatusesSaga(),
		watchPaginatonSaga(),
		watchPortfolio(),
		watchInteractionTypesSaga(),
		watchNotificationsSaga(),
		watchInterestsSaga(),
		watchOtherUserProfileSaga(),
		watchTargetVInteractionsSaga(),
		watchAffiliateSaga(),
		watchHelpSaga()
	]);
}
