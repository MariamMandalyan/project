
import { IOwnerConnctorOverviewDetails } from '../../types/interfaces';
import { OwnerConnctorOverviewTypes } from '../constants';

const initialState:IOwnerConnctorOverviewDetails = {
    feed: [],
    opportunityDetails:null
};

const ownerConnctorOverviewReducer = (state = initialState, { type, payload }) => {
	switch (type) {
        case OwnerConnctorOverviewTypes.SET_OPPORTUNITY_VINTERACTION_FOR_CONNECTOR_AND_OWNER:
        {
            return {...state, feed:payload};
        }
        case OwnerConnctorOverviewTypes.SET_OPPORTUNITY_DETAILS_FOR_CONNECTOR_AND_OWNER:
        {
            return {...state, opportunityDetails:payload};
        }
		default: {
			return state;
		}
	}
};

export default ownerConnctorOverviewReducer;