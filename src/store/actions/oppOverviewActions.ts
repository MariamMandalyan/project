import { createErrorAction } from './utils';
import { OppOverviewTypes } from '../constants';
import {
	IAssociatedOppsSection,
	IChangeEntityDecisionPayload,
	IChangeTargetStatusPayload,
	IGetProfileDataPayload,
	IGetTargetsPayload,
	IOppFullDetails,
	IOpportunitySummary,
	IPredefinedQuestion,
	ISendInteractionPayload,
	IOpportunityConnectors,
	ISpecialInteractionPayload,
	IUpdateTargetStatusPayload,
	IOppTargetDetails,
	INewInteractionPayload,
	ISetOpportunityPinPayload, IDeleteOppActionPayload, IVInteraction
} from '../../types/interfaces';
import {
	EntityEnum,
	OpportunityStatusesEnum,
	TargetStatusesEnum
} from '../../types/enums';
import {
	createInteractionsAction,
	createClearAction,
	createSuccessAction
} from './utils';

export const getAssociatedOpps = () => ({
	type: OppOverviewTypes.GET_ASSOCIATED_OPPS
});

export const setAssociatedOpps = (associatedOpps: IAssociatedOppsSection) => ({
	type: OppOverviewTypes.SET_ASSOCIATED_OPPS,
	payload: associatedOpps
});

// TODO Yaron - remove if unused
export const getTargetProfile = ({ role, oppId }: IGetProfileDataPayload) => ({
	type: OppOverviewTypes.GET_TARGET_PROFILE,
	payload: { role, oppId }
});
export const setTemplateFieldsDates = (payload:any[])=>({
	type: OppOverviewTypes.SET_TEMPLATE_FIELDS_DATAS,
	payload: payload
});

export const getTemplateFieldsDates = ( )=>({
	type: OppOverviewTypes.GET_TEMPLATE_FIELDS_DATAS,
});

export const setSelectedOppAndRole = (params: {
	oppId: string;
	role: EntityEnum;
}) => ({
	type: OppOverviewTypes.SET_OPP_ID_AND_ROLE,
	payload: params
});

export const getOppDetailsTargetsAndConnectors = (
	params: IGetTargetsPayload
) => ({
	type: OppOverviewTypes.GET_OPP_DETAILS_TARGETS_AND_CONNECTORS,
	payload: params,
	meta: {
		loading: true
	}
});

export const getOppDetailsTargetsAndConnectorsSuccess = createSuccessAction(
	OppOverviewTypes.GET_OPP_DETAILS_TARGETS_AND_CONNECTORS
);

export const getOppDetailsTargetsAndConnectorsError = createErrorAction(
	OppOverviewTypes.GET_OPP_DETAILS_TARGETS_AND_CONNECTORS
);

export const setTargetsAndConnectors = (
	params: {list:IOpportunityConnectors[], userId:string}
) => ({
	type: OppOverviewTypes.SET_TARGETS_AND_CONNECTORS,
	payload: params
});

export const getOppSummary = (oppId: string,oppTypeId:string) => ({
	type: OppOverviewTypes.GET_OPP_SUMMARY,
	payload: {oppId,oppTypeId}
});
export const getOpportunityTarget = (targetId: string) => ({
	type: OppOverviewTypes.GET_TARGET,
	payload: {targetId}
});
export const getOpportunityTargetForApproval = (oppId: string,userId:string) => ({
	type: OppOverviewTypes.GET_TARGET_FOR_APPROVAL,
	payload: {oppId,userId}
})
export const setOpportunityTarget = (target:IOppTargetDetails ) => ({
	type: OppOverviewTypes.GET_TARGET,
	payload: target
});

export const setOppSummary = (oppSummary: IOpportunitySummary) => ({
	type: OppOverviewTypes.SET_OPP_SUMMARY,
	payload: oppSummary
});

export const setOpportunityDetails = (body: any[]) => ({
	type: OppOverviewTypes.SET_OPPORTUNITY_DETAILS,
	payload: body
});


export const getOppDetails = (oppId:string,reload:boolean=true) => ({
	type: OppOverviewTypes.GET_OPP_DETAILS,
	payload: {oppId,reload}
});
export const setResetNotification = (oppId:string) => ({
	type: OppOverviewTypes.SET_RESET_NOTIFICATION,
	payload: oppId
});
export const setOppDetails = (oppDetails: IOppFullDetails) => ({
	type: OppOverviewTypes.SET_OPP_DETAILS,
	payload: oppDetails
});
export const setPreviousState = (previousState: string) => ({
	type: OppOverviewTypes.SET_PREVIOUS_STATE,
	payload: previousState
});
export const setOpportunityPin = (Pin: ISetOpportunityPinPayload) => ({
	type: OppOverviewTypes.SET_OPPORTUNITY_PIN,
	payload: Pin
});
export const newUpdateInOppDetails = () => ({
	type: OppOverviewTypes.NEW_UPDATE_IN_OPP_DETAILS,
});

export const resetOppOverviewState = () => ({
	type: OppOverviewTypes.RESET_OPP_OVERVIEW_STATE
});

export const resetOppInteractions = createClearAction(
	OppOverviewTypes.GET_OPP_INTERACTIONS
);

export const resetTargetProfileInteractions = createClearAction(
	OppOverviewTypes.GET_TARGET_INTERACTIONS
);
export const resetTargetOverviewInteractions = createClearAction(
	OppOverviewTypes.GET_TARGET_OVERVIEW_INTERACTIONS
);

export const changeTargetStatus = (params: IChangeTargetStatusPayload) => ({
	type: OppOverviewTypes.CHANGE_TARGET_STATUS,
	payload: params
});

export const updateTargetStatusId = (payload: IUpdateTargetStatusPayload) => ({
	type: OppOverviewTypes.UPDATE_TARGET_STATUS,
	payload
});

export const changeEntityDecision = (
	payload: IChangeEntityDecisionPayload
) => ({
	type: OppOverviewTypes.CHANGE_ENTITY_DECISION,
	payload
});

export const deleteOpportunity = (payload: IDeleteOppActionPayload) => ({
	type: OppOverviewTypes.DELETE_OPPORTUNITY,
	payload
})

export const updateTargetStatusInsideProfile = (
	newStatus: TargetStatusesEnum
) => ({
	type: OppOverviewTypes.UPDATE_TARGET_STATUS_INSIDE_PROFILE,
	payload: newStatus
});

export const openCanAddTargetsModal = () => ({
	type: OppOverviewTypes.OPEN_CAN_ADD_TARGETS_MODAL
});

export const changeOppStatus = (newStatus: string) => ({
	type: OppOverviewTypes.CHANGE_OPP_STATUS,
	payload: newStatus
});

export const updateOppStatus = (newStatus: OpportunityStatusesEnum) => ({
	type: OppOverviewTypes.UPDATE_OPP_STATUS,
	payload: newStatus
});

export const getPredefinedQuestions = () => ({
	type: OppOverviewTypes.GET_PREDEFINED_MESSAGES
});

export const setPredefinedQuestions = (
	predefinedQuestions: Array<IPredefinedQuestion>
) => ({
	type: OppOverviewTypes.SET_PREDEFINED_MESSAGES,
	payload: predefinedQuestions
});

export const sendInteraction = (params: ISendInteractionPayload) => ({
	type: OppOverviewTypes.SEND_INTERACTION,
	payload: params
});
export const newInteraction = (params: INewInteractionPayload) => ({
	type: OppOverviewTypes.NEW_INTERACTION,
	payload: params
});
export const getNewOppAndTargetProfile = (oppId:string,role:EntityEnum) => ({
	type: OppOverviewTypes.GET_NEW_OPP_DATA,
	payload:{oppId,role}
});

export const setNewOppData = (payload: {list:IVInteraction[], userId:string}) => ({
	type: OppOverviewTypes.SET_NEW_OPP_DATA,
	payload
});

export const ccToConnectorToggle = (payload: boolean) => ({
	type: OppOverviewTypes.CC_TO_CONNECTOR_TOGGLE,
	payload
});

export const setNewOppForModal = () => ({
	type: OppOverviewTypes.SET_NEW_OPP_MODAL
});

export const sendSpacielInteraction = (
	payload: ISpecialInteractionPayload
) => ({
	type: OppOverviewTypes.SEND_SPACIEL_INTERACTION,
	payload
});

export const getOppInteractionsData = createInteractionsAction(
	OppOverviewTypes.GET_OPP_INTERACTIONS,
	(params: any) => {
		const initiatorFilter = params?.role === EntityEnum.OWNER ?
			' and interactionTypeId ne 2996845D-5474-4DBF-9658-8AD43658A2D8' : '';

		return {
			$filter: `opportunityId eq ${params.oppId}${initiatorFilter}`
		};
	}
);

export const getTargetInteractionsData = createInteractionsAction(
	OppOverviewTypes.GET_TARGET_INTERACTIONS,
	(params: any) => {
		const { selectedOppId, userId, targetUserId, role } = params;
		const $filter = `opportunityId eq ${selectedOppId} and targetUserId eq ${targetUserId} and ${
			role === EntityEnum.CONNECTOR ? 'connectorUserId' : 'ownerUserId'
		} eq ${userId}`;

		return { $filter };
	}
);

export const getOpportunityTargetFeed = (targetId:string,oppId:string)=>{
	return {
		type:	OppOverviewTypes.GET_TARGET_FEED,
		payload:{targetId,oppId}
	}
}
export const setOpportunityTargetFeed = (feeds:any)=>{
	return {
		type:	OppOverviewTypes.SET_TARGET_FEED,
		payload:feeds
	}
}
export const getOpportunityFeed = (oppId:string, dontReload:boolean=false)=>{
	return {
		type:	OppOverviewTypes.GET_OPPORTUNITY_FEED,
		payload:{oppId,dontReload}
	}
}

export const setOpportunityFeed = (feeds:any)=>{
	return {
		type:	OppOverviewTypes.SET_OPPORTUNITY_FEED,
		payload:feeds
	}
}
export const getApproveInteraction = (feeds:any)=>{	
	return {
		type:	OppOverviewTypes.GET_APPROVE_INTERACTION,
		payload:feeds
	}
}
export const setApproveInteraction = (feeds:any)=>{	
	return {
		type:	OppOverviewTypes.SET_APPROVE_INTERACTION,
		payload:feeds
	}
}
export const getOpportunityConnectorFeed = (appId:string)=>{
	return {
		type:	OppOverviewTypes.GET_CONNECTOR_FEED,
		payload:appId
	}
}
export const setOpportunityConnectorFeed = (feeds:any)=>{
	return {
		type:	OppOverviewTypes.SET_CONNECTOR_FEED,
		payload:feeds
	}
}


export const getOpportunityTargetStatuses = (appId:string)=>{
	return {
		type:	OppOverviewTypes.GET_OPPORTUNITY_TARGET_STATUSES,
		payload:appId
	}
}
export const setOpportunityTargetStatuses = (feeds:any)=>{
	return {
		type:	OppOverviewTypes.SET_OPPORTUNITY_TARGET_STATUSES,
		payload:feeds
	}
}
export const getTargetOverviewInteractionsData = createInteractionsAction(
	OppOverviewTypes.GET_TARGET_OVERVIEW_INTERACTIONS,
	(params: any) => {
		const { ownerUserId, targetUserId, oppId } = params;
		const $filter = `targetUserId eq ${targetUserId} and ownerUserId eq ${ownerUserId} and opportunityId eq ${oppId}`;
		return { $filter };
	}
);

export const getAllPins = () => ({ type: OppOverviewTypes.GET_ALL_PINS });
export const setPins = (pins: Array) => ({ type: OppOverviewTypes.SET_PINS, payload: pins });
