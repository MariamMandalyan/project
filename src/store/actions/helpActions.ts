import { HelpActionTypes } from "../constants";
import {IHelpCategory, IHelpTopic} from "../../types/interfaces";

export const getCategories = (payload: { helpTopicId: string }) => {
	return {
		type: HelpActionTypes.GET_CATEGORIES,
		payload
	};
};

export const setCategories = (payload: {categories: Array<IHelpCategory>}) => {
	return {
		type: HelpActionTypes.SET_CATEGORIES,
		payload
	};
};

export const getTopics = () => {
	return {
		type: HelpActionTypes.GET_TOPICS,
	};
};

export const setTopics = (payload: { topics: Array<IHelpTopic> }) => {
	return {
		type: HelpActionTypes.SET_TOPICS,
		payload
	};
};
