import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authentication from './authenticationSlice'

export const store = configureStore({
  reducer: {
    authentication,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
