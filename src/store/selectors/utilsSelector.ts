import { IStoreProps } from "../../types/interfaces";

export const getLastColdStartSelector = (state: IStoreProps) => state.utils.lastColdStartTime;

export const onBoardingFinishedSelector = (state: IStoreProps) => state.utils.onBoardingFinished;

