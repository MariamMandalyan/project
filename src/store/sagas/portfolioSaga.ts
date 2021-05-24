import { put, takeEvery,call} from 'redux-saga/effects';
import { IAction } from '../../types/interfaces';
import {UtilsEP } from '../../services/api/routes';
import { setPortfolio, setPortfolios } from '../actions/portfolioActions';
import { PortfolioActionTypes } from '../constants';

export const loadingPortfolio:string[] = []

export function* getPortfolio(action: IAction<PortfolioActionTypes, string | string[]>) {
	try {
			if(Array.isArray(action.payload)){
				const portfolios = yield call(UtilsEP.getPortfolios, action.payload);
				yield put(setPortfolios(portfolios))
			}else{
				const portfolio = yield call(UtilsEP.getPortfolio, action.payload);
				yield put(setPortfolio(action.payload,portfolio))
			}
            
			
        
	} catch (ex) {
		//yield put(setRelationShips([]));
		return 	{Data:[], Count:0};
		console.log('could not load templates',ex);
	}
}

export function* watchPortfolio() {

	yield takeEvery(
		PortfolioActionTypes.GET_PORTFOLIO as any,
		getPortfolio
	)



}
