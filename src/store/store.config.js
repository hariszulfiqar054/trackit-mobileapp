import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import authReducer from './reducer/auth.reducer';
import CartReducer from './reducer/cart.reducer';
import Env from '../env/env';
import axios from 'axios';

// Axios Configuration
axios.defaults.baseURL = Env.BASE_URL;
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = STORE.getState()?.auth?.user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Redux Configuration
const rootReducer = combineReducers({
  auth: authReducer,
  cart: CartReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const middleware = applyMiddleware(promise, thunk);

let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const STORE = createStore(
  persistedReducer,
  composeEnhancers(middleware),
);
export const PERSISTOR = persistStore(STORE);
