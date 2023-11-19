import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PER_PAGE } from '@/components/Select/Select.enums';
import { ItemsPerPageState } from '@/utils/interfaces';

const initialState: ItemsPerPageState = {
  value: PER_PAGE[10],
};

const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { setItemsPerPage } = itemsPerPageSlice.actions;
export default itemsPerPageSlice.reducer;
