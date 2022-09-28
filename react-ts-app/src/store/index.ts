import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartinstance'],
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
const store = createStore(persistedReducer, 
    composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);
export {persistor, store};
