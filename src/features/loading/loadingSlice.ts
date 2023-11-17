import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoadingDetails: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingMainPage: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadingDetailsPage: (state, action) => {
      state.isLoadingDetails = action.payload;
    },
  },
});

export const { setLoadingMainPage, setLoadingDetailsPage } = loadingSlice.actions;
export default loadingSlice.reducer;
