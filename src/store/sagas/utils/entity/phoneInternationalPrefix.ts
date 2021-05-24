import {
	isValidNumber,
	parsePhoneNumberFromString,
	CountryCode
} from 'libphonenumber-js';
import { IUserPhone, IUserData } from '../../../../types/interfaces';

const phoneInternationalPrefix = (userPhones: Array<IUserPhone>,userData:IUserData) => {
	
	userPhones.forEach((userPhone, index) => {
		if (!isValidNumber(userPhone.phone)) { 
			const phoneInternationalPrefix = parsePhoneNumberFromString(
				userPhone.phone,
				userData.userAdditionals[0].countryId as CountryCode
			)
				?.formatInternational()
				.replace(/ /g, '');
			
			if (phoneInternationalPrefix && isValidNumber(phoneInternationalPrefix)) {
				userPhones[index].phone = phoneInternationalPrefix;
			}else{
				userPhones[index].phone = userPhones[index].phone.startsWith('+')?'':'+'+userPhones[index].phone
			}
			
		} else {
			const phonePrefix = parsePhoneNumberFromString(userPhones[index].phone)
				?.formatInternational()
				.replace(/ /g, '');
				
				if(phonePrefix && isValidNumber(phonePrefix)){
					userPhones[index].phone = phonePrefix
				}
		}
	});

	// Remove phone duplicates
	const filteredPhoneArray = Object.values(
		userPhones.reduce((acc, item) => {
			if (!acc[item.phone]) {
				acc[item.phone] = item;
			}
			return acc;
		}, {} as { [key: string]: IUserPhone })
	);
	return filteredPhoneArray;
};

export default phoneInternationalPrefix;
