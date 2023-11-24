import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingDetail: false,
};

export const isLoadingDetail = createSlice({
  name: 'isLoadingDetail',
  initialState,
  reducers: {
    setIsLoadingDetail: (state, action) => {
      state.isLoadingDetail = action.payload;
    },
  },
});

export const { setIsLoadingDetail } = isLoadingDetail.actions;
export default isLoadingDetail.reducer;
