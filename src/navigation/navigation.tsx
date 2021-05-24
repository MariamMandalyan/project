import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator, } from 'react-navigation';
import Main from '../views/Main'
import Filter from '../views/Filter'
export const createRootNavigator = () => {
	return createStackNavigator(
		{
			Main: {
				screen: Main
			},
			Filter: {
				screen: Filter
			}
		},	
		{
			initialRouteName: "Main",
			headerMode: "none"
		})
};

