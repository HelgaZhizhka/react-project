import { configureStore } from '@reduxjs/toolkit';

import searchReducer from '@/lib/redux/slices/search/searchSlice';
import itemsPerPageReducer from '@/lib/redux/slices/itemsPerPage/itemsPerPageSlice';
import paginationSliceReducer from '@/lib/redux/slices/pagination/paginationSlice';
// import { apiService } from '@/api/apiService';

const store = configureStore({
  reducer: {
    search: searchReducer,
    itemsPerPage: itemsPerPageReducer,
    pagination: paginationSliceReducer,
    // [apiService.reducerPath]: apiService.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
