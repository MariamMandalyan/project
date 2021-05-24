import {  RelationshipsFilterActionTypes, RelationshipsActionTypes } from "../constants";
import { IRelationshipsFilter, IUserExpandedWithRelationships } from "../../types/interfaces";
import { loadFirstData } from "./pagination";

export const setRelationShipsFilter = (payload:IRelationshipsFilter) => {
	return {
		type: RelationshipsFilterActionTypes.SET_FILTER,
		payload
	};
};
export const getRelationShips = (payload:IRelationshipsFilter) => {
	return loadFirstData(payload,RelationshipsActionTypes.SET_RELATIONSHIPS)
	// return {
	// 	type: RelationshipsActionTypes.GET_RELATIONSHIPS,
	// 	payload
	// };
};
export const setRelationShips = (payload:Array<IUserExpandedWithRelationships>) => {
	return {
		type: RelationshipsActionTypes.SET_RELATIONSHIPS,
		payload
	};
};

