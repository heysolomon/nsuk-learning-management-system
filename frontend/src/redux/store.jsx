import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage';

import userSlice from './features/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: [thunk],
});

// Had to return store and moved the persistor into main.jsx

export default store;
