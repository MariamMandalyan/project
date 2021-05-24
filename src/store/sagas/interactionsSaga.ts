import { all, call, put, takeLatest } from 'redux-saga/effects';
import { success } from 'redux-saga-requests';
import { InteractionsTypes, OppOverviewTypes } from '../constants';
import { InteractionTypesEnum } from '../../types/enums';
import { IVInteraction, ODataResponse } from '../../types/interfaces';
import { createUpdateAction } from '../actions/utils';
import crumbizApi from '../../services/api/crumbizInstance';
import oppTargetsEP from '../../services/api/routes/OppTargets';
import { UtilsEP } from '../../services/api/routes';
import { errorHandler } from '../../utils';
import i18n from '../../locale/i18n';

const IDProperties = {
	[InteractionTypesEnum.FIRST_MESSAGE]: ['toUser'],
	[InteractionTypesEnum.SEND_MESSAGE]: ['toUser', 'fromUser'],
	[InteractionTypesEnum.INTRODUCTION]: ['fromUser'],
	[InteractionTypesEnum.GOOD_TO_GO]: ['ownerUser', 'targetUser'],
	[InteractionTypesEnum.DONE_DEAL]: ['fromUser', 'toUser'],
	[InteractionTypesEnum.REJECTED_INVITE]: ['fromUser'],
	[InteractionTypesEnum.CONFIRMED_INVITE]: ['fromUser', 'toUser'],
	[InteractionTypesEnum.SEND_INVITE]: ['toUser'],
	[InteractionTypesEnum.CONNECTOR_SENT_INVITE]: ['toUser', 'fromUser'],
	[InteractionTypesEnum.OWNER_APPROVE_INVITE]: ['fromUser', 'toUser'],
	[InteractionTypesEnum.OWNER_DECLINE_INVITE]: ['fromUser'],
	[InteractionTypesEnum.TARGET_DECLINE_INTRO]: ['fromUser'],
	[InteractionTypesEnum.MY_PART_IS_DONE]: ['ownerUser', 'targetUser'],
	[InteractionTypesEnum.ON_HOLD]: ['fromUser'],
	[InteractionTypesEnum.DELETED_OPP]: ['fromUser'],
};

type IFetchDataArray = Array<UserFetchData>;

interface ITransformedIds {
	[key: string]: UserFetchData;
}

interface UserFetchData {
	id: string;
	defaultData: any;
}

let alreadyFetchedUsers: IFetchDataArray = [];

function* fetchUsersData(idsData: IFetchDataArray) {
	try {
		return yield all(
			idsData.map(({ id, defaultData }) => {
				if (id) {
					const userExistObject = alreadyFetchedUsers.find(
						fetchedUser => id === fetchedUser.id
					);
					if (userExistObject) {
						return userExistObject;
					}
					return UtilsEP.getPortfolio(id)
						.then(({ data }) => {
							data.id = id;
							alreadyFetchedUsers.push(data);
							return data;
						})
						.catch(() => defaultData);
				}

				return Promise.resolve(defaultData);
			})
		);
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}

export function* fetchUsersListData(userIds: Array<IFetchDataArray>) {
	try {
		const idsToFetch = userIds.reduce((total, idBulk) => {
			idBulk.forEach(fetchData => {
				if (!total[fetchData.id]) {
					total[fetchData.id] = fetchData;
				}
			});
			return total;
		}, {} as ITransformedIds);

		const transformedIdsToFetch = Object.values(idsToFetch);

		const userRes: IFetchDataArray = yield call(
			fetchUsersData,
			transformedIdsToFetch
		);

		const usersInfo = userIds.map(ids => {
			return ids.map(item => {
				const userFetchedData = userRes.find(
					fetchedData => item.id === fetchedData.id
				);
				return userFetchedData;
			});
		});
		return usersInfo;
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}

function* getAvatars({
	type,
	data
}: {
	type: string;
	data: ODataResponse<IVInteraction>;
}) {
	try {
	const interactions = data.value.filter(({ interactionTypeId, timestamp, subject }) => {
		return !!IDProperties[interactionTypeId];
	});
	
	/*
	const userIds = interactions.map(interaction => {
		const idProperties = IDProperties[interaction.interactionTypeId];
		return idProperties.map(idProperty => {

			const id = interaction[idProperty + 'Id'];

			const defaultData = findDefaultData(id, interaction);
			return { id, defaultData };
		});
	});
	
		const usersData = yield call(fetchUsersListData, userIds);

		const updatedPayload = interactions.reduce(
			(total, interaction, dataIndex) => {
				const idProperties = IDProperties[interaction.interactionTypeId];
				total[interaction.id] = {
					...interaction
				};

				idProperties.forEach((idProperty, propertyIndex) => {
					total[interaction.id][idProperty] = usersData[dataIndex][propertyIndex];
				});

				return total;
			},
			{}
		);
			*/
		const updateAction = createUpdateAction(type.replace('_SUCCESS', ''));
		yield put(updateAction(interactions));
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}

const getAdditionalInteractionData = async (id: string) => {
	try {
		const res = await crumbizApi.get(`Interactions`, {
			params: {
				$filter: `id eq ${id}`,
			}
		});

		return res.data.value[0];
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

		throw new Error(ex);
	}
};
function* handleOppApproval({ type, payload }: {
	type: InteractionsTypes,
	payload: { id: string, role: string, callback?: () => void }
}) {
	const ownerApproveStatus = '996C60C9-7663-4397-BBB5-B3DF1C50242E';
	const targetApproveStatus = 'BB279585-B8D0-4157-9D1A-670880B4A721';
	try {
		const { opportunityTargetId } = yield call(getAdditionalInteractionData, payload.id);

		yield oppTargetsEP.changeTargetStatus({
			targetId: opportunityTargetId,
			newStatus: payload.role === 'Contributor' ? targetApproveStatus : ownerApproveStatus,
		});

		if (payload.callback) {
			payload.callback();
		}
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}

function* handleOppDecline({ type, payload }: {
	type: InteractionsTypes,
	payload: { id: string, role: string, callback?: () => void }
}) {
	const ownerDeclineStatus = 'C205B2B8-7942-4A20-A7DC-E8F519B824DF';
	const targetDeclineStatus = 'C669BD86-7155-42DC-9FB7-87212B5BDFCC';
	try {
		const { opportunityTargetId } = yield call(getAdditionalInteractionData, payload.id);

		yield oppTargetsEP.changeTargetStatus({
			targetId: opportunityTargetId,
			newStatus: payload.role === 'Contributor' ? targetDeclineStatus : ownerDeclineStatus,
		});

		if (payload.callback) {
			payload.callback();
		}
	} catch (ex) {
		errorHandler(i18n.t('modals.errorHandler.header'), i18n.t('modals.errorHandler.message', { error: ex.toString().substring(0, 156) }))

	}

}

export function* watchInteractionsSaga() {
	yield all([
		takeLatest(success(InteractionsTypes.GET_INTERACTIONS), getAvatars),
		takeLatest(success(OppOverviewTypes.GET_OPP_INTERACTIONS), getAvatars),
		takeLatest(success(OppOverviewTypes.GET_TARGET_INTERACTIONS), getAvatars),
		takeLatest(success(OppOverviewTypes.GET_TARGET_FEED), getAvatars),
		takeLatest(InteractionsTypes.APPROVE_OPP as any, handleOppApproval),
		takeLatest(InteractionsTypes.DECLINE_OPP as any, handleOppDecline),
	]);
}
