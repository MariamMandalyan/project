export enum EntityEnum {
	CONNECTOR,
	OWNER,
	TARGET,
	ALL
}

export enum EntityStringEnum {
	'Connector',
	'Initiator',
	'Contributor',
}

export enum EntityIdsEnum {
	OWNER = '73019816-b4f7-4b9a-b967-e2fb6cbf20ff',
	CONNECTOR = 'ca3aa917-f4b5-4579-801e-70f8c5ded1d6',
	TARGET = '014b7dfc-75be-44b4-91e4-6784f388dc5d'
}

export enum InteractionMenuOptionsEnum {
	QUESTION,
	MESSAGE,
	CALENDAR
}

// export enum ConnectionStatusEnum {
// 	APPROVED,
// 	PENDING_APPROVAL,
// 	DECLINED
// }
export enum AnalyticsEnum {
	OPPORTUNITY,
	RELATIONSHIP,
	TIMELINE
}

// export enum IntroStatusEnum {
// 	INTRO,
// 	GOOD_TO_GO,
// 	DONE_DEAL
// }

// Todo All - use i18n
export enum OpportunityCategoriesEnum {
	OPP_TYPE = 'Opp type',
	LOCATION = 'Location',
	TEAM_SIZE = 'Team Size',
	TITLE = 'Title',
	TYPE_OF_BUSINESS = 'Type of business',
	VERTICAL = 'Vertical',
	SERVICE_PROVIDER = 'Service Provider',
	BUDGET = 'Budget'
}

export enum SeveralInteractionTypesEnum {
	SENT_INTRO = '2996845d-5474-4dbf-9658-8ad43658a2d8',
	SENT_INVITE = 'ae7ed19a-5349-4469-a69a-0a486f3987fd',
	MESSAGE = '07f5d1af-de56-431a-95be-2dfb1bc75580',
	CONNECTION = '70559715-7075-47f8-bb84-dbbbe8812f15',
	APPROVAL = 'cc6c20fa-bb3b-4d23-8420-bd44d106a833',
	ACCEPT_INTRO = '',
	ACCEPT_INVITE = '2edd14bc-9b28-44f2-bcd6-a67f59091349',
}

export enum ProfileItemCategoriesEnum {
	PERSONAL_INFO = 'Personal Info',
	SOCIAL_NETWORKS = 'Social Networks',
	WORK_EXPERIENCE = 'Work Experience',
	ABOUT_ME = 'About Me',
	PASSWORD = 'Password'
}

export enum OpportunityTypesTextEnum {
	'a9c6935d-3608-4b80-80a8-50d8221daae7' = 'Hiring',
	'a9c6935d-3608-4b80-80a8-50d8221daae8' = 'Fundraising',
	'a9c6935d-3608-4b80-80a8-50d8221daae9' = 'Service Provider',
	'a9c6935d-3608-4b80-80a8-50d8221daaf0' = 'Business Development',
	'e4bba2ae-a28c-452f-99e4-6261bf712be0' = 'Event'
}

export enum ProccessTypeEnum {
	CREATING_NEW_OPP = 'CREATING_NEW_OPP',
	ADDING_NEW_CONNECTOR = 'ADDING_NEW_CONNECTOR',
	CREATING_INTRODUCTION = 'CREATING_INTRODUCTION'
}
export enum CreateOppotunityFlowTypeEnum {
	CREATE_OPPORTUNITY,
	INVITE_CONNECTOR,
	INVITE_CONTRIBUTOR,
	NEW_INTRODUTCTION
}
export enum AttachmentTypesEnum {
	FILE = 'File',
	PHONE_NUMBER = 'Phone Number',
	LOCATION = 'Location',
	LINK = 'Link'
}

export enum StackItemTypeEnum {
	OPP_DETAILS = 'Opp details',
	INTRO_MESSAGE = 'Intro message',
	ATTACHMENTS = 'Attachments',
	APPROVALS = 'Request approvals',
}

// export enum ErrorTypesEnum {
// 	RECORDING_PERMISSION_DENIED = 'RECORDING_PERMISSION_DENIED'
// }
export enum TemplateTypeDateEnum {
	MULTI_SELECT='a9c6935d-3608-4b80-80a8-50d8221daae7',
	SLIDER = 'a9c6935d-3608-4b80-80a8-50d8221daae9',
	DROPDOWN = 'a9c6935d-3608-4b80-80a8-50d8221daae6',
	BUTTONS_SELECTOR = 'a9c6935d-3608-4b80-80a8-50d8221daae8',
	DATE = '335735cc-acfd-4513-aa38-18f646ad3f3a',
	MEMO = '29e18c03-ed7e-4449-a2e3-3b7e9a1e9e26'
}
export enum TemplatesEnum {
	VERTICAL_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae7',
	BUSINESS_TYPE_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae6',
	SERVICE_PROVIDER_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae8',
	BUDGET_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae9',
	OPP_TEMPLATE_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae6',
	INTRO_TEMPLATE_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae7',
	INTERACTION_TEMPLATE_ID = '538d79ed-f07c-449b-b979-894f6a91ff39',
	OPP_INITIAL_STATUS_ID = 'a9c6935d-3608-4b80-80a8-50d8221daae7',
	SOUND_RECORDER = '17ee38cb-b606-42ef-aa41-5b0d45abe7a2',
	SENT_INVITE = '1d5d6f75-b011-47ac-b78d-e95fa399849d',
	SENT_INTRODUCTION = 'e5e6d5e9-67b0-4b1a-b431-61d25782e4b0',

	COUTRY_ID = 'c544cdf3-72d0-446c-af29-08fe8ed2c0c1',
	STATE_ID = '6069dc8b-ab18-4b71-b1e7-86acde87f4c2',
	CITY_ID = '8a360919-a531-4579-874c-6fba28aab671'

}

export enum InteractionTemplateFieldsEnum {
	SOUND_RECORDER = '881c865e-b7dc-43fa-aaa0-4a9a5e49a2d0',
	INTRO_TEMPLATE = 'a9c6935d-3608-4b80-80a8-50d8221daae7',
	PREDEFINED_QUESTIONS_ID = '0e3dbdb8-916b-48c2-97ac-6e4f7c403546',
	INTERNTAL_MESSAGE = '658691a4-ff1c-4305-b0c2-6c7114f640c6',
	FILE_ATTACHMENT = 'f88702e4-fd01-4670-b324-615d8d1c0748',
	URL_ATTACHMENT = 'cfc6f253-8167-4b62-8da7-e9c2a53f2f61',
	SEND_MSG = '54451021-32ea-406c-bf81-bb7f245b5c70',
	FIRST_MSG = '32b0d378-580f-46ec-b2ab-5e8a0f2b927a'
}

export enum InteractionTypesEnum {
	PREDEFINED_MESSAGE = 'db65d2e7-9d40-4e2f-b33e-5b82d76361db',
	ASK_QUESTION_MESSAGE = '07f5d1af-de56-431a-95be-2dfb1bc75580',
	OPP_CREATION = '82158914-7c37-4bad-8f69-a41c9ba6d18b',
	INTRODUCTION = '2996845d-5474-4dbf-9658-8ad43658a2d8',
	VOICE_INTRODUCTION = '01c2386e-1eea-4297-b961-a55309724cda',
	INTERNAL = '473f5a49-cc23-43f5-b6e2-99467b66722e',
	INTERNAL_MESSAGE = 'f23aef38-c5f5-42cf-b50f-9c1a1923832e',
	OPEN_CALL = '2aa5e806-32a0-4407-8f1a-d5bc165b871d',
	OPEN_SMS = '55bab36b-b791-4e8e-9ca0-1572e2b9d47b',
	OPEN_EMAIL = 'd969fb19-b0d5-4aee-8ecd-34e23812c12f',
	OPEN_CALENDER = 'a597ccbd-1e12-4201-a837-5f2ca015c826',
	SEND_INVITE = 'ae7ed19a-5349-4469-a69a-0a486f3987fd',
	SEND_MESSAGE = '07f5d1af-de56-431a-95be-2dfb1bc75580', // sent message
	GOOD_TO_GO = 'a532623a-445a-4e0d-99ad-776216703f0e', // we are good to go
	DELETED_OPP = 'e61be637-2b61-40c3-bade-7767a29f6205', // deleted opp
	DONE_DEAL = 'be92571f-d504-4ffb-81c1-806be84fb804', // done deal
	REJECTED_INVITE = 'ffb11f7f-6ef0-4335-b639-a35ac691aaff', // rejected invite
	CONFIRMED_INVITE = '2edd14bc-9b28-44f2-bcd6-a67f59091349', // confirmed invite
	OPP_CREATED = '82158914-7c37-4bad-8f69-a41c9ba6d18b', // opp created
	BACK_STEP = 'fba6cf54-89dd-493f-a7ee-c36da18e758e', // back step
	FIRST_MESSAGE = 'a9c6935d-3608-4b80-80a8-50d8221daae6',
	CONNECT_TO_TARGET = '70559715-7075-47f8-bb84-dbbbe8812f15', // connect to target
	ON_HOLD = 'bf196a74-cf1c-4e1e-b52d-eeb0d4764aa5', // on hold(pill card)
	MY_PART_IS_DONE = '9f4ae746-1717-4711-ba19-846840b1bed8',
	TARGET_APPROVED_NOTIFICATION = 'a2f68ece-115c-4e91-ae02-4bff1959c0ee', // target approved invite to join opp.
	TARGET_DECLINED_NOTIFICATION = 'dc4559b8-12a5-4813-bfad-f0761f3f83d9', // target declined invite to join opp.
	TARGET_PENDING_INTRO_NOTIFICATION = 'cc6c20fa-bb3b-4d23-8420-bd44d106a833', // target intro waiting for approval
	OWNER_APPROVED_NOTIFICATION = 'c0c19821-ecc0-49a4-84b8-9a266352849f', // owner approved invite to join opp.
	OWNER_DECLINED_NOTIFICATION = '012540f1-e4dd-4ddb-a21c-abc9cf514a50', // owner declined invite to join opp.
	OWNER_PENDING_INTRO_NOTIFICATION = '13ff40db-3df2-4a16-9df5-36d624d6a686', // owner intro waiting for approval

	CONNECTOR_OPP_CREATED = '545fd97f-97b6-42b4-8fbe-9547a8f9d3a5', // Connector create opp
	CONNECTOR_SENT_INVITE = '921fe46c-c1c8-49e5-8f91-1991941f950a', // Connector send invite to owner after opp creation
	OWNER_APPROVE_INVITE = 'e38315db-c378-4397-a100-0828e8c0ea67', // Owner approve invite after opp creation by connector
	OWNER_DECLINE_INVITE = '1703f430-739a-4be8-af87-5ca9958451e8', // Owner decline invite after opp creation by connector
	TARGET_DECLINE_INTRO = '99d34625-0467-402f-a0b9-bdfd9e537768', // Target decline intro
	OWNER_DELETE_OPP = 'ad035848-6945-4aef-ab2c-bdd88630bf94',	   // Owner delete opp
	OPP_COMPLETE = '22e353fa-937c-4672-b8c8-e7a576d3d3f0',
	NOTE = '0be7b8d7-44ca-45ea-849b-d1bf5c354b80',
	SEND_FILE = '11503602-3fd6-4bea-8d78-6e17909fe544',
	OWNER_SENT_INVITE_REMINDER = 'e8c49933-3146-4837-95fb-2b2e391a8e96',
	CONNECTOR_SENT_INVITE_REMINDER='cc20af5a-493e-4f56-a2bb-78fcb2e2c865',
	CONNECTOR_SEND_INTRO_REMINDER = '59cca0e4-d2eb-400f-a63a-4845539d2d20',
	CONNECTOR_SEND_VIOCE_INTRO_REMINDER = 'c1a00543-e27b-4bf8-9e4a-f91d277e070c'
}

export enum NotificationInteractionTypes {
	TARGET_APPROVED_NOTIFICATION = 'a2f68ece-115c-4e91-ae02-4bff1959c0ee', // target approved invite to join opp.
	TARGET_DECLINED_NOTIFICATION = 'dc4559b8-12a5-4813-bfad-f0761f3f83d9', // target declined invite to join opp.
	OWNER_APPROVED_NOTIFICATION = 'c0c19821-ecc0-49a4-84b8-9a266352849f', // owner approved invite to join opp.
	OWNER_DECLINED_NOTIFICATION = '012540f1-e4dd-4ddb-a21c-abc9cf514a50', // owner declined invite to join opp.
}

export enum PendingApprovalInteractionTypes {
	TARGET_PENDING_INTRO_NOTIFICATION = 'cc6c20fa-bb3b-4d23-8420-bd44d106a833', // target intro waiting for approval
	OWNER_PENDING_INTRO_NOTIFICATION = '13ff40db-3df2-4a16-9df5-36d624d6a686', // owner intro waiting for approval
}

export enum InactiveTargetStatuses {
	DELETE_AND_FORGOT = 'e60e93de-27ce-40d1-b6d2-ddc796ef8bf4',
	TARGET_APPROVAL_PENDING = 'af26dd6a-d813-4851-be04-9e0936506612',
	TARGET_APPROVAL_DECLINED = 'c669bd86-7155-42dc-9fb7-87212b5bdfcc',
	TARGET_APPROVED = 'bb279585-b8d0-4157-9d1a-670880b4a721',
	OWNER_APPROVAL_PENDING = 'b45c7f14-9398-41b2-b0cc-d6082400fe35',
	OWNER_APPROVAL_DECLINED = 'c205b2b8-7942-4a20-a7dc-e8f519b824df',
	OWNER_APPROVED = '996c60c9-7663-4397-bbb5-b3df1c50242e',
}

export enum IntSubResponseTypesEnum {
	YES_NO = '08e7cfb0-9563-4696-8fcd-1030384c0d1e'
}

export enum InteractionStatuses {
	SEND_MESSAGE = '0e966ec2-efc3-4908-8ce5-d0e198c740cb',// This is the NOT seen opp (New opp for connector/target)
	GOT_MESSAGE = 'f5382361-0992-41aa-a808-fc95d1e4fee8',
	SEEN_OPP_ID = 'e8e394df-98f4-40a1-b270-877bd09e2101', // this is the InteractionStatusId means the user SAW this opp
	//INTERACTION_INITIAL_STATUS_ID = '0e966ec2-efc3-4908-8ce5-d0e198c740cb'
	HIDDEN = 'dbd2878e-8643-45f8-a827-aa563f816770',
	HIDDEN_CONNECTOR = '759e6faa-ca2b-4f4a-ad32-35e47dde7760',
	HIDDEN_TARGET = '344dc57f-440a-497b-b9f3-7fd0938c964f',
	HIDDEN_OWNER = 'e4d8eae4-3ea8-4755-a97e-bfe009daeac1'
}

export enum TargetStatusesEnum {
	PENDING = '01630fd3-d0e6-446c-91b8-c4683fcfa992',
	INTRO = 'fdd3effc-31db-4c11-bfe8-33106f20cf78',
	WE_ARE_GOOD_TO_GO = '538f2c3c-6280-4a53-9898-d5ba90af922f',
	DONE_DEAL = '0ed1ec3d-f905-43b4-9432-ea337aa5e3d0',
	DELETE_AND_FORGOT = 'e60e93de-27ce-40d1-b6d2-ddc796ef8bf4',
	MY_PART_IS_DONE = '9f4ae746-1717-4711-ba19-846840b1bed8',
	APPROVAL_PENDING = 'af26dd6a-d813-4851-be04-9e0936506612',
	APPROVAL_DECLINED = 'c669bd86-7155-42dc-9fb7-87212b5bdfcc',
	APPROVED = 'bb279585-b8d0-4157-9d1a-670880b4a721',
}

export enum OwnerStatusesEnum {
	APPROVAL_PENDING = 'b45c7f14-9398-41b2-b0cc-d6082400fe35',
	APPROVAL_DECLINED = 'c205b2b8-7942-4a20-a7dc-e8f519b824df',
	APPROVED = '996c60c9-7663-4397-bbb5-b3df1c50242e',
}

export enum OpportunityStatusesEnum {
	OPEN = 'a9c6935d-3608-4b80-80a8-50d8221daae6',
	START = 'f04086bd-01f8-465b-9b66-b5619b7fda9f',
	IN_PROGRESS = 'a9c6935d-3608-4b80-80a8-50d8221daae7',
	COMPLETE = '47e3fe29-88f3-4c42-943d-03d2be045a0b',
	ON_HOLD = 'a9c6935d-3608-4b80-80a8-50d8221daae8',
	HIDDEN = '8873dd6c-89e0-4c00-9696-4f3a648348d8',
	DELETED = '278350ca-c849-4585-8bba-c56de9111491',
}

export enum OpportunityConnectorStatusesEnum {
	PENDING_APPROVAL = '266df107-6c5b-4ea2-bb84-1578c702fc90',
	DECLINED = '994c391a-b9d7-45f2-a342-27df069cdc25',
	APPROVED = '6efacda2-6da0-463c-b31f-d5dab1d60806'
}

export enum OppActionEnum {
	CONNECTED,
	CREATED
}

// export enum SpacielInteractionsTypeEnum {
// 	SMS,
// 	EMAIL,
// 	CALL
// }
export enum IntroViewModeEnum {
	VIEW_ONLY,
	VIEW_INVITE,
	VIEW_PROFILE,
	VIEW_FEEDBACK,
	VIEW_ACCEPT,
	VIEW_DECLINE,
	VIEW_REMINDER,
	VIEW_CHANGE_STATUS,
	VIEW_REMINDER_SUCCESS,
}
export enum OpportunityTypesEnum {
	HIRING = 'a9c6935d-3608-4b80-80a8-50d8221daae7',
	FUNDRAISING = 'a9c6935d-3608-4b80-80a8-50d8221daae8',
	SERVICE_PROVIDER = 'a9c6935d-3608-4b80-80a8-50d8221daae9',
	BUSINESS_DEVELOPMENT = 'a9c6935d-3608-4b80-80a8-50d8221daaf0',
	EVENT = 'e4bba2ae-a28c-452f-99e4-6261bf712be0',
	ALL = 0
}
export enum DeleteFileModalEnum {
	DELETE = 'delete',
	DELETED = 'deleted'
}
export enum NewOpportunityInputEnum {
	TEXT,
	TEXTAREA,
	DROPDOWN,
	MULTI_SELECT,
	DATE,
	DATE_RANGE,
	LOCATION,
	ATTACHMENTS
}
export enum VerticaTypesEnum {
	DEFAULT,
	BY_OPP_STATUS,
	BY_ROLE,
	BY_CONTRIBUTOR
}
export enum RoleEnum {
	CONNECTOR = 0,
	OWNER = 1,
	TARGET = 2,
	ALL = 3
}
export enum ContinentsEnum{
	ALL='',
	ASIA ='AS',
	AFRICA='AF',
	EUROPE='EU',
	NORTHAMERICA='NA',
	SOUTHAMERICA='SA'
}
export enum SortEnum{
	ASC,
	DESC
}
export enum GetAnalytics{
	ALL,
	PART_1,
	PART_2,
	PART_3,
	ALL_OPPS,
	GLOBAL_OPPS,
	OPP_TYPES,
	VERTICALS,
	CONVERSATION_RATE,
	GLOBAL_CONTRIBUTORS,
	ALL_YOUR_INTROS,
	TOP_5,
	ALL_CONTRIBUTORS,
	OPPORTUNITY_TIMELINE,
	NUMBER_OF_INTROS_WEEKLY,
	CRUMBIZ_STATISTICS,
	GET_IN_OUT_INTROS
}

export enum NewsFeedMetricsParams {
	DEFAULT = -1,
	OPEN_OPPS = 0,
	PENDING_INVITES = 1,
	INCOMING_INTROS = 2,
	OUTGOING_INTROS = 3,
	INCOMING,
	OUTGOING
}

// export enum RolesProperties {
// 	connectorUserId = 'connectorUserId',
// 	targetUserId = 'targetUserId',
// 	ownerUserId = 'ownerUserId'
// }

export enum TemplateDataTypesEnum {
	DATE = "3e21002b-6ff8-441d-89a0-2324ce9438f9",
	TEXT = "17a556ae-2af3-4930-a6ee-239a4a8b9dfc",
	FILE = "d0d76cb4-5da7-4007-8c00-321f19fb34ec",
	UNIQUE = "a9c6935d-3608-4b80-80a8-50d8221daae6",
	MULTIPLE_UNIQUE = "a9c6935d-3608-4b80-80a8-50d8221daae7",
	FLOAT = "a9c6935d-3608-4b80-80a8-50d8221daae8",
	INT = "315b0142-3447-4b97-ad4b-6fa28d3d6a8b",
	STRING = "37d6df2e-3b30-47ba-9f6e-90c283933ad9",
}

export enum OtherUserProfileSectionTypesEnum {
	OPPS_COMMON = 0,
	WAS_CONNECTED = 1,
	CONNECTED_TO_ME = 2,
	I_CONNECTED = 3
}

export enum RemindersNotificationsScope {
	Reminders,
	Inactivity,
	InvitesIntros
}
