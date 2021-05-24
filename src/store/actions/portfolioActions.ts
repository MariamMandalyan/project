import { PortfolioActionTypes } from "../constants";
import { IPortfolio } from "../../types/interfaces";

export const getPortfolio = (userId:string | string[]) => {
	return {
		type: PortfolioActionTypes.GET_PORTFOLIO,
		payload:userId
	};
};
export const setPortfolio = (userId:string, portfolio:IPortfolio ) => {
	return {
        type: PortfolioActionTypes.SET_PORTFOLIO,
        payload:{[userId]:portfolio}
}
}

export const setPortfolios = (portfolios:IPortfolio[] ) => {
	return {
        type: PortfolioActionTypes.SET_PORTFOLIOS,
        payload:portfolios
	};
};

