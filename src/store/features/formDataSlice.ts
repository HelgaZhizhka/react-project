import { FormData } from '@/utils/validations';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    submitFormData: (state, action: PayloadAction<FormData>) => {
      state.values.push(action.payload);
    },
  },
});

export const { submitFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
