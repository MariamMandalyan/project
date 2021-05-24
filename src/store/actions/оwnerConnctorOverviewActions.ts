import { OwnerConnctorOverviewTypes } from "../constants";
import { IOpportunityDetails, IVInteraction } from "src/types/interfaces";





export const getOpportunityDetailsForConnectorAndOwner = (oppId: string) => ({
	type: OwnerConnctorOverviewTypes.GET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER,
	payload: oppId
});
export const setOpportunityDetailsForConnectorAndOwner = (payload: IOpportunityDetails | undefined) => ({
	type: OwnerConnctorOverviewTypes.SET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER,
	payload:payload
});
export const getOpportunityVinteractionsForConnectorAndOwner = (connectorId:string,oppId: string) => ({
	type: OwnerConnctorOverviewTypes.GET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER,
	payload: {connectorId,oppId}
});
export const setOpportunityVinteractionsForConnectorAndOwner = (payload: IVInteraction[] | undefined) => ({
	type: OwnerConnctorOverviewTypes.SET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER,
	payload: payload
});
