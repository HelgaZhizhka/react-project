import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingMain: false,
};

export const isLoadingMain = createSlice({
  name: 'isLoadingMain',
  initialState,
  reducers: {
    setIsLoadingMain: (state, action) => {
      state.isLoadingMain = action.payload;
    },
  },
});

export const { setIsLoadingMain } = isLoadingMain.actions;
export default isLoadingMain.reducer;
