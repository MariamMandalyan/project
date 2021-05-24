import { combineReducers } from 'redux';
import createOpportunityReducer from './createOpportunityReducer';
import authReducer from './authReducer';
import sendIntroReducer from './sendIntroReducer';
import externalLinkReducer from './externalLinksReducer';
import oppOverviewReducer from './oppOverViewReducer';
import crumbizUsersReducer from './crumbizUsersReducer';
import summaryReducer from './summaryReducer';
import interactionsReducer from './interactionsReducer';
import deepLinksReducer from './deepLinksReducer';
import myOppsReducer from './myOppsReducer';
import pendingReducer from './pendingReducer';
import entityReducer from './entityReducer.ts';
import workExperienceReducer from './workExperience';
import relationshipsFilterReducer from "./relationshipsFilter";
import relationshipsFilterFieldReducer from "./relationshipsFilterField";
import relationshipsReducer from "./relationships";
import opportunitiesFilterReducer from "./opportunitiesFilter";
import opportunitiesFilterFieldReducer from "./opportunitiesFilterField";
import opportunitiesReducer from "./opportunities";
import countriesReducer from "./countries";
import analyticReducer from "./analytics";
import utilsReducer from './utilsReducer';
import ownerConnctorOverviewReducer from './ownerConnctorOverviewReducer';
import oppStatusesReducer from './oppStatusesReducer';
import registrationReducer from './registrationReducer';
import portfolioReducer from './portfolioReducer';
import interactionTypeReducer from './InteractionsTypesReducer';
import opportunityTypesReducer from './OpportunityTypesReducer';
import notificationsReducer from './Notification';
import notificationFilterReducer from './NotificationFilter';
import timeLineFilterReducer from './timeLineFilter'
import interactionDetailsReducer from './interactionDetailsReducer';
import interestsReducer from './interests';
import otherUserProfileReducer from "./otherUserProfileReducer";
import helpReducer from "./helpReducer";

export default combineReducers({
	pending: pendingReducer,
	interactions: interactionsReducer,
	summary: summaryReducer,
	createOpportunity: createOpportunityReducer,
	sendIntro: sendIntroReducer,
	auth: authReducer,
	externalLinks: externalLinkReducer,
	oppOverview: oppOverviewReducer,
	crumbizUsers: crumbizUsersReducer,
	deepLinks: deepLinksReducer,
	myOpps: myOppsReducer,
	entity: entityReducer,
	workExperience: workExperienceReducer,
	relationshipsFilter: relationshipsFilterReducer,
	relationships: relationshipsReducer,
	relationshipsFilterField: relationshipsFilterFieldReducer,
	opportunitiesFilter: opportunitiesFilterReducer,
	opportunities: opportunitiesReducer,
	opportunitiesFilterField: opportunitiesFilterFieldReducer,
	countries: countriesReducer,
	analytics: analyticReducer,
	utils: utilsReducer,
	ownerConnctorOverview: ownerConnctorOverviewReducer,
	oppStatuses: oppStatusesReducer,
	registration:registrationReducer,
	portfolio:portfolioReducer,
	interactionTypes:interactionTypeReducer,
	opportunityTypes:opportunityTypesReducer,
	notifications:notificationsReducer,
	notificationFilter:notificationFilterReducer,
	timeLineFilter:timeLineFilterReducer,
	interactionDetails:interactionDetailsReducer,
	interests: interestsReducer,
	otherUserProfile: otherUserProfileReducer,
	help: helpReducer
});
