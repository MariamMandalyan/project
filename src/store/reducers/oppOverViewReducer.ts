import { InteractionsTypes, OppOverviewTypes } from '../constants';
import { combineReducers } from 'redux';
import {
	IAction,
	IOppConnectorDetails,
	IOppDetailsAndUsers,
	IOppOverViewState,
	IOppTargetDetails,
	ITemplate,
	IVInteraction
} from '../../types/interfaces';
import { OpportunityStatusesEnum, TargetStatusesEnum } from '../../types/enums';
import { createInteractionsReducer } from './utils';
import { getAllNewConnectorsAndTargestAccont } from '../../utils';


interface payloads {
	interactionMessage: ITemplate;
	oppAndUsersData: IOppDetailsAndUsers;
	interactionForInvites:ITemplate[];
	role: number;
	oppConnectors: Array<IOppConnectorDetails>;
	oppId: string;
	oppTargets: Array<IOppTargetDetails>;
	targetUserId: string;
	targetId: string;
	newStatus: TargetStatusesEnum;
	previousState: OpportunityStatusesEnum;
}
// type payloads = IOppFullDetails | ITemplate | IOppDetailsAndUsers;

const initialState: IOppOverViewState = {
	interactionForInvites:[],
	associatedOpps: {},
	associatedOppsArrived: false,
	selectedOppId: '',
	oppSummary: {},
	oppConnectors: [],
	predefinedQuestions: [],
	oppTargets: [],
	oppOverviewDataArrived: false,
	role: null,
	newInteractionMessage: {},
	newOppAndTargetProfile: {},
	newOppAndTargetProfileDataArrived: false,
	canAddTargetsModal: false,
	newOppModal: false,
	ccToConnector: false,
	increment: 0,
	feeds: [],
	opportunityTargetStatuses: {},
	isLoadOpportunityTargetStatuses:false,
	templateFieldsDatas:[],
	opportunityDetails:[],
	connectors:[],
	intorCount:0,
	inviteCount:0,
	timlineCount:0,
	messages:[],
	approveInteractions: [],
	previousState: undefined,
};

const oppInteractionsReducer = createInteractionsReducer(
	OppOverviewTypes.GET_OPP_INTERACTIONS
);
const targetInteractionsReducer = createInteractionsReducer(
	OppOverviewTypes.GET_TARGET_INTERACTIONS
);
const targetOverviewInteractionsReducer = createInteractionsReducer(
	OppOverviewTypes.GET_TARGET_OVERVIEW_INTERACTIONS
);

const oppOverviewReducer = (
	state = initialState,
	action: IAction<OppOverviewTypes, payloads>
) => {
	switch (action.type) {
		case InteractionsTypes.SET_MESSAGES:
			return  {
				...state,
				messages: action.payload
			}
		case OppOverviewTypes.SET_TEMPLATE_FIELDS_DATAS:
			return {
				...state,
				templateFieldsDatas: action.payload
			}
		case OppOverviewTypes.SET_TARGET:
			return {
				...state,
				opportunityTarget: action.payload
			}
		case OppOverviewTypes.SET_CONNECTOR_FEED:
		case OppOverviewTypes.SET_TARGET_FEED:
			return {
				...state,
				feeds: action.payload
			}
		case OppOverviewTypes.SET_OPPORTUNITY_FEED:
			const timlineCount:number = action.payload?action.payload.filter((item:any)=>item.interactionsNews.length===0).length:0
			return {
				...state,
				feeds: action.payload,
				timlineCount
			}
			case OppOverviewTypes.SET_APPROVE_INTERACTION:
			return {
				...state,
				approveInteractions: action.payload
			}
		case OppOverviewTypes.SET_OPPORTUNITY_TARGET_STATUSES:
			return {
				...state,
				opportunityTargetStatuses:{
					...state.opportunityTargetStatuses,
					...action.payload
				}
			}
		case OppOverviewTypes.NEW_UPDATE_IN_OPP_DETAILS:
			return {
				...state,
				increment: (state.increment ? state.increment + 1 : 1),
				oppOverviewDataArrived: false

			};
		case OppOverviewTypes.SET_ASSOCIATED_OPPS:
			return {
				...state,
				associatedOpps: action.payload,
				associatedOppsArrived: true
			};

		case OppOverviewTypes.SET_OPP_ID_AND_ROLE:
			return {
				...state,
				selectedOppId: action.payload.oppId,
				role: action.payload.role,
				oppOverviewDataArrived: false
			};

		case OppOverviewTypes.SET_OPP_SUMMARY:
			return {
				...state,
				oppSummary: action.payload
			};
		case OppOverviewTypes.SET_OPPORTUNITY_DETAILS:
			return {
				...state,
				opportunityDetails: action.payload
			}
		case OppOverviewTypes.SET_TARGETS_AND_CONNECTORS:
			const [inviteCount,intorCount] = getAllNewConnectorsAndTargestAccont(action.payload.userId,state.interactionForInvites,action.payload.list)
			return {
				...state,
				connectors:action.payload.list,
				oppOverviewDataArrived: true,
				intorCount,
				inviteCount

			};
		case OppOverviewTypes.SET_OPP_DETAILS:
			return {
				...state,
				oppDetails: action.payload
			};
	    case OppOverviewTypes.SET_PREVIOUS_STATE:
				return {
					...state,
					previousState: action.payload
				};
		case OppOverviewTypes.UPDATE_TARGET_STATUS:
			const targetsCopy = [...state.oppTargets];
			const targetIndex = targetsCopy.findIndex(
				target => target.oppTargetId === action.payload.targetId
			);
			targetsCopy[targetIndex] = {
				...targetsCopy[targetIndex],
				statusId: action.payload.newStatus
			};
			return {
				...state,
				oppTargets: [...targetsCopy]
			};

		case OppOverviewTypes.UPDATE_OPP_STATUS:
			return {
				...state,
				oppDetails: {
					...state.oppDetails,
					opportunityStatusId: action.payload
				}
			};

		case OppOverviewTypes.RESET_OPP_OVERVIEW_STATE:
			const {selectedOppId, role,  ...rest} = initialState
			return {
				...state,...rest
			};

		case OppOverviewTypes.SET_PREDEFINED_MESSAGES:
			return {
				...state,
				predefinedQuestions: action.payload
			};

			case OppOverviewTypes.GET_NEW_OPP_DATA: {
			return {
				...state,
				newOppAndTargetProfileDataArrived: false
			};
			}
			case OppOverviewTypes.SET_NEW_OPP_DATA: {
				const [inviteCount,intorCount] = getAllNewConnectorsAndTargestAccont(action.payload.userId,action.payload.list as IVInteraction[],state.connectors)
			return {
				...state,
				interactionForInvites: action.payload.list,
				inviteCount,
				intorCount
			};
		}

		case OppOverviewTypes.UPDATE_TARGET_STATUS_INSIDE_PROFILE:
			const updatedOppTargets =
				//@ts-ignore // TODO All - opportunityTargets does exists and it warns anyway
				state.newOppAndTargetProfile!.opportunityTargets;
			updatedOppTargets[0].opportunityTargetStatusId = action.payload;
			return {
				...state,
				newOppAndTargetProfile: {
					...state.newOppAndTargetProfile,
					opportunityTargets: updatedOppTargets
				}
			};

		case OppOverviewTypes.OPEN_CAN_ADD_TARGETS_MODAL:
			return {
				...state,
				canAddTargetsModal: true
			};

		case OppOverviewTypes.CC_TO_CONNECTOR_TOGGLE:
			return {
				...state,
				ccToConnector: action.payload
			};

		case OppOverviewTypes.SET_NEW_OPP_MODAL:
			return {
				...state,
				newOppModal: true
			};
		case OppOverviewTypes.SET_PINS:
			return {
				...state,
				pins: action.payload,
			};

		default:
			return state;
	}
};

const interactionsReducer = combineReducers({
	opportunity: oppInteractionsReducer,
	targetProfile: targetInteractionsReducer,
	oppCrumb: targetOverviewInteractionsReducer
});

export default combineReducers({
	overview: oppOverviewReducer,
	interactions: interactionsReducer
});
