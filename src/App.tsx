import React, { useEffect, useState, useMemo } from 'react';
import SplashScreen from 'react-native-splash-screen';
import "./locale/i18n"
import { createRootNavigator } from './navigation/navigation';
import AsyncStorage from "@react-native-community/async-storage";
import { createAppContainer, SafeAreaView, } from 'react-navigation';
import moment from "moment";
import { StatusBar, NativeModules, Platform, View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import AppMetrica from 'react-native-appmetrica';
import Loading from './Loading'
import PushNotification from 'react-native-push-notification';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import store from '../src/store';

//AsyncStorage.clear()
const App: React.FC = () => {
	useEffect(() => {
		SplashScreen.hide()
	}, [])
	const Navigator = useMemo(() => {
		return createAppContainer(createRootNavigator());
	}, []);
	// if (load) return <Loading />
	return (
		   <ReduxProvider store={store}>
		<SafeAreaView style={{ flex: 1 }}>
			<Navigator />
		</SafeAreaView>
		</ReduxProvider>
	);
};
export default App;
