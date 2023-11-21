import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { apiService } from '@/lib/services/apiService';
import searchReducer from '@/lib/redux/slices/search/searchSlice';
import itemsPerPageReducer from '@/lib/redux/slices/itemsPerPage/itemsPerPageSlice';
import paginationSliceReducer from '@/lib/redux/slices/pagination/paginationSlice';

export const store = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      itemsPerPage: itemsPerPageReducer,
      pagination: paginationSliceReducer,
      [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(store, { debug: true });
