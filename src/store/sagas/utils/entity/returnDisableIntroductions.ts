import { ExistenceList } from '../../entitySaga';

const returnDisableIntroductions = (
	emailExistenceRes: ExistenceList,
	phoneExistenceRes: ExistenceList
) => {
	if (!emailExistenceRes.length && !phoneExistenceRes.length) return null;

	if (emailExistenceRes.length) return emailExistenceRes[0].DisableIntroductions;

	if (phoneExistenceRes.length) return phoneExistenceRes[0].DisableIntroductions;

	return null;
};

export default returnDisableIntroductions;
