import { configureStore } from '@reduxjs/toolkit';

import { apiService } from '@/api/apiService';
import searchReducer from '@/features/search/searchSlice';
import itemsPerPageReducer from '@/features/itemsPerPage/itemsPerPageSlice';
import paginationSliceReducer from '@/features/pagination/paginationSlice';
import loadingReducer from '@/features/loading/loadingSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    itemsPerPage: itemsPerPageReducer,
    pagination: paginationSliceReducer,
    loading: loadingReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
