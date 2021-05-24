//------------------------------------//
//  Auth                              //
//------------------------------------//
export enum AuthActionTypes {
	GET_USER_DETAILS = '@auth/GET_USER_DETAILS',
	SET_USER_DETAILS = '@auth/SET_USER_DETAILS',
	UPDATE_USER_DETAILS = '@auth/UPDATE_USER_DETAILS',
	UPDATE_LOADING_USER_DETAILS = '@auth/UPDATE_LOADING_USER_DETAILS',
	CLEAR_USER_DETAILS = '@auth/CLEAR_USER_DETAILS',
	LOGOUT_USER = '@auth/LOGOUT_USER',
	LOGIN = '@auth/LOGIN',
	LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
	LOGIN_FIELD = '@auth/LOGIN_FIELD',
	REGISTER = '@auth/REGISTER',
	AUTH_SUCCESS = '@auth/AUTH_SUCCESS',
	REFRESH_TOKEN = '@auth/REFRESH_TOKEN',
	FORGOT_PASSWORD = '@auth/FORGOT_PASSWORD',
	FORGOT_PASSWORD_FAILURE = '@auth/FORGOT_PASSWORD_FAILURE',
	FORGOT_PASSWORD_SENT = '@auth/FORGOT_PASSWORD_SENT',
	CHANGE_PASSWORD = '@auth/CHANGE_PASSWORD',
	RESET_PASSWORD = '@auth/RESET_PASSWORD',
	CONFIRM_REGISTERATION = '@auth/CONFIRM_REGISTERATION',
	INIT_AUTHENTICATION_FLOW = '@auth/INIT_AUTHENTICATION_FLOW',
	GET_EXISTS = '@auth/GET_EXISTS',
	SET_EXISTS = '@auth/SET_EXISTS',
	SET_EMAIL_VALIDATION = '@auth/SET_EMAIL_VALIDATION',
}
//------------------------------------//
//  Registration                      //
//------------------------------------//
export enum RegistrationActionTypes {

	UPDATE = '@RegistrationActionTypes/UPDATE',
	RESET = '@RegistrationActionTypes/RESET',
}
//------------------------------------//
// Relationships Filter               //
//------------------------------------//
export enum RelationshipsFilterActionTypes {
	SET_FILTER = '@relationshipsFilterActionTypes/SET_FILTER',
}
export enum RelationshipsActionTypes {
	SET_RELATIONSHIPS = '@RelationshipsActionTypes/SET_RELATIONSHIPS',
	SET_RELATIONSHIPS_LAZY = '@RelationshipsActionTypes/SET_RELATIONSHIPS_LAZY',
	GET_RELATIONSHIPS = '@RelationshipsActionTypes/GET_RELATIONSHIPS',
}
export enum RelationshipsFilterFieldsActionTypes {
	GET_FILTER_FIELDS = '@relationshipsFilterFieldsActionTypes/GET_FILTER_FIELDS',
	SET_FILTER_FIELDS = '@relationshipsFilterFieldsActionTypes/SET_FILTER_FIELDS',
}
//------------------------------------//
//  Work Experiance                   //
//------------------------------------//

//------------------------------------//
// Opportunities Filter               //
//------------------------------------//
export enum OpportunitiesFilterActionTypes {
	SET_FILTER = '@opportunitiesFilterActionTypes/SET_FILTER',
	SET_FILTER_IN_REDUCER = '@opportunitiesFilterActionTypes/SET_FILTER_IN_REDUCER',
}
export enum OpportunitiesActionTypes {
	SET_OPPORTUNITIES = '@opportunitiesActionTypes/SET_OPPORTUNITIES',
	RESET_OPPORTUNITIES = '@opportunitiesActionTypes/RESET_OPPORTUNITIES',
	SET_OPPORTUNITIES_LAZY = '@opportunitiesActionTypes/SET_OPPORTUNITIES_LAZY',

	GET_OPPORTUNITIES = '@opportunitiesActionTypes/GET_OPPORTUNITIES',
	SET_OPPORTUNITIES_PARAM = '@opportunitiesActionTypes/SET_OPPORTUNITIES_PARAM',
	SET_LOAD_NEW_PAGE= '@opportunitiesActionTypes/SET_LOAD_NEW_PAGE',
	EDIT_OPPORTUNITY= '@opportunitiesActionTypes/EDIT_OPPORTUNITY',
}
export enum OpportunitiesFilterFieldsActionTypes {
	GET_FILTER_FIELDS = '@opportunitiesFilterFieldsActionTypes/GET_FILTER_FIELDS',
	SET_FILTER_FIELDS = '@opportunitiesFilterFieldsActionTypes/SET_FILTER_FIELDS',
	SET_FILTER_ROLES = '@opportunitiesFilterFieldsActionTypes/SET_FILTER_ROLES',
}

export enum WorkExperienceActionTypes {
	GET_WORK_EXPERIENCES = '@workExperience/GET_WORK_EXPERIENCES',
	SET_WORK_EXPERIENCES = '@workExperience/SET_WORK_EXPERIENCES',
	SAVE_WORK_EXPERIENCES = '@workExperience/SAVE_WORK_EXPERIENCES',
}
//------------------------------------//
//  Analytics                         //
//------------------------------------//
export enum AnalyticsActionTypes {
	SET_ANALYTICS = '@analyticsActionTypes/SET_ANALYTICS',
	GET_ANALYTICS = '@analyticsActionTypes/GET_ANALYTICS',
}
//------------------------------------//
//  Affiliate                         //
//------------------------------------//
export enum AffiliateActionsTypes {
	ADD_AFFILIATE = '@AffiliateActionsTypes/ADD_AFFILIATE',
}

//------------------------------------//
//  Affiliate                         //
//------------------------------------//
export enum UserApprovalsActionsTypes {
	SET_USERAPPROVAL = '@UserApprovalsActionsTypes/SET_USERAPPROVAL',
	GET_USERAPPROVAL = '@UserApprovalsActionsTypes/GET_USERAPPROVAL',
	REMOVE_USERAPPROVAL = '@UserApprovalsActionsTypes/REMOVE_USERAPPROVAL',
}
//------------------------------------//
//  Affiliate                         //
//------------------------------------//
export enum UserBlockActionsTypes {
	SET_BLOCK = '@UserBlockActionsTypes/SET_BLOCK',
	REMOVE_BLOCK =  '@UserBlockActionsTypes/REMOVE_BLOCK',
}
//------------------------------------//
//  Create Opportunity                //
//------------------------------------//
export enum CreateOpportunityTypes {
	UPDATE_OPPORTUNITY = '@createOpportunity/UPDATE_OPPORTUNITY',
	UPDATE_OPPORTUNITY_FIELD = '@createOpportunity/UPDATE_OPPORTUNITY_FIELD',
	SUBMIT_OPPORTUNITY = '@createOpportunity/SUBMIT_OPPORTUNITY',
	RESET_CREATE_OPP_STATE = '@createOpportunity/RESET_CREATE_OPP_STATE',
	SET_ADD_NEW_CONNECTOR_CONFIG = '@createOpportunity/SET_ADD_NEW_CONNECTOR_CONFIG',
	ADD_NEW_CONNECTOR = '@createOpportunity/ADD_NEW_CONNECTOR',
	GET_TEMPLATE_FIELD = '@createOpportunity/GET_TEMPLATE_FIELD',
	SET_TEMPLATE_FIELD = '@createOpportunity/SET_TEMPLATE_FIELD',
	GET_OPP_TYPES = '@createOpportunity/GET_OPP_TYPES',
	SET_OPP_TYPES = '@createOpportunity/SET_OPP_TYPES',
	SET_FIELD_DATAS = '@createOpportunity/SET_FIELD_DATAS',
	SET_DETAIL_FIELD = '@createOpportunity/SET_DETAIL_FIELD',
	SET_OPPID = '@createOpportunity/SET_OPPID',
	GET_RELATIONSHIPS_CONTACTS = '@createOpportunity/GET_RELATIONSHIPS_CONTACTS',
	SET_RELATIONSHIPS_CONTACTS = '@createOpportunity/SET_RELATIONSHIPS_CONTACTS'

}

//------------------------------------//
//  Send Intro                        //
//------------------------------------//
export enum SendIntroTypes {
	UPDATE_INTRO = '@sendIntro/UPDATE_INTRO',
	ADD_ATTACHMENT = '@sendIntro/ADD_ATTACHMENT',
	REMOVE_ATTACHMENT = '@sendIntro/REMOVE_ATTACHMENT',
	REMOVE_ALL_ATTACHMENTS = "@sendIntro/REMOVE_ALL_ATTACHMENTS",
	RESET_INTRO_STATE = '@sendIntro/RESET_INTRO_STATE',
	// GET_OPPORTUNITYS_AS_CONNECTOR = '@sendIntro/GET_OPPORTUNITYS_AS_CONNECTOR',
	SET_OPP_DATA = '@sendIntro/SET_OPP_DATA',
	CHOOSE_OPP_ID = '@sendIntro/CHOOSE_OPP_ID',
	CHECK_FOR_ENTITY_EXISTENCE = '@sendIntro/CHECK_FOR_ENTITY_EXISTENCE',
	PREPARE_TEMPLATES = '@sendIntro/PREPARE_TEMPLATES',
	SET_TEMPLATES = '@sendIntro/SET_TEMPLATES',
	SAVE_NEW_TEMPLATE = '@sendIntro/SAVE_NEW_TEMPLATE',
	DELETE_TEMPLATE = '@sendIntro/DELETE_TEMPLATE',
	PUT_TEMPLATE = '@sendIntro/PUT_TEMPLATE',
	SET_TEMPLATE_FAVORITE = '@sendIntro/SET_TEMPLATE_FAVORITE',
	ADD_TEMPLATE_FAVORITE = '@sendIntro/ADD_TEMPLATE_FAVORITE',
	ADD_SAVED_TEMPLATE = '@sendIntro/ADD_SAVED_TEMPLATE',
	CONNECT_TARGET = '@sendIntro/CONNECT_TARGET',
	GET_OPP_DETAILS_AND_TEMPLATES = '@sendIntro/GET_OPP_DETAILS_AND_TEMPLATES'
}

//------------------------------------//
//  External Links                    //
//------------------------------------//
export enum ExternalLinksTypes {
	SET_REDIRECTED_FROM_EXTERNAL = '@sendIntro/SET_REDIRECTED_FROM_EXTERNAL'
}

//------------------------------------//
//  Notifications                     //
//------------------------------------//
export enum NotificationsActionTypes {
	GET_NOTIFICATION = '@NotificationsActionTypes/GET_NOTIFICATION',
	SET_NOTIFICATION = '@NotificationsActionTypes/SET_NOTIFICATION',
	SET_NOTIFICATION_LAZY = '@NotificationsActionTypes/SET_NOTIFICATION_LAZY',
	READ_NOTIFICATIONS = '@NotificationsActionTypes/READ_NOTIFICATIONS',
	GET_FILTER_FIELDS =  '@NotificationsActionTypes/GET_FILTER_FIELDS',
	SET_FILTER_FIELDS =  '@NotificationsActionTypes/SET_FILTER_FIELDS',
	SET_FILTER =  '@NotificationsActionTypes/SET_FILTER',
	CLEAR_FILTER =  '@NotificationsActionTypes/CLEAR_FILTER',
	SAVE_FILTER =  '@NotificationsActionTypes/SAVE_FILTER',
	DONT_SAVE_FILTER =  '@NotificationsActionTypes/DONT_SAVE_FILTER',
}

//------------------------------------//
//  TimeLine                  //
//------------------------------------//
export enum TimeLineActionTypes {
	GET_TIMELINE = '@TimeLineTypes/GET_TIMELINE',
	SET_TIMELINE = '@TimeLineTypes/SET_TIMELINE',
	READ_TIMELINE = '@TimeLineTypes/READ_TIMELINE',
	GET_FILTER_FIELDS =  '@TimeLineTypes/GET_FILTER_FIELDS',
	SET_FILTER_FIELDS =  '@TimeLineTypes/SET_FILTER_FIELDS',
	SET_FILTER =  '@TimeLineTypes/SET_FILTER',
	CLEAR_FILTER =  '@TimeLineTypes/CLEAR_FILTER',
	SAVE_FILTER =  '@TimeLineTypes/SAVE_FILTER',
	DONT_SAVE_FILTER =  '@TimeLineTypes/DONT_SAVE_FILTER',
}

//------------------------------------//
//  Opp OverView                      //
//------------------------------------//
export enum OppOverviewTypes {
	SET_PINS = '@oppOverview/SET_PINS',
	GET_ALL_PINS = '@oppOverview/GET_ALL_PINS',
	GET_ASSOCIATED_OPPS = '@oppOverview/GET_ASSOCIATED_OPPS',
	SET_ASSOCIATED_OPPS = '@oppOverview/SET_ASSOCIATED_OPPS',
	GET_TARGET_PROFILE = '@oppOverview/GET_TARGET_PROFILE',
	SET_OPP_ID_AND_ROLE = '@oppoverview/SET_OPP_ID_AND_ROLE',
	GET_OPP_SUMMARY = '@oppOverview/GET_OPP_SUMMARY',
	SET_OPP_SUMMARY = '@oppOverview/SET_OPP_SUMMARY',
	SET_OPPORTUNITY_DETAILS = '@oppOverview/SET_OPPORTUNITY_DETAILS',
	GET_OPP_DETAILS_TARGETS_AND_CONNECTORS = '@oppOverview/GET_OPP_DETAILS_TARGETS_AND_CONNECTORS',
	SET_TARGETS_AND_CONNECTORS = '@oppOverview/SET_TARGETS_AND_CONNECTORS',
	GET_OPP_DETAILS = '@oppoppOverview/GET_OPP_DETAILS',
	SET_OPP_DETAILS = '@oppoppOverview/SET_OPP_DETAILS',
	NEW_UPDATE_IN_OPP_DETAILS = '@oppoppOverview/NEW_UPDATE_IN_OPP_DETAILS',
	UPDATE_TARGET_STATUS = '@oppOverview/UPDATE_TARGET_STATUS', // UI Update
	CHANGE_TARGET_STATUS = '@oppOverview/CHANGE_TARGET_STATUS', // DB update
	RESET_OPP_OVERVIEW_STATE = '@oppOverview/RESET_OPP_OVERVIEW_STATE',
	CHANGE_ENTITY_DECISION = '@oppOverview/CHANGE_ENTITY_DECISION',
	UPDATE_TARGET_STATUS_INSIDE_PROFILE = '@oppOverview/UPDATE_TARGET_STATUS_INSIDE_PROFILE',
	OPEN_CAN_ADD_TARGETS_MODAL = '@oppOverview/OPEN_CAN_ADD_TARGETS_MODAL',
	CHANGE_OPP_STATUS = '@oppOverview/CHANGE_OPP_STATUS', // DB update
	UPDATE_OPP_STATUS = '@oppOverview/UPDATE_OPP_STATUS', // UI update
	GET_PREDEFINED_MESSAGES = '@oppOverview/GET_PREDEFINED_MESSAGES',
	SET_PREDEFINED_MESSAGES = '@oppOverview/SET_PREDEFINED_MESSAGES',
	SEND_INTERACTION = '@oppOverview/SEND_INTERACTION',
	NEW_INTERACTION = '@oppOverview/NEW_INTERACTION',
	GET_NEW_OPP_DATA = '@oppOverview/GET_NEW_OPP_DATA',
	SET_NEW_OPP_DATA = '@oppOverview/SET_NEW_OPP_DATA',
	CC_TO_CONNECTOR_TOGGLE = '@oppOverview/CC_TO_CONNECTOR_TOGGLE',
	SEND_SPACIEL_INTERACTION = '@oppOverview/SEND_SPACIEL_INTERACTION',
	SET_NEW_OPP_MODAL = '@oppOverview/SET_NEW_OPP_MODAL',
	GET_OPP_INTERACTIONS = '@oppOverview/GET_OPP_INTERACTIONS',
	GET_TARGET_INTERACTIONS = '@oppOverview/GET_TARGET_INTERACTIONS',
	GET_TARGET_OVERVIEW_INTERACTIONS = '@oppOverview/GET_TARGET_OVERVIEW_INTERACTIONS',
	GET_TARGET_FEED = '@oppOverview/GET_TARGET_FEED',
	SET_TARGET_FEED = '@oppOverview/SET_TARGET_FEED',
	GET_OPPORTUNITY_FEED = '@oppOverview/GET_OPPORTUNITY_FEED',
	SET_OPPORTUNITY_FEED = '@oppOverview/SET_OPPORTUNITY_FEED',
	GET_OPPORTUNITY_TARGET_STATUSES = '@oppOverview/GET_OPPORTUNITY_TARGET_STATUSES',
	SET_OPPORTUNITY_TARGET_STATUSES = '@oppOverview/SET_OPPORTUNITY_TARGET_STATUSES',
	GET_TARGET = '@oppOverview/GET_TARGET',
	GET_TARGET_FOR_APPROVAL = '@oppOverview/GET_TARGET_FOR_APPROVAL',
	SET_TARGET = '@oppOverview/SET_TARGET',
	SET_TEMPLATE_FIELDS_DATAS = '@oppOverview/SET_TEMPLATE_FIELDS_DATAS',
	GET_TEMPLATE_FIELDS_DATAS = '@oppOverview/GET_TEMPLATE_FIELDS_DATAS',
	SET_OPPORTUNITY_PIN = '@oppOverview/SET_OPPORTUNITY_PIN',
	DELETE_OPPORTUNITY = '@oppOverview/DELETE_OPPORTUNITY',
	SET_RESET_NOTIFICATION = '@oppOverview/RESET_NOTIFICATION',
	SET_APPROVE_INTERACTION = '@oppOverview/SET_APPROVE_INTERACTION',
	GET_APPROVE_INTERACTION = '@oppOverview/GET_APPROVE_INTERACTION',
	SET_PREVIOUS_STATE = '@oppOverview/SET_PREVIOUS_STATE'
}


//------------------------------------//
//       OwnerConnctorOverview        //
//------------------------------------//

export enum OwnerConnctorOverviewTypes {
	GET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER = "@OwnerConnctorOverviewTypes.GET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER",
	SET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER = "@OwnerConnctorOverviewTypes.SET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER",
	GET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER = "@OwnerConnctorOverviewTypes.GET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER",
	SET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER = "@OwnerConnctorOverviewTypes.SET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER"
}

//------------------------------------//
//  Crumbiz Users                     //
//------------------------------------//
export enum CrumbizUsersTypes {
	GET_CRUMBIZ_USERS = '@crumbizUsers/GET_CRUMBIZ_USERS',
	SET_CRUMBIZ_USERS = '@crumbizUsers/SET_CRUMBIZ_USERS',
	GET_RELATIONSHIPS_DATA = '@crumbizUsers/GET_RELATIONSHIPS_DATA',
	SET_RELATIONSHIPS_DATA = '@crumbizUsers/SET_RELATIONSHIPS_DATA',
	UPDATE_USER_INFO = '@crumbizUsers/UPDATE_USER_INFO',
	UPDATE_USER_ADDITIONALS_INFO = '@crumbizUsers/UPDATE_USER_ADDITIONALS_INFO',
	RESET_CRUMBIZ_USERS_STATE = '@crumbizUsers/RESET_CRUMBIZ_USERS_STATE'
}
//------------------------------------//
//  InteractionsFeed types            //
//------------------------------------//
export enum InteractionsTypes {
	GET_SUMMARY_DATA = '@interactions/GET_SUMMARY_DATA',
	GET_INTERACTIONS = '@interactions/GET_INTERACTIONS',
	APPROVE_OPP = '@interactions/APPROVE_OPP',
	DECLINE_OPP = '@interactions/DECLINE_OPP',
	GET_INTERACTION_DETAILS = '@interactions/GET_INTERACTION_DETAILS',
	SET_INTERACTION_DETAILS = '@interactions/SET_INTERACTION_DETAILS',
	SEND_MESSAGE = '@interactions/SEND_MESSAGE',
	GET_MESSAGES = '@interactions/GET_MESSAGES',
	SET_MESSAGES = '@interactions/SET_MESSAGES',
	SEND_NOTE = '@interactions/SEND_NOTE',
	SEE_INTRO_INVITE = '@interactions/SEE_INTRO_INVITE',
}

//------------------------------------//
//  Interaction types                 //
//------------------------------------//
export enum InteractionTypeTypes {
	GET_INTERACTION_TYPES = '@interactionsTypes/GET_INTERACTION_TYPES',
	SET_INTERACTION_TYPES = '@interactionsTypes/SET_INTERACTION_TYPES',
}
//------------------------------------//
//  Interaction types                 //
//------------------------------------//
export enum OpportunityTypesTypes {
	GET_OPPORTUNITY_TYPES = '@interactionsTypes/GET_OPPORTUNITY_TYPES',
	SET_OPPORTUNITY_TYPES = '@interactionsTypes/SET_OPPORTUNITY_TYPES',
}

//------------------------------------//
//  Depplink types                    //
//------------------------------------//
export enum DeepLinksTypes {
	SET_DEEP_LINK = '@deepLinks/SET_DEEP_LINK',
	SET_USER_ID = '@deepLinks/SET_USER_ID',
	CLEAR_DEEP_LINK = '@deepLinks/CLEAR_DEEP_LINK'
}

//------------------------------------//
//  My opps types                     //
//------------------------------------//
export enum MyOppsTypes {
	GET_MY_OPPS = '@myOpps/GET_MY_OPPS',
	SET_MY_OPPS = '@myOpps/SET_MY_OPPS',
	RESET_MY_OPPS_STATE = '@myOpps/RESET_MY_OPPS_STATE',
	MUTE_OPP = '@myOpps/MUTE_OPP',
	GET_MY_OPPS_STATUSES = '@myOpps/GET_MY_OPPS_STATUSES',
	SET_MY_OPPS_STATUSES = '@myOpps/SET_MY_OPPS_STATUSES',
	GET_MY_OPPS_TOP_NOTIFICATIONS = '@myOpps/GET_MY_OPPS_TOP_NOTIFICATIONS',
	SET_MY_OPPS_TOP_NOTIFICATIONS = '@myOpps/SET_MY_OPPS_TOP_NOTIFICATIONS'
}

//------------------------------------//
// Entity types                       //
//------------------------------------//

export enum EntityTypes {
	INIT_ENTITY = '@entity/INIT_ENTITY',
	SET_ENTITY = '@entity/SET_ENTITY',
	TOGGLE_PHONE_PREFERENCE = '@entity/TOGGLE_PHONE_PREFERENCE',
	TOGGLE_EMAIL_PREFERENCE = '@entity/TOGGLE_EMAIL_PREFERENCE',
	CLEAR_ENTITY_STATE = '@entity/CLEAR_ENTITY_STATE',
	SET_ENTITY_EXISTS = '@entity/SET_ENTITY_EXISTS'
}

//------------------------------------//
// Countries types                       //
//------------------------------------//

export enum CountriesActionTypes {
	GET_ALL_COUNTRIES = '@countriesActionTypes/GET_ALL_COUNTRIES',
	SET_ALL_COUNTRIES = '@countriesActionTypes/SET_ALL_COUNTRIES',
}
//------------------------------------//
// Portfolio types                       //
//------------------------------------//

export enum PortfolioActionTypes {
	GET_PORTFOLIO = '@portfolioActionTypes/GET_PORTFOLIO',
	SET_PORTFOLIO = '@portfolioActionTypes/SET_PORTFOLIO',
	SET_PORTFOLIOS = '@portfolioActionTypes/SET_PORTFOLIOS',
}

//------------------------------------//
// Feedback types                     //
//------------------------------------//

export enum FeedbackActionTypes {
	SEND_FEEDBACK = '@feedbackActionTypes/SEND_FEEDBACK',
}

//------------------------------------//
// Share types                     		//
//------------------------------------//

export enum ShareActionTypes {
	SHARE_APP = '@feedbackActionTypes/SHARE_APP',
}

//------------------------------------//
// Deep Link               						//
//------------------------------------//

// export enum DeepLinkActionTypes {
// 	SET_DEEP_LINK = '@DeepLinkActionTypes/SET_DEEP_LINK',
// }

//------------------------------------//
// Utility action types               //
//------------------------------------//

export enum UtilityActionTypes {
	SET_COLD_START_TIME = '@utilityActionTypes/SET_COLD_START_TIME',
	SET_ONBOARDING_FINISHED = '@utilityActionTypes/SET_ONBOARDING_FINISHED',
	SAVE_CURRENT_SCREEN = "@utilityActionTypes/SAVE_CURRENT_SCREEN"
}

//------------------------------------//
// Opp statuses action types          //
//------------------------------------//

export enum OppStatusesActionTypes {
	GET_OPP_STATUSES = '@oppStatusesActionTypes/GET_OPP_STATUSES',
	SET_OPP_STATUSES = '@oppStatusesActionTypes/SET_OPP_STATUSES',
}
//------------------------------------//
//    Paginaton action types          //
//------------------------------------//

export enum PaginationActionTypes {
	LOAD_DATA = "@PaginationActionTypes/LOAD_DATA",
	LOAD_FIRST_DATA = "@PaginationActionTypes/LOAD_FIRST_DATA",
}

//------------------------------------//
// Feedback types                     //
//------------------------------------//

export enum InterestsActionTypes {
	GET_INTERESTS = '@interestsActionTypes/GET_INTERESTS',
	SET_INTERESTS = '@interestsActionTypes/SET_INTERESTS',
	GET_INTERESTS_TYPES = '@interestsActionTypes/GET_INTERESTS_TYPES',
	SET_INTERESTS_TYPES = '@interestsActionTypes/SET_INTERESTS_TYPES',
	UPDATE_INTERESTS = '@interestsActionTypes/UPDATE_INTERESTS',
}

export enum OtherUserProfileActionTypes {
	GET_OTHER_USER_PROFILE = '@OtherUserProfileActionTypes/GET_OTHER_USER_PROFILE',
	SET_OTHER_USER_PROFILE = '@OtherUserProfileActionTypes/SET_OTHER_USER_PROFILE',

	GET_OTHER_USER_PROFILE_SECTION = '@OtherUserProfileActionTypes/GET_OTHER_USER_PROFILE_SECTION',
	SET_OTHER_USER_PROFILE_SECTION = '@OtherUserProfileActionTypes/SET_OTHER_USER_PROFILE_SECTION',

	GET_LOAD_MORE_OTHER_USER_PROFILE_SECTION = '@OtherUserProfileActionTypes/GET_LOAD_MORE_OTHER_USER_PROFILE_SECTION',
	SET_LOAD_MORE_OTHER_USER_PROFILE_SECTION = '@OtherUserProfileActionTypes/SET_LOAD_MORE_OTHER_USER_PROFILE_SECTION',
}

export enum HelpActionTypes {
	GET_CATEGORIES = '@HelpActionTypes/GET_CATEGORIES',
	SET_CATEGORIES = '@HelpActionTypes/SET_CATEGORIES',

	GET_TOPICS = '@HelpActionTypes/GET_TOPICS',
	SET_TOPICS = '@HelpActionTypes/SET_TOPICS',
}
