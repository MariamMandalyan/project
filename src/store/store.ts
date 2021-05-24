import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas/index';
import createSagaMiddleware from 'redux-saga';
import createPendingMiddleware from './middlewares/pendingMiddleware';
// import { persistStore, persistReducer } from 'redux-persist'
//import AsyncStorage from '@react-native-community/async-storage';
// Middleware: Redux Persist Config
// const persistConfig = {
// 	// Root
// 	key: 'root',
// 	// Storage Method (React Native)
// 	storage: AsyncStorage,
// 	// Whitelist (Save Specific Reducers)
// 	blacklist: [
// 		'auth',
// 		'panding',
// 		'interactions'
// 	],
//   };
//const persistedReducer = persistReducer(persistConfig, rootReducer);
 
const sagaMiddleware = createSagaMiddleware();
const pendingMiddleware = createPendingMiddleware();

const middlewares = [sagaMiddleware, pendingMiddleware];

const store = createStore(
//	persistedReducer,
	rootReducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);


//let persistor = persistStore(store);
// Exports
export {
  store,
 // persistor,
};
