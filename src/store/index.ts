import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './features/countriesSlice';
import formDataReducer from './features/formDataSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    formData: formDataReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
