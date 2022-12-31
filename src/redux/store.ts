import {combineReducers, configureStore} from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import userReducer from "./slices/user";
import messagesReducer from "./slices/messages";
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  data: userReducer,
  messages: messagesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const preloadedState = {};


export const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  devTools:__DEV__,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  // .concat(??.middleware),
});

const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export {persistor};
