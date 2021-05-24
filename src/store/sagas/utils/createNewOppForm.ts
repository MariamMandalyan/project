import { uuid } from 'uuidv4';

import { IEntity } from '../../../types/interfaces';
import {
	EntityIdsEnum
} from '../../../types/enums';
import {
	OpportunityConnectorStatusesEnum,
	EntityEnum,
	InteractionTypesEnum,
	TemplatesEnum,
	IntSubResponseTypesEnum
} from '../../../types/enums';
import {
	IOpportunityConnectors
} from '../../../types/interfaces';
import { transformToTemplateField } from '../../../utils';

interface ICreateNewOppForm {
	role: EntityEnum;
	createdByUserId: string | null;
	entity: IEntity;
	currentUserId: string;
	msgTextToEntity: string;
	opTitle: string;
	oppTypeId: string;
	opportunityFields: { [key: string]: any }
	fieldsDatas: any[]
}
const createNewOppForm = (formInput: ICreateNewOppForm) => {
	const {
		role,
		entity,
		currentUserId,
		createdByUserId,
		msgTextToEntity,
		opTitle,
		oppTypeId,
		opportunityFields,
		fieldsDatas
	} = formInput;

	const opportunityConnectors: IOpportunityConnectors = {};

	opportunityConnectors.opportunityStatusId = OpportunityConnectorStatusesEnum.PENDING_APPROVAL;
		// role === EntityEnum.CONNECTOR
		// 	? OpportunityConnectorStatusesEnum.APPROVED
		// 	: OpportunityConnectorStatusesEnum.PENDING_APPROVAL;

	const assignedUserId = uuid();
	// if user exist we dont need to register him with a user object, else, we will create an object.
	if (entity.id) {
		opportunityConnectors.connectorUserId =
			role === EntityEnum.CONNECTOR ? currentUserId : entity.id;
		opportunityConnectors.ownerUserId =
			role === EntityEnum.OWNER ? currentUserId : entity.id;
	} else {
		// If the user is the owner and the entity (connector) doesnt exist register the User with key user1 key, if the user is the connector register with user key,
		const newUserDefinition = role === EntityEnum.OWNER ? 'user1' : 'user';

		opportunityConnectors[newUserDefinition] = {
			...entity,
			id: assignedUserId,
			notificationScope:3,
			userAdditionals: [{ score: 4.1 }] // Igor asked to add the userAdditional array with this score in order to prevent Server bug when saving a new entity that doesnt exists
		};

		opportunityConnectors[
			role === EntityEnum.OWNER ? 'ownerUserId' : 'connectorUserId'
		] = currentUserId;
	}
	const roleId =
	role === EntityEnum.CONNECTOR
		? EntityIdsEnum.CONNECTOR
		: EntityIdsEnum.OWNER;

	opportunityConnectors.interactions = [
		{
			timestamp: new Date(),
			fromUserId: currentUserId,
			roleId,
			interactionTypeId: role === EntityEnum.CONNECTOR?InteractionTypesEnum.CONNECTOR_OPP_CREATED:InteractionTypesEnum.OPP_CREATION
		},
		{
			timestamp: new Date(new Date().getTime() + 1000),
			fromUserId: currentUserId,
			interactionTypeId: role === EntityEnum.CONNECTOR?InteractionTypesEnum.CONNECTOR_SENT_INVITE:InteractionTypesEnum.SEND_INVITE,
			interactionTemplates: [
				{
					templateId: TemplatesEnum.SENT_INVITE,
					body: msgTextToEntity
				}
			],
			interactionSubscribers: [
				{
					userId: entity.id ? entity.id : assignedUserId,
					IntSubResponseTypeId: IntSubResponseTypesEnum.YES_NO
				}
			]
		}
	];

	// // Transform the verticals object into Array (verticals are multi select)
	// const verticalsList: Array<{}> = [];
	// Object.keys(verticals).forEach(item => {
	// 	verticalsList.push({
	// 		templateFieldId: TemplatesEnum.VERTICAL_ID,
	// 		uniqValue: verticals[item]
	// 	});
	// });

	// // Transform incoming location info into Array
	// const locationList: Array<{}> = [];
	// locationList.push({
	// 	templateFieldId: TemplatesEnum.COUTRY_ID,
	// 	stringValue: countryId,
	// });
	// locationList.push({
	// 	templateFieldId: TemplatesEnum.STATE_ID,
	// 	stringValue: stateId,
	// });
	// locationList.push({
	// 	templateFieldId: TemplatesEnum.CITY_ID,
	// 	uniqValue: cityId,
	// });

	// // Creating template fields mapper for the rest template fields
	// const oppTemplateFieldsMapper = {
	// 	[TemplatesEnum.BUSINESS_TYPE_ID]: businessTypeId,
	// 	[TemplatesEnum.SERVICE_PROVIDER_ID]: providerId,
	// 	[TemplatesEnum.BUDGET_ID]: budget
	// };

	// const restTemplateFields: Array<{}> = [];
	// Object.entries(oppTemplateFieldsMapper).forEach(([key, value]) => {
	// 	if (value) {
	// 		if (key === TemplatesEnum.BUDGET_ID) {
	// 			restTemplateFields.push({
	// 				templateFieldId: key,
	// 				floatValue: value
	// 			});
	// 		} else {
	// 			restTemplateFields.push({
	// 				templateFieldId: key,
	// 				uniqValue: value
	// 			});
	// 		}
	// 	}
	// });
	const opportunityTemplateFields: any[] = transformToTemplateField(opportunityFields,fieldsDatas);
	const data = {
		// id: newOppId,
		title: opTitle,
		createdByUserId,
		timestamp: new Date(),
		opportunityTypeId: oppTypeId,
		opportunityConnectors: [opportunityConnectors],
		opportunityTemplates: [
			{
				templateId: TemplatesEnum.OPP_TEMPLATE_ID,
				opportunityTemplateFields
			}
		],
	};
	return data;
};

export default createNewOppForm;
