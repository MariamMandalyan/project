
import { IStoreProps } from "../../types/interfaces";

export const portfolioSelector = (userId: string) =>(state: IStoreProps) => state.portfolio[userId];