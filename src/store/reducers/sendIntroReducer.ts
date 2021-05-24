import { SendIntroTypes } from '../constants';
import {
	IReduxAction,
	IOpportunitySummary,
	IIntroMessage,
	IAttachmentsObj,
	ISendIntroApprovals,
	ITemplate
} from '../../types/interfaces';
import { IOpportunity } from '../../types/interfaces';

export interface ISendIntroInitialState {
	attachments: IAttachmentsObj[];
	recordingFilePath: string;
	recordingBase64: string;
	introMessage: IIntroMessage;
	oppData: Partial<IOpportunity>;
	chosenOppId: string;
	oppSummary: IOpportunitySummary | null;
	templates: Array<ITemplate>;
	isOppsArrived: boolean;
	approvals: ISendIntroApprovals;
}

const initialState: ISendIntroInitialState = {
	attachments: [],
	recordingFilePath: '',
	recordingBase64: '',
	introMessage: { id: null },
	oppData: {},
	chosenOppId: '',
	templates: [],
	isOppsArrived: false,
	oppSummary: null,
	approvals: {
		ownerName: '',
		ownerApprovalStatus: true,
		targetName: '',
		targetApprovalStatus: true,
	}
};

const sendIntroReducer = (
	state = initialState,
	action: IReduxAction<SendIntroTypes>
) => {
	switch (action.type) {
		case SendIntroTypes.UPDATE_INTRO:
			return {
				...state,
				[action.payload.key]: action.payload.value
			};

		case SendIntroTypes.ADD_ATTACHMENT:
			return {
				...state,
				attachments: [
					...state.attachments,
					{
						type:action.payload.key,
						data:action.payload.value
					}
				]
			};

		case SendIntroTypes.REMOVE_ATTACHMENT:
			const { index } = action.payload;
			// @ts-ignore
			const tmp = state.attachments;
			tmp.splice(index,1);
			return {
				...state,
				attachments: [
					...tmp
				]
			};
			case SendIntroTypes.REMOVE_ALL_ATTACHMENTS:
				return {
					...state,
					attachments: [
						
					]
				};
	
		case SendIntroTypes.RESET_INTRO_STATE:
			return {
				...initialState
			};

		case SendIntroTypes.SET_OPP_DATA:
			return {
				...state,
				oppData: action.payload,
				isOppsArrived: true
			};
		case SendIntroTypes.CHOOSE_OPP_ID:
			return {
				...state,
				chosenOppId: action.payload
			};
		case SendIntroTypes.SET_TEMPLATES:
			return {
				...state,
				templates: action.payload
			};
		case SendIntroTypes.ADD_SAVED_TEMPLATE:
			return {
				...state,
				templates: [...state.templates, action.payload]
			};

		default:
			return state;
	}
};

export default sendIntroReducer;
