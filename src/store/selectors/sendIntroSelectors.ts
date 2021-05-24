import { getUserDataSelector } from './authSelector';
import { IStoreProps } from '../../types/interfaces';

export const sendIntroSelector = (state: IStoreProps) => state.sendIntro;

export const selectTemplates = (state: IStoreProps) => sendIntroSelector(state).templates;

export const sendIntroAttachmentsSelector = (state: IStoreProps) => sendIntroSelector(state).attachments;

//export const sendIntroFileSelector = (state: IStoreProps) =>	sendIntroSelector(state).recordingFilePath;

//export const sendIntroRecordingBase64Selector = (state: IStoreProps) => sendIntroSelector(state).recordingFilePath;

export const getOppEntities = (state: any) => {
	const sentIntroData = sendIntroSelector(state);
	const connectorData = getUserDataSelector(state);

	const { oppData } = sentIntroData;
	const entity = state.entity.entity;
	// This object must stay in this form because of the fieldName returning from the Templates.
	return {
		opportunityTargets: {
			user: entity
		},
		opportunityConnectors: {
			// user = Owner,  user1 = Connector
			user: oppData.user,
			user1: connectorData
		},
		opportunities: oppData.opportunity
	};
};
