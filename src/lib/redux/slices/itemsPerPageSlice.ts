import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemsPerPageState {
  perPage: number;
}

const initialState: ItemsPerPageState = {
  perPage: 10,
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
