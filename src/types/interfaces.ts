import React, { Ref } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Action } from 'redux';
import { CalendarEventReadable } from 'react-native-calendar-events';
import { DefaultTheme } from 'styled-components';

import {
	OpportunityCategoriesEnum,
	OpportunityStatusesEnum,
	TargetStatusesEnum,
	OpportunityConnectorStatusesEnum,
	EntityEnum,
	InteractionTypesEnum,
	AttachmentTypesEnum,
	OpportunityTypesEnum,
	GetAnalytics,
	ContinentsEnum,
	VerticaTypesEnum,
	RoleEnum
} from './enums';

import { IDeepLinksReducerState } from '../store/reducers/deepLinksReducer';
import { TemplatesEnum } from './enums';
import { FeedbackType } from '../components/FeedbackModal';
import { ISendIntroInitialState } from '../store/reducers/sendIntroReducer';
import { string } from 'yup';
import { IFilledLoginInputs } from 'src/store/reducers/authReducer';
import { ScreensEnum } from 'src/navigation/screens';

export type PlainFunction<T = any> = (params?: T) => any;

export type StateUpdaterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type DynamicObject<T> = { [key: string]: T };

export type DelegatedRef<T> = React.RefObject<T>;

export type ModalAndSlidingDropdownRef = DelegatedRef<IModalAndSlidingDropdownControls>;

export interface ODataResponse<T> {
	'@odata.context': string;
	value: Array<T>;
}

export interface IStackNavigation {
	navigation: NavigationScreenProp<any, any>;
}

export interface ITheme {
	theme: DefaultTheme;
}

export interface IPlainObject {
	[key: string]: any;
}
export interface ITab {
	key: string;
	title: string;
	height: number | undefined;
	icon?: any;
	component: any;
	count?: number
}
export interface IStyle {
	style?: DynamicObject<any> | Array<DynamicObject<any>>;
}

export interface IChildren {
	children?: React.ReactNode;
}

export interface IFunctionChildren<T> {
	children(params: T): React.ReactNode;
}

export interface IModalAndSlidingDropdownControls {
	open: PlainFunction;
	close: PlainFunction;
	isActive: () => boolean
	isOpen: boolean
}

export interface IMessage {
	id: string,
	userId: string,
	fromMe: boolean,
	text: string,
	timestamp: string,
	isFile: boolean
}

export interface IRegisterPayload {
	id: string;
	firstName: string;
	lastName: string;
	prefix: string;
	timestamp: string;
	authId: string;
	phone: string;
	email: string;
	avatar: string;
}
export interface IloginSocialPayload {
	accessToken?:string, 
	refreshToken?:string
}
export interface IExistsPayload {
	payload: {
		phone?: string;
		email: string;
	}
}
export interface IExistsResponsePayload {
	emailExist: boolean;
	phoneExist: boolean;
}
export interface IIsUserInOppParams {
	entityId: string;
	oppId: string;
}

export interface IAction<T, P> extends Action<T> {
	payload: P;
}

// TODO Yaron - Make specific for each reducer
export interface IReduxAction<T> {
	type: T;
	payload: any;
}

export interface IPayload<T> {
	payload: T;
}

export interface ITouchableProps {
	touchable?: boolean;
	onPress?: PlainFunction;
}

export interface IPin {
	id: string
	opportunityId: string
	userId: string
};
export interface ICrumbizRelationships {
	relationContacts: any[],
	count: number
}
export interface IStoreProps {
	auth: {
		userAuthenticated: boolean;
		userData: IUserData;
		restorePassStepper: number;
		emailExist: boolean
		phoneExist: boolean,
		getting: number
		upadetLoading: boolean
		field: boolean
		filledLoginInputs: IFilledLoginInputs,
		isEmailRegistered: boolean
		errorData: null
	};
	analytics: IAnalytics;
	deepLinks: IDeepLinksReducerState;
	workExperience: IWorkExperienceState;
	relationshipsFilter: IRelationshipsFilter;
	relationshipsFilterField: IRelationshipsFilterFileds;
	relationships: IRelationshipsTypes;
	opportunities: IOpportunitiesTypes;
	opportunitiesFilter: IOpportunitiesFilter;
	opportunitiesFilterField: IOpportunitiesFilterFields;
	countries: ICountry[];
	utils: IUtils;
	crumbizStatistics: ICrumbizStatistics;
	sendIntro: ISendIntroInitialState;
	ownerConnctorOverview: IOwnerConnctorOverviewDetails;
	registration: IRegistrationInitialState;
	portfolio: { [key: string]: IPortfolio };
	interactionTypes: IInteractionType[];
	opportunityTypes: IOpportunityType[];
	notifications: INotificationResponseItem[];
	notificationFilter: INotificationFilterField;
	timeLines: ITimeLineResponseItem[];
	timeLineFilter: ITimeLineFilterField;
	oppOverview: {
		overview: {
			pins: Array<IPin>
		}
	}
	interactionDetails: IInteractionDetails
	interests: IInterestsTypes,
	otherUserProfile: IOtherUserProfile,
	help: IHelpReducer,
	fieldData: any[],
	crumbizRelationships: ICrumbizRelationships;
	createContributor:ICreateContributor
}

export interface IUtils {
	lastColdStartTime: string;
	onBoardingFinished: boolean;
	currentScreen: string;
}

export interface IVerticalBarsItme {
	count: number;
	name: string;
	color: string;
	id?: string

}
// export interface IEntityData {
// 	firstName?: string;
// 	lastName?: string;
// 	email: Array<{ email: string }>;
// 	phone: Array<{ phone: string }>;
// 	entityId?: string;
// 	id?: string;
// 	text?: string;
// }

//export interface IChosenContactDetails extends IEntityData { }

export interface IUserData {
	id: string | null;
	firstName: string;
	lastName: string;
	prefix?: string;
	timestamp?: Date;
	authId?: string;
	phone?: string;
	email?: string;
	phones?: Array<{}>;
	userPhones?: Array<IUserPhone>;
	userEmails?: Array<IUserEmail>;
	[key: string]: any;
	userAdditionals?: Array<IUserAdditional>;
	success?: boolean;
	updated?: boolean;
	disableNotification: boolean | null;
	disableIntroductions: boolean | null;
	disableOpportunities: boolean | null;
	disableEmails: boolean | null;
	notificationScope: number
	positions: any[],
	notificationReminder: boolean | null,
}

export interface IUserPhone {
	id?: string | null;
	userId?: string;
	phone: string;
	phoneTypeId: string | null;
	asDefault: boolean | null;
	userPhonePreferences: IUserPhonePreferences[];
	isDeleted?: boolean;
	isUpdated?: boolean;
	exist?: boolean
}

export interface IUserPhonePreferences {
	id?: string | null;
	userPhoneId: string | null;
	creatorUserId: string;
	prefer: boolean;
}

export interface IUserEmail {
	id?: string | null;
	userId?: string;
	email: string;
	asDefault: boolean | null;
	userEmailPreferences: Array<IUserEmailPreferences>;
	isDeleted?: boolean;
	isUpdated?: boolean;
	exist?: boolean
}
export interface ITrackActivity {
	screen: string,
	action: string,
	actvity: {
		oppId?: string,
		connectorUserId?: string,
		targetUserId?: string,
		opportunityConnectorId?: string,
		targetId?: string,
		targetStatus?: string
	}
}
export interface IUserEmailPreferences {
	id?: string | null;
	userEmailId?: string;
	creatorUserId: string;
	prefer: boolean;
}
export interface IUserAdditional {
	id?: string;
	userId?: string;
	avatar?: string;
	avatarType?: string;
	userGenderId?: string;
	birthday?: string;
	countryId?: string;
	stateId?: string | null;
	cityId?: string;
	country?: string;
	countryName?: string | null;
	score?: number;
	linkedIn?: string;
	facebook?: string;
	twitter?: string;
	about?: string;
	introduction?: string;
	cityName?: string;
	bioLink?: string;
	allowEmailContact?: boolean;
	allowPhoneContact?: boolean;
}

type EntitySource = 'contacts' | 'crumbiz' | 'linkedin';
export interface IEntity extends IUserData {
	source: EntitySource;
	key: string;
	text: string;
}

export interface IupdateUserInfoPayload {
	updatedUserObject: Partial<IUserData>;
	cb?: () => void;
}

export interface IUpdateUserAdditionalsPayload {
	updatedUserAdditionalsKeys: Partial<IUserAdditional>;
}

export interface IOppInfo {
	id: string;
	title: string;
}

//export type IOpportunityConnectors = DynamicObject<string | IUserData | Array<{}> | DynamicObject<any>>;

export interface ITemplate {
	interactionTemplateFields?: any;
	title: string;
	body: string;
	id?: string;
	score: number;
	creatorUserId: string;
	templateFavorites?: any[];
	isCustom?: boolean;
	timestamp: string;
}
export interface IReminderTargetPayload {
	role: EntityEnum,
	recordingBase64?: string,
	introMessage?: string,
	attachments?: any[],
	fromUserId?: string,
	toUserId?: string,
	opportunityTargetId: string,
	opportunityConnectorId: string,
	interactionTypeId: InteractionTypesEnum,
	cb: () => void
}
export interface IOpportunityType {
	id: string;
	templateTypeId: string;
	body: {
		Title: string;
		InnerFields: {
			FieldTitle: string;
			FieldId: string;
			Required: boolean
		}[];
	}[];
	emailBody: string;
	creatorUserId: string;
	timestamp: string;
	title: string;
	includeHtml: string;
	isIntroMess: boolean,
	isProcessMess: boolean,
	templateFields: any[],
	templateFavorites: any[],
	opportunityTypes: { id: string; image: string, description: string }[];
	statuses: any[];
}


// export interface IOppTemplateField {
// 	id: string;
// 	title: string;
// }

export interface IOppTemplateFieldPayload {
	key: TemplatesEnum;
	value: Array<IOppTemplateField>;
}

// export interface ITemplateField {
// 	id: string;
// 	templateFieldId: string;
// 	uniqValue: string;
// 	floatValue: number;
// 	stringValue?: string | null;
// 	templateField: {
// 		lookupData: string;
// 	};
// }

export interface IOppType {
	id: string;
	title: string;
	text?: string;
	description: string;
	image?: React.StatelessComponent;
	imageType: string;
	onPress?: PlainFunction;
}

export interface IOpportunitySummary {
	[OpportunityCategoriesEnum.VERTICAL]: {
		[key: string]: string;
	};
	[OpportunityCategoriesEnum.SERVICE_PROVIDER]: string;
	[OpportunityCategoriesEnum.TYPE_OF_BUSINESS]: string;
	[OpportunityCategoriesEnum.BUDGET]: string;
	[OpportunityCategoriesEnum.OPP_TYPE]: string;
	[OpportunityCategoriesEnum.LOCATION]: {
		countryId: string | null;
		cityId: string | null;
		stateId: string | null;
	},
	[key: string]: any
}

export interface IUpdateTargetStatusPayload {
	targetId: string;
	newStatus: TargetStatusesEnum;
}

export interface IDeleteOppActionPayload {
	callback: PlainFunction
	newStatus: OpportunityConnectorStatusesEnum | TargetStatusesEnum | OpportunityStatusesEnum;
	role: EntityEnum;
	entityId: string;
}

export interface IChangeEntityDecisionPayload {
	newStatus: OpportunityConnectorStatusesEnum | TargetStatusesEnum;
	callback: PlainFunction;
	role: EntityEnum;
	entityId: string;
}
export interface ISendInteractionPayload {
	body: string;
	isPredefinedMessage: boolean;
	predefinedMessageTemplateId: string;
	targetUserId?: string;
	targetId?: string;
	connectorUserId?: string;
	connectorId?: string;
	ownerUserId?: string;
	toConnector?: boolean;
	cb?: PlainFunction;
	role?: EntityEnum
}
export interface INewInteractionPayload {
	oppId: string,
	fromUserId: string,
	subscriberId: string
	targetId?: string;
	connectorId?: string;
	type: string;
	name: string;
	notes: string;
	date?: string;
	location?: ILocationValue;
	attachments?: IAttachment[];
	attendees?: string[],
	locationAddress?: string
	cb?: PlainFunction;
	files?: any[],
	links?: any[]
}
export interface INewThankYouPayload {
	oppId: string,
	fromUserId: string,

	subscribers: {
		id: string,
		entityKey: string,
		entityId: string,
	}[],
	message: string,
	cb?: PlainFunction;
}
export interface INewMessagePayload {
	oppId: string,
	fromUserId: string,
	subscriberId: string
	targetId?: string;
	connectorId?: string;
	type: string;
	name: string;
	notes: string;
	date?: string;
	location?: ILocationValue;
	attachments?: IAttachment[];
	attendees?: string[],
	locationAddress?: string
	cb?: PlainFunction;
	file?: IAttachmentsObj
}
export interface INewNotePayload {
	firstName: string
	oppId: string,
	fromUserId: string,
	subscriberId: string
	targetId?: string;
	connectorId?: string;
	message: string;
	interactionParentId: string;
	cb?: PlainFunction;
}
export interface ISendIntroApprovals {
	ownerName: string;
	targetName: string;
	ownerApprovalStatus: boolean;
	targetApprovalStatus: boolean;
}

export interface ISetNewOppDataPayload {
	introInteractions: ITemplate[];
}

export interface IIntroMessage {
	body?: string;
	id: string | null;
}

export interface IStatus {
	color: string;
	id: string;
	title: string;
	stepOrder: number;
	opportunityTargetStatusTitles: {
		id: string,
		opportunityTargetStatusId: string,
		opportunityTypeId: string,
		title: string
	}[]
}
export interface IOpportunity {
	description: string | null;
	id: string;
	opportunityStatusId: OpportunityStatusesEnum;
	opportunityStatus: IStatus | null;
	opportunityTypeId: string;
	parentId: string | null;
	timestamp: string;
	title: string;
	createdByUserId: string;
	user: IUserData;
}
// export interface IOpporunityConnectorEP {
// 	id: string;
// 	parrentOpportunityConnectorId?: any;
// 	opportunityId: string;
// 	ownerUserId: string;
// 	connectorUserId: string;
// 	opportunityStatusId: string;
// 	opportunity: IOpportunity;
// 	user1: IUserData;
// 	user: IUserData;
// }

export interface IUserExistenceResponse {
	Email: string | null;
	Phone: string | null;
	Id: string;
	UserPhoneId: string | null;
	UserEmailId: string | null;
	DisableIntroductions: boolean
}

export interface IOppTarget {
	id: string;
	parentOpportunityTargetId: string | null;
	opportunityConnectorId: string;
	interactions: { timestamp: "" }[]
}
export interface IRadioButtonsGroupProps<T> {
	options: T[],
	value: T[],
	multi?: boolean,
	onChange: (value: T[] | T) => void,
	backgroundColor?: string,
	name?: string
}

export interface IAssociatedOpp {
	connectorUserId: string | null;
	id: string;
	opportunity: IOpportunity;
	opportunityConnectorStatus: string | null;
	opportunityId: string;
	opportunityStatusId: string | null;
	opportunityTargets: Array<IOppTarget>;
	ownerUserId: string;
	parrentOpportunityConnectorId: string | null;
}

// export interface IOppConnector {
// 	id: string;
// 	//The DB have typo with parrent and not parent
// 	parrentOpportunityConnectorId: null;
// 	opportunityId: string;
// 	ownerUserId: string;
// 	connectorUserId: string;
// 	opportunityStatusId: OpportunityConnectorStatusesEnum;
// }

// export interface IOppConnectorsExpandedWithTargets extends IOppConnector {
// 	opportunityTargets: Array<IOppTarget>;
// 	user1: IUserData;
// 	opportunity?: IOpportunity;
// }

export interface IOppTarget {
	id: string;
	opportunityConnectorId: string;
	opportunityTargetStatus: IStatus;
	opportunityTargetStatusId: TargetStatusesEnum;
	parentOpportunityTargetId: null | string;
	targetUserId: string;
	user: IUserData;
	ownerApproval: boolean,
	targetApproval: boolean
}

// export interface IStatusByOppType {
// 	id: string;
// 	opportunityTargetStatusId: string;
// 	opportunityTypeId: string;
// 	title: string;
// }

export interface IOppTargetDetails {
	targetUserId: string;
	oppTargetId: string;
	oppTargetUsername: string;
	oppConnectorId: string;
	oppConnectorUsername: string;
	oppConnectorAvatar: string;
	oppConnectorAvatarType: string;
	statusId: TargetStatusesEnum;
	oppTargetAvatar: string;
	oppTargetAvatarType: string;
	oppConnectorUserId: string;
	oppTargetPhone: string;
	oppTargetEmail: string;
	statusByOppType?: IStatusByOppType;
}

export interface IOppConnectorDetails {
	oppConnectorId: string;
	oppConnectorUserId: string;
	oppConnectorUsername: string;
	oppConnectorAvatar: string;
	oppConnectorAvatarType: string;
	connectorTargetsCount: number;
	oppConnectorStatus: OpportunityConnectorStatusesEnum;
}

// export interface IFilteredUser {
// 	email: string;
// 	firstName: string;
// 	lastName: string;
// 	id: string;
// 	userPhones?: Array<{ phone: string }>;
// 	userAdditionals: Array<IUserAdditional>; // TODO Yaron - change the type when there is details
// }

export interface ISingleOppInList {
	title: string;
	status: string;
	statusTitle: string;
	statusColor: string;
	id: string;
	entityId?: string; // Not user id, thats oppConnectorId or oppTargetId
}

// export interface IOppDetails {
// 	title: string;
// 	status: OpportunityStatusesEnum;
// 	statusColor: string;
// 	statusTitle: string;
// 	entityId?: string;
// 	oppId: string;
// 	role: number;
// }
export interface IOppFullDetails {
	id: string;
	opportunityTypeId: string;
	oppStatus: OpportunityStatusesEnum;
	title: string;
	timestamp: string;
	opportunityStatusId: string;
	ownerUserName: string;
	ownerUserId: string;
	createdByUserId: string | null;
	opportunityPins: any[]
}

export interface IAssociatedOppsSection {
	[key: string]: {
		sectionTitle: string;
		data: Array<ISingleOppInList>;
	};
}

export interface IPredefinedQuestion {
	id: string;
	templateTypeId: string;
	body: string;
	title: string;
	templateFavorites: any[]
}

export interface IResetPasswordPayload {
	email: string;
	code: string;
	password: string;
}

export interface IGetProfileDataPayload {
	role: number;
	oppId: string;
}

export interface IGetTargetsPayload {
	oppId: string;
	userId: string;
	role?: number;
	includeTargetStatuses?: boolean;
	unReload?: boolean
}

export interface IChangeTargetStatusPayload {
	newStatus: TargetStatusesEnum;
	targetId: string;
	cb?: PlainFunction;
}
export interface IOpportunityConnectors {
	id: string,
	parrentOpportunityConnectorId?: string,
	opportunityId: string,
	ownerUserId: string,
	connectorUserId: string,
	opportunityStatusId: string,
	disableNotificationOwner?: boolean,
	disableNotificationConnector?: boolean,
	opportunity: IOpportunity,
	user: IUserData,
	user1: IUserData,
	opportunityTargets: IOppTarget[],
	opportunityConnectorStatus: IOpportunityConnectorStatus
	/*
	oppTargets: Array<IOppTargetDetails>;
	oppConnectors: Array<IOppConnectorDetails>;
	previousState: any;
	*/
}
export interface IOpportunityConnectorStatus {
	id: string,
	title: string,
	color: string,
	creatorUserId?: string,
	stepOrder: number
}
export interface IOppOverViewState {
	connectors: IOpportunityConnectors[]
	opportunityTarget?: IOppTargetDetails
	interactionForInvites?: IVInteraction[]
	waitIncome?: boolean;
	oppDetails?: IOppFullDetails;
	associatedOpps: IAssociatedOppsSection;
	associatedOppsArrived: boolean;
	selectedOppId: string;
	oppSummary: IOpportunitySummary | {};
	role: number | null;
	oppConnectors: Array<IOppConnectorDetails> | [];
	oppTargets: Array<IOppTargetDetails> | [];
	predefinedQuestions: Array<IPredefinedQuestion> | [];
	oppOverviewDataArrived: boolean;
	newInteractionMessage: {} | ITemplate;
	introInteractions: ITemplate[]
	newOppAndTargetProfile: {} | IOppDetailsAndUsers;
	newOppAndTargetProfileDataArrived: boolean;
	canAddTargetsModal: boolean;
	newOppModal: boolean;
	ccToConnector: boolean;
	previousState?: OpportunityStatusesEnum;
	increment: number;
	feeds?: IVInteraction[]
	approveInteractions?: IVInteraction[];
	messages: IVInteraction[]
	//@ts-ignore
	opportunityTargetStatuses?: { [key: InteractionTypesEnum]: IOpportunityTargetStatuses[] },
	isLoadOpportunityTargetStatuses?: boolean
	templateFieldsDatas?: any[];
	opportunityDetails?: any[]
	intorCount: number;
	inviteCount: number;
	timlineCount: number,
	mustRefresh: boolean,
	appoval?: any
}
export interface ISubcontentContext {
	isExpanded: boolean;
	toggleExpanded: StateUpdaterFunction<boolean>;
	scrollViewRef: React.Ref<React.ReactNode> | null;
	profile?: Partial<IOppTargetDetails>; // TODO - consider removing
}

// export interface IInteractionsEP {
// 	id?: string;
// 	interactionParentId?: string;
// 	opportunityConnectorId: string;
// 	opportunityTargetId: string;
// 	timestamp: string | Date;
// 	fromUserId: string;
// 	interactionTypeId: string;
// 	interactionStatusId: string;
// }
// export interface IInteractionDetailsEP {
// 	id?: string;
// 	interactionParentId?: string;
// 	opportunityConnectorId: string;
// 	opportunityTargetId: string;
// 	timestamp: string | Date;
// 	fromUserId: string;
// 	interactionTypeId: string;
// 	interactionStatusId: string;
// }
// export interface IInteractionsEPWithTemplate extends IInteractionsEP {
// 	interactionTemplates: Array<ITemplate>;
// }

export interface IOppDetailsAndUsers extends IOppConnector {
	user: IUserData; // the owner
	user1: IUserData; // the connector
	opportunity: IOpportunity;
	opportunityTargets: Array<IOppTarget>;
}

export interface ISpecialInteractionUtilPayload {
	fromUsername: string;
	toUsername: string;
	type: InteractionTypesEnum;
	calendarData: CalendarEventReadable;
}

export interface ISpecialInteractionPayload {
	type: InteractionTypesEnum;
	targetUsername: string;
	opportunityTargetId?: string;
	opportunityConnectorId?: string;
	connectorId?: string;
	calendarData?: CalendarEventReadable;
	toUserId?: string
}
export interface ISetOpportunityPinPayload {
	pin: boolean,
	pinId?: string,
	opportunityId: string,
	userId: string
}
export interface IEditOpportunityDetails {
	fieldsDatas: any[],
	newData: any,
	title: string,
	cb: () => {},
	oppDetails: IOppFullDetails | undefined,
	oppId: string
	onlyFiles?:boolean
}
export interface ISummaryData {
	incomingIntros: number;
	incomingIntrosDelta: number;
	intros: number;
	openOpps: number;
	openOppsDelta: number;
	outgoingIntros: number;
	outgoingIntrosDelta: number;
	pendingIntros: number;
	pendingInvites: number;
	pendingInvitesDelta: number;
}

export interface IAffilate {
	affilateTypeId: string,
	affilatedByUserId: string,
	acceptedByUserId: string,
	acceptedDate: string,
	createdDate: string
}

export interface IOpportunityWithTargetsForApproval {
	title: string,
	opportunityConnectors: {
		id: string,
		user: {
			id: string,
			firstName: string,
			lastName: string,
		},
		user1: {
			id: string,
			firstName: string,
			lastName: string,
		},
		opportunityTargets: {
			id: string,
			opportunityTargetStatusId: string,
			user: {
				id: string,
				firstName: string,
				lastName: string
			}
		}[]
	}[]
}
export interface IVInteraction {
	id: string;
	timestamp: string;
	title?: string;
	interactionTypeId: InteractionTypesEnum;
	subject?: string;
	opportunityId: string;
	opportunityTargetStatusId: string;
	body?: string;
	roleId?: string;
	role?: string;
	targetUser: string;
	ownerUser: string;
	connectorUser: string;
	ownerUserId: string;
	connectorUserId: string;
	targetUserId: string;
	fromUserId?: string;
	toUserId?: string;
	fromUser?: IUserData;
	toUser?: IUserData;
	opportunityTargetId: string
	opportunityConnectorId: string
	interactionsNews: any[]

}
export interface IFileAttachment {
	type: string;
	megaSize: number;
	name: string;
	uri: string;
}
export interface ILinkAttachment {
	link: string;
	linkName?: string;
}
//export type IAttachmentContent = IFileAttachment | ILinkAttachment;

// export interface IAttachment {
// 	title: string;
// 	content: IAttachmentContent;
// }

export interface IAttachmentsObj {
	// type: AttachmentTypesEnum,
	// data: IAttachment
}
/// my-opps ////

export interface IGetMyOppsPayload {
	authId: string;
}
///////

export interface IUserExpandedWithRelationships {
	id: string;
	firstName: string;
	lastName: string;
	prefix?: any;
	timestamp: string;
	authId: string;
	email: string;
	userExternalProviderId?: any;
	externalProviderId?: any;
	syncDate?: any;
	disableNotification?: boolean;
	userAdditionals: [];
	opportunityConnectorsCount: number;
	'opportunityConnectors@odata.count': number;
	opportunityConnectors: IOpportunityConnector[];
	'opportunityTargets@odata.count': number;
	opportunityTargets: IOpportunityTarget[];
	userPhones: [{ phone: string }];
	userEmails?: [{ phone: string }];
	positions?: any;
}

// export interface IOpportunityTarget {
// 	id: string;
// 	opportunityTargetStatusId: string;
// }

// export interface IOpportunityConnector {
// 	id: string;
// 	opportunityStatusId: string;
// }
export interface IPortfolio {
	id: string;
	avatar: string;
	avatarType: string;
	firstName: string;
	lastName: string;
	username: string;
	emails: [];
	phones: [];
	remove?:()=>void
}
export interface IUserAdditionalInfo {
	id: string;
	userId: string;
	userGenderId?: string;
	birthday?: string;
	avatar: string;
	avatarType: string;
	about?: string;
	introduction?: string;
	stateId?: string;
	country?: string;
	countryId?: string;
	cityId?: string;
	linkedIn?: string;
	facebook?: string;
	twitter?: string;
	score?: number;
}

//
export interface IOpp {
	id: string;
	title: string;
	timestamp: string;
	opportunityStatusId: OpportunityStatusesEnum;
	opportunityTypeId: OpportunityTypesEnum;
	opportunityConnectors: OpportunityConnector[];
}

interface OpportunityConnector {
	ownerUserId: string;
	connectorUserId: string;
	ownerName:string;
	opportunityStatusId: OpportunityConnectorStatusesEnum;
	opportunityTargets: OpportunityTarget[];
}

interface OpportunityTarget {
	targetUserId: string;
	opportunityTargetStatusId: TargetStatusesEnum;
}

// export interface IFilteredOpp {
// 	id: string;
// 	title: string;
// 	timestamp: string;
// 	role: EntityEnum;
// 	opportunityTypeId: OpportunityTypesEnum;
// 	targetStatusId?: TargetStatusesEnum;
// 	connectorStatusId: OpportunityConnectorStatusesEnum;
// 	opportunityStatusId: OpportunityStatusesEnum;
// }
export interface IOppItem {
	id: string;
	title: string;
	timestamp: string;
	role: EntityEnum;
	opportunityTypeId: OpportunityTypesEnum;
	targetStatusId?: TargetStatusesEnum;
	connectorStatusId: OpportunityConnectorStatusesEnum;
	opportunityStatusId: OpportunityStatusesEnum;
	statusLabel?: string,
	createdByUserId?: string,
	connectors: Array<OpportunityConnector>,
	opportunityPins: Array<{ Id: string }>
	opportunityMutes: Array<{ Id: string }>
}

export interface IOppItemHomeScreen {
	opportunityId: string;
	role: string,
	opportunityTargetStatusId: TargetStatusesEnum,
	oppConnectorStatus: OpportunityConnectorStatusesEnum
	interactionTypeId: InteractionTypesEnum
	opportunityConnectorStatusId: OpportunityConnectorStatusesEnum;
	createdByUserId?: string
}

export interface SagaRequestsState<T> {
	data: T;
	pending: number;
	error: any;
}

export interface ISwitcherProps {
	loading: boolean;
	LoadingComponent: React.FC<any>;
	WrappedComponent: React.FC<any>;
}

export interface IWorkExperienceState {
	items: IWorkExperienceState[],
	isLoading: boolean
}

export interface IWorkExperience {
	id?: string;
	userId?: string;
	companyName: string;
	positionName: string;
	timestamp?: Date;
	companyId?: string;
	phone?: string;
	email?: string;
	fromDate?: Date;
	toDate?: Date;
	positionTitleId?: string;
	isEdit?: boolean;
	isCurrent: boolean;
	isDeleted?: boolean;
	isDefault?: boolean;
}
export interface IDoneDeals {
	DoneDeals: number;
	DoneDealsDelta: number;
}
export interface ISecondInside {
	country: string;
	vertical: string;
}
export interface IAllOpps {
	AllOpps: number,
	Items: {
		Title: string,
		Count: number,
		Percent: number,
		Color: string
	}[]
}
export interface IGlobalOpp {
	City: string,
	Count: number,
	Longitude: number,
	Latitude: number,
}
export interface IGlobalContributors {
	City: string,
	Count: number,
	Longitude: number,
	Latitude: number,
	Continent: string
}
export interface ITop {
	name: string,
	id: string,
	opps: number
}
export interface IAllContributors {
	Title: string
	Count: number,
	Percent: number,
	Color: string
}

export interface IAnalytics {
	doneDeals?: IDoneDeals,
	firstInside?: number,
	secondInside?: ISecondInside,
	thirdInside?: string,
	fourthInside?: number,
	fifthInside?: number,
	allOpps?: IAllOpps,
	globalOpps?: IGlobalOpp[],
	oppTypes?: { [key: string]: number },
	verticals?: IAllYourIntros[],
	conversationRate?: { [key: string]: number }
	globalContributors?: IGlobalContributors[];
	allYourIntros?: IAllYourIntros[],
	top5?: ITop[],
	allContributors?: { AllOpps: number, Items: IAllContributors[] },
	opportunityTimeline?: any,
	crumbizStatistics?: ICrumbizStatistics,
	numberOfIntrosWeekly?: InumberOfIntrosWeekly[]
	inOutIntros?: { Incoming: number, Outgoing: number, IntroCount: number }
	topInOutIntros?: ITopInOutIntros[]
}
export interface ITopInOutIntros {
	Id: string,
	Name: string,
	Incoming: number,
	Outgoing: number
}
export interface IAllYourIntros {
	id: string
	name: string
	opps: number
}
export interface InumberOfIntrosWeekly {
	[key: string]: number
}
export interface ICrumbizStatistics {
	totalDoneDeals: number
	totalDoneDealsDelta: number
	companiesWereFunded: number
	companiesWereFundedDelta: number
	companiesWereHired: number
	companiesWereHiredDelta: number
	sponsoredEvents: number
	sponsoredEventsDelta: number
	sponsoredSum: number
	sponsoredSumDelta: number
}
export interface IRelationshipsFilter {
	orderBy?: number,
	titleSearch?: string,
	oppTypes: string[],
	locations: string[],
	verticals: string[]
	interests: string[]
}
export interface IRelationshipsTypes {
	relationships: Array<IUserExpandedWithRelationships>;
	isLoading: boolean;
	empty: boolean;
	count: number
	reachEnd: boolean
	isPaginationLoading: boolean
}
export interface IRelationshipsFilterFileds {
	oppTypes: IFilterMenuEntry[],
	locations: IFilterMenuEntry[],
	verticals: IFilterMenuEntry[],
	interests: IFilterMenuEntry[]
	getting: boolean
	requestSend: boolean
}
export interface IResponseRelationshipsFilterFileds {
	oppTypes?: IFilterMenuEntry[],
	locations?: IFilterMenuEntry[],
	verticals?: IFilterMenuEntry[],
	interests?: IFilterMenuEntry[],
}
// export interface IResponseOpportunitiesFilterFileds {
// 	oppTypes?: IFilterMenuEntry[],
// 	locations?: IFilterMenuEntry[],
// 	verticals?: IFilterMenuEntry[]
// }
export interface IFilterMenuRangeItemProps {
	min: number,
	max: number,
	active: boolean
}
export interface IFilterMenuRangeProps {
	isSideMenuOpen: boolean;
	setData: StateUpdaterFunction<IFilterMenuRangeItemProps[] | null>;
	data: IFilterMenuRangeItemProps[],
	title: string
	buttonText: string
}
export interface IFilterMenuProps {
	isSideMenuOpen: boolean;
	setData: StateUpdaterFunction<IFilterData>;
	data: IFilterData | null,
	buttonText: string
}
export interface IFilterMenuEntry {
	id: string,
	title: string,
	count: number,
	active?: boolean
}
export interface IFilterData {
	id?: number,
	text: string,
	data: IFilterMenuEntry[],
}

export interface IOpportunitiesFilter {
	orderBy?: number,
	titleSearch?: string,
	oppTypes?: string[],
	verticals?: string[],
	statuses?: string[],
	roles?: string[],
	a?: number;
	opportunityTypeStatuses?: any
	callback?: (filter: any) => void
}
// export interface IBudgetFields {
// 	id: string
// 	title: string
// 	low?: number
// 	high?: number
// 	count: number
// 	active?: boolean
// }
export interface IOpportunitiesTypes {
	opportunities: Array<IOppItem>;
	isPaginationLoading: boolean;
	isLoading: boolean;
	param: number;
	reachEnd: boolean;
	count: number
	empty: boolean
	mustRefresh: boolean
}
export interface IOpportunitiesFilterFields {
	oppTypes?: IFilterMenuEntry[],
	verticals?: IFilterMenuEntry[],
	statuses?: IFilterMenuEntry[],
	roles?: IFilterMenuEntry[],
	getting?: boolean,
	requestSend?: boolean
}
export interface ICountry {
	id: string;
	name: string;
	title: string;
	callingCode: string[];
	flag: string;
}

export interface IState {
	id: string;
	countryId: string;
	title: string;
}

export interface ICity {
	id: string;
	countryId: string;
	title: string;
	stateId: string;
}

export interface IDropdownWithIconAndTextProps {
	Icon: React.ElementType
	text: string
}


// export interface IDeepLink {
// 	fromDeepLink: boolean,
// 	userId: string
// }
export interface GetAnalyticsProps {
	fromDate: Date,
	toDate: Date,
	type: GetAnalytics,
	continents?: ContinentsEnum
	role?: RoleEnum | EntityEnum,
	vertical?: VerticaTypesEnum
	oppType?: OpportunityTypesEnum
}

export interface IFeedback {
	feedbackType: FeedbackType;
	message: string;
	firstName: string;
	lastName: string;
	email: string | null;
	country: string | null | undefined;
	version: string;
}

export interface IShareApp {
	timeStamp: string;
	senderUserId: string;
	recipientUserId: string | null;
	email: string | null;
	phone: string | null;
}

export interface IPointInMap {
	code: string;
	image: any;
	x: number;
	y: number;
	title: string;
}
export interface IOpportunityTargetStatuses {
	vId: number,
	Id: string,
	Title: string,
	CreatorUserId: string,
	Color: string,
	StepOrder: number,
	IsHidden: boolean,
	OpportunityTypeId: string,
}
export interface IProfileHeaderUser {
	statusId?: TargetStatusesEnum;
	avatar: string;
	avatarType: string;
	username: string;
	phone: string;
	email: string;
	id: string;
}

export interface IInteractionType {
	id: string,
	title: string,
	ownerVisible: boolean,
	connectorVisible: boolean,
	targetVisible: boolean,
	imageType: string,
	image: string,
	color: string,
	isAction: boolean,
	timelineTitle: string
}
export interface InteractionGroupByTitle {
	id: number,
	title: string,
	ids: string[],
	selected: boolean,
	color: string,
	image: string
}
export interface IInteractionDetails {
	id: string
	interactionParentId: string
	opportunityConnectorId: string
	opportunityTargetId: string
	opportunityId: string
	ttimestamp: string
	fromUserId: string
	toUserId: string
	title: string
	subject: string
	body: string
	interactionTypeId: string
	interactionStatusId: string
	interactionTemplates: IInteractionTemplates[];
	notes: {
		body: string
		subject: string
		timestamp: string
	}[]
}
export interface IInteractionTemplates {
	id: string
	templateId: string
	interactionId: string
	body: string
	subject: string
	interactionTemplateFields: IOpportunityTemplateFields[]
}
export interface IAddNewInteractionModalProps {
	isSideMenuOpen: boolean;
	setOpen: StateUpdaterFunction<boolean>;
	opportunities: Array<IOppItem>;
	oppId: string,
	subscriberId: string,
	targetId: string,
	connectorId: string
	role: EntityEnum
	ownRole: EntityEnum

}
export interface IAttachLinkProps {
	handleClose: PlainFunction,
	entity: any,
}
export interface ICreateOppDetails {
	imerativeRef?: Ref<any>;
	countries: ICountry[];
	states: IState[];
	cities: ICity[];
	selectedCountry: ICountry | null;
	selectedState: IState | null;
	selectedCity: ICity | null;
	setSelectedCountry: (country: ICountry | null) => void;
	setSelectedState: (state: IState | null) => void;
	setSelectedCity: (city: ICity | null) => void;
	type: any;
	opportunityFields: any[]
	updateHandler:(key:string, value:any | any[])=>void
}
export interface IFilter {
	isSideMenuOpen: boolean;
	setOpen: StateUpdaterFunction<boolean>;
}
export interface INewOppType {
	isSideMenuOpen: boolean;
	setOpen: StateUpdaterFunction<boolean>;
}
export interface IDropDownItem {
	title: string,
	id: string
	[key: string]: string
}
export interface ILocationValue {
	country?: ICountry;
	state?: IState;
	city?: ICity;
}
export interface IDropDownValue {
	title: string,
	id: string
}

export interface IOwnerConnctorOverviewDetails {
	feed: IVInteraction[],
	opportunityDetails: IOpportunityDetails
}
export interface IOpportunityDetails {
	id: string
	parrentOpportunityConnectorId: string
	opportunityId: string;
	ownerUserId: string;
	owner: IUserData;
	connector: IUserData;
	connectorUserId: string;
	opportunityStatusId: string;
	disableNotificationOwner: string;
	disableNotificationConnector: string;
	opportunity: IOwnerConnctorOpportunity
}
export interface IOwnerConnctorOpportunity {
	id: string;
	parentId: string;
	title: string;
	timestamp: string;
	description: null
	opportunityStatusId: string;
	opportunityTypeId: string;
	createdByUserId: string;
	opportunityTemplates: IOwnerConnctorOverviewOpportunity[]
}
// export interface IOwnerConnctorOverviewOpportunity {
// 	id: string;
// 	templateId: string;
// 	opportunityId: string;
// 	body: any[];
// 	opportunityTemplateFields: IOpportunityTemplateFields[];
// }
export interface IOpportunityTemplateFields {
	id: string;
	opportunityTemplateId: string;
	templateFieldId: string;
	stringValue: string;
	intValue: number;
	floatValue: number;
	dateValue: string;
	fileTextValue: string;
	uniqValue: string;
	templateField: ITemplateField
}
export interface ITemplateField {
	id: string;
	templateId: string;
	title: string;
	templateFieldTypeId: string;
	dataTypeId: string;
	lookupData: string;
	required: boolean;
	length: number;
	mask: string;
	validators: string;
	image: string;
	imageType: string;
}
export interface IRegistrationInitialState {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	countryId: string;
	cityId: string;
	stateId: string | null;
	phoneNumber: string;
	userPhones: IUserPhone[];
	userEmails: IUserEmail[];
	userAdditional: IUserAdditional[];
	loading: boolean;
	loadingFinishWithError: boolean;
	country?: ICountry;
	city?: ICity;
	state?: IState;
}
export interface ILazyLoaderData {
	[key: string]: any,
}
export interface INotificationItemProps {
	id: string,
	userId: string,
	text: string,
	isNew: boolean,
	date: string,
	isLast: boolean,
	oppId: string,
	oppTargetId: string,
	oppConnectorId: string,
	link: string
}
export interface INotificationItemProps {
	userId: string,
	text: string,
	isNew: boolean,
	date: string,
	isLast: boolean
}
export interface INotificationResponseItem {
	Id: string,
	TriggerDefinitionId: string,
	Endpoint: string,
	OpportunityId: string,
	OpportunityConnectorId: string,
	OpportunityTargetId: string,
	TimeStamp: string,
	Sent: boolean,
	Message: string,
	EmailMessage: string,
	UserId: string,
	FromUserId: string,
	NotificationsNews: ITriggerNews[],
	Title?: string,
	Items?: INotificationResponseItem[]
}
export interface INotificationFilter {
	[key: string]: any
}
export interface INotificationFilterField {
	filter: INotificationFilter,
	filterFields: { [key: string]: any }
	filterSaved: INotificationFilter,
}
export interface ITimeLineResponseItem {
	id: string,
	triggerDefinitionId: string,
	endpoint: string,
	opportunityId: string,
	opportunityConnectorId: string,
	opportunityTargetId: string,
	timeStamp: string,
	sent: boolean,
	message: string,
	emailMessage: string,
	userId: string,
	fromUserId: string,
	triggerNews: ITriggerNews[]
}
export interface ITimeLineFilter {
	persons: string[]
	interactionTypes: string[]
	dates: string[]
}
export interface ITimeLineFilterField {
	filter: ITimeLineFilter,
	filterFields: { [key: string]: any }
	filterSaved: ITimeLineFilter,
}
export interface ITriggerNews {
	Id?: string,
	triggerQueueId: string,
	userId: string,
}
export interface IInterestsTypes {
	interests: Array<IInterest>;
	isLoading: boolean;
	isTypesLoading: boolean,
	typesInterests: Array<IInterestType>

}
// export interface IInterest {

// }

// export interface IInterestType {
// 	id: string,
// 	title: string
// }

export interface IOtherUserProfile {
	isLoading: boolean,
	profile: any,
	sections: Array<IOtherUserProfileSection>
}

export interface IOtherUserProfileSection {
	items: Array<any>,
	isLoading: boolean,
	isPaginationLoading: boolean,
	isEndReached: boolean,
	sectionType: number,
	count: number,
}

export interface IHelpReducer {
	categories: Array<IHelpCategory>,
	isCategoriesLoading: boolean,
	topics: Array<IHelpTopic>
	isTopicsLoading: boolean;
}

export interface IHelpTopic {
	id: string,
	description?: string,
	externalUrl?: string,
	image: string,
	imageType: string,
	position: number,
	title: string,
}

export interface IHelpCategory {
	id: string,
	helpTopicId: string,
	description?: string,
	image: string,
	imageType: string,
	position: number,
	title: string,
}
export interface  IOpportunitiesDetail{
	key:string,
	value:any,
}
export interface ICreateOpportunity {
	title:string,
	role:EntityEnum,
	details:IOpportunitiesDetail[];
	type:string
}
export interface ICreateContributor {
	entity: IEntity | null;
	isEntityExist: boolean;
	introduction:ISendIntroInitialState;
	opportunityConnectorId?:string
}
export interface ICreateConnector {
	entity: IEntity | null;
	isEntityExist: boolean;
	invite:ISendIntroInitialState;
	opportunityId?:string;
	entityInfo: any
}
export interface ICreateInitiator {
	entity: IEntity | null;
	isEntityExist: boolean;
	invite:ISendIntroInitialState;
	entityInfo: any
}
export interface ICreateOpportunityFlow{
	steps:ScreensEnum[];
	editOpportunity:ScreensEnum;
}
