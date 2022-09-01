import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import count from './countSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    count,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
