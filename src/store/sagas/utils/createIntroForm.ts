import {
	IUserData,
	IIntroMessage,
	IAttachmentsObj
} from '../../../types/interfaces';
import { uuid } from 'uuidv4';
import {
	TargetStatusesEnum,
	InteractionTypesEnum,
	IntSubResponseTypesEnum,
	TemplatesEnum,
	InteractionTemplateFieldsEnum,
	AttachmentTypesEnum
} from '../../../types/enums';
import { readFile } from '../../../utils';
import {
	IFileAttachment,
	ILinkAttachment,
	IEntity
} from '../../../types/interfaces';

interface IConnectTargetData {
	id?: string;
	opportunityConnectorId: string;
	targetUserId?: string;
	user?: Partial<IUserData>;
	interactions?: Array<{}>;
	opportunityTargetStatusId: string;
	attachmentsInteraction: any[];
	ownerApproval: boolean;
	targetApproval: boolean;
}

interface IIntroFormInput {
	id: string;
	entity: IEntity;
	currentUserId: string;
	recordingBase64: string;
	introMessage: IIntroMessage;
	attachments: IAttachmentsObj[];
	approvals: {
		ownerApproval: boolean;
		targetApproval: boolean;
	}
}
const InteractionTemplateIdMapper = {
	[AttachmentTypesEnum.FILE]:
		InteractionTemplateFieldsEnum.FILE_ATTACHMENT,
	[AttachmentTypesEnum.LINK]:
		InteractionTemplateFieldsEnum.URL_ATTACHMENT,
	[AttachmentTypesEnum.PHONE_NUMBER]: '',
	[AttachmentTypesEnum.LOCATION]: ''
};
const createIntroForm = async (formInput: IIntroFormInput) => {
	const {
		id: opportunityConnectorId,
		entity,
		currentUserId,
		recordingBase64,
		introMessage,
		attachments,
		approvals
	} = formInput;

	const data: IConnectTargetData = {
		opportunityConnectorId,
		opportunityTargetStatusId: TargetStatusesEnum.PENDING,
		attachmentsInteraction:[],
		...approvals,
	};
	const generatedTargetId = uuid();

	if (entity.id) {
		data.targetUserId = entity.id;
	} else {
		const userObj: Partial<IUserData> = {
			...entity,
			id: generatedTargetId,
			notificationScope:3,
			userAdditionals: [{ score: 4.1 }]
		};

		data.user = userObj;
	}

	data.interactions = [
		{
			timestamp: new Date(),
			fromUserId: currentUserId,
			interactionTypeId: recordingBase64 ? InteractionTypesEnum.VOICE_INTRODUCTION : InteractionTypesEnum.INTRODUCTION,

			interactionSubscribers: [
				{
					userId: entity.id ? entity.id : generatedTargetId,
					IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
				}
			]
		}
	];
	// If the intro is a record
	if (recordingBase64) {
		// @ts-ignore
		data.interactions[0].interactionTemplates = [
			{
				templateId: TemplatesEnum.SOUND_RECORDER,
				body: 'Voice Introduction', // Body is required, igor said to put a space
				interactionTemplateFields: [
					{
						templateFieldId: InteractionTemplateFieldsEnum.SOUND_RECORDER,
						stringValue: 'audio/aac',
						fileTextValue: recordingBase64
					}
				]
			}
		];

		return data;
	}
	// If the intro is a typed message / ready template
	if (introMessage.body && !recordingBase64) {
		// @ts-ignore
		data.interactions[0].interactionTemplates = [
			{
				body: introMessage.body,
				templateId: TemplatesEnum.SENT_INTRODUCTION
			}
		];
	}

	// Posting Attachments - NOT CONNECTED AT THE MOMENT, ditched for another task
	// let base64File: string | undefined;
	// if (attachments[AttachmentTypesEnum.FILE]) {
	// 	base64File =
	// }
	//@ts-ignore
	const InteractionTemplateFields:any[] = [];
	for (let i = 0; i < attachments.length; i++) {
		const element = attachments[i];
		const stringValue = stringValueMapper(element);
		const fileTextValue = await fileTextValueMapper(element);
		InteractionTemplateFields.push({
			//@ts-ignore
			templateFieldId: InteractionTemplateIdMapper[element.type],
			stringValue,
			//@ts-ignore
			fileTextValue
		});
	}
	// @ts-ignore
	if(data.interactions[0].interactionTemplates){
		data.interactions[0].interactionTemplates[0].interactionTemplateFields = InteractionTemplateFields;
	}

	// Object.entries(attachments).forEach(
	// 	//@ts-ignore
	// 	([key, value]: [AttachmentTypesEnum, IAttachment]) => {


	// 		const stringValueMapper = {
	// 			[AttachmentTypesEnum.FILE]: (value.content as IFileAttachment).type,
	// 			[AttachmentTypesEnum.LINK]: 'url',
	// 			[AttachmentTypesEnum.PHONE_NUMBER]: '',
	// 			[AttachmentTypesEnum.LOCATION]: ''
	// 		};


	// 		const interactionTemplate = {
	// 			templateId: InteractionTypesEnum.SEND_INVITE, // Igor said to use this one for attachment
	// 			body: value.title,
	// 			interactionTemplateFields: [
	// 				{
	// 					//@ts-ignore
	// 					templateFieldId: InteractionTemplateIdMapper[key],

	// 					stringValue: stringValueMapper[key],
	// 					//@ts-ignore
	// 					fileTextValue: fileTextValueMapper[key]
	// 				}
	// 			]
	// 		};
	// 		attachmentsInteraction.push(interactionTemplate);
	// 	}
	// );
	return data;
};

const fileTextValueMapper = async (attach:IAttachmentsObj):Promise<string> => {
	switch (attach.type) {
		case AttachmentTypesEnum.FILE:
		// @ts-ignore
		return await readFile((attach.data.content as IFileAttachment).uri);
		case AttachmentTypesEnum.LINK:
		// @ts-ignore
		return (attach.data.content as ILinkAttachment).link;
		case AttachmentTypesEnum.PHONE_NUMBER:
			return '';
		case AttachmentTypesEnum.LOCATION:
			return '';
		default:
			break;
	}

	return '';
};

const stringValueMapper = (attach:IAttachmentsObj)=>{
	switch (attach.type) {
		case AttachmentTypesEnum.FILE:
			return (attach.data.content as IFileAttachment).name;
		case AttachmentTypesEnum.LINK:
			return attach.data.title;
		case AttachmentTypesEnum.PHONE_NUMBER:
			return '';
		case AttachmentTypesEnum.LOCATION:
			return '';
		default:
			break;
	}

	return '';
};


export default createIntroForm;
