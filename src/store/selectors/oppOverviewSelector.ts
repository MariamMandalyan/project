import { IVInteraction, SagaRequestsState, IOwnerConnctorOverviewDetails, IOppOverViewState
} from '../../types/interfaces';

import { createSagaRequestSelectors } from './utils';

type InteractionsStateType = SagaRequestsState<Array<IVInteraction>>;

interface InteractionsState {
	opportunity: InteractionsStateType,
	targetProfile: InteractionsStateType,
	oppCrumb: InteractionsStateType
}

export const oppOverviewSelector = (state: any): IOppOverViewState => state.oppOverview.overview;

export const ownerConnctorOverviewSelector = (state: any): IOwnerConnctorOverviewDetails => state.ownerConnctorOverview;

//export const opppreviousStateSelector = (state: any): string => state.oppOverview.previousState;

const oppInteractionsGlobalSelector = (state: any): InteractionsState => state.oppOverview.interactions;

export const oppInteractionsSelectors = createSagaRequestSelectors('opportunity', (state: any) =>
	oppInteractionsGlobalSelector(state).opportunity
);

export const oppTargetProfileSelectors = createSagaRequestSelectors('targetProfile', (state: any) =>
	oppInteractionsGlobalSelector(state).targetProfile
);

export const oppCrumbSelectors = createSagaRequestSelectors('oppCrumb', (state: any) =>
	oppInteractionsGlobalSelector(state).oppCrumb
);

export const oppIdSelector = (state: any) =>
	oppOverviewSelector(state).selectedOppId;

export const roleSelector = (state: any) =>
	oppOverviewSelector(state).role;

export const oppTargetsSelector = (state: any) =>
	oppOverviewSelector(state).oppTargets;

export const predefinedMessagesSelector = (state: any) =>
	oppOverviewSelector(state).predefinedQuestions;

export const newIntroductionMessageSelector = (state: any) =>
	oppOverviewSelector(state).introInteractions;
export const introductionForInviteSelector = (state: any) =>
	oppOverviewSelector(state).interactionForInvites;
