import { IReduxAction, IAnalytics } from '../../types/interfaces';
import { AnalyticsActionTypes } from '../constants';

const initialState: IAnalytics = {
    allOpps:{
		AllOpps:0,
		Items:[]
	},
	conversationRate:{},
	doneDeals:{
		DoneDeals:0,
		DoneDealsDelta:0
	},
	fifthInside:0,
	firstInside:0,
	fourthInside:0,
	globalContributors:[],
	globalOpps:[],
	oppTypes:{},
	secondInside:{
		country:'',
		vertical:""
	},
	thirdInside:"",
	top5:[],
	verticals:[]
}

const analyticReduser = (
	state = initialState,
	action: IReduxAction<AnalyticsActionTypes>
) => {
	switch (action.type) {
		case AnalyticsActionTypes.SET_ANALYTICS: {
			return  {...state,...action.payload}
		}
		default:
			return state;
	}
};
export default analyticReduser;
