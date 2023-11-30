import { createSlice } from '@reduxjs/toolkit';

import { FormData } from '@/types/types';

interface FormState {
  values: FormData[];
}

const initialState: FormState = {
  values: [],
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    submitFormData: (state, action) => {
      state.values.push(action.payload);
    },
  },
});

export const { submitFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
