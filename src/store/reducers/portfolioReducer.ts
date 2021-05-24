import { IReduxAction, IPortfolio } from '../../types/interfaces';
import {  PortfolioActionTypes } from '../constants';

const initialState: {[key:string]:IPortfolio} = {}

const PortfolioReducer = (
	state = initialState,
	action: IReduxAction<PortfolioActionTypes>
) => {
	switch (action.type) {
		case PortfolioActionTypes.SET_PORTFOLIO: {
			return   {...state,...action.payload};
		}
		case PortfolioActionTypes.SET_PORTFOLIOS: {
			const  portfolios:IPortfolio[] = action.payload
			const tmp:any = {}
			portfolios.map(item=>{
				tmp[item.id] = item
			})
			return   {...state,...tmp};
		}
		case PortfolioActionTypes.GET_PORTFOLIO: {
			return   {...state,[action.payload]:null};
		}
		default:
			return state;
	}
};
export default PortfolioReducer;
