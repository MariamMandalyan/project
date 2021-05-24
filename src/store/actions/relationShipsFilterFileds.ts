import {   RelationshipsFilterFieldsActionTypes } from "../constants";
import {  IResponseRelationshipsFilterFileds } from "../../types/interfaces";

export const setRelationShipsFilterFields = (payload:IResponseRelationshipsFilterFileds) => {
	return {
		type: RelationshipsFilterFieldsActionTypes.SET_FILTER_FIELDS,
		payload
	};
};
export const getRelationShipsFilterFields = () => {
	return {
		type: RelationshipsFilterFieldsActionTypes.GET_FILTER_FIELDS
	};
};
