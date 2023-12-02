import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FormData } from '@/utils/validations';

export interface UpdateFormData extends Omit<FormData, 'image'> {
  image: string | null;
}

interface FormState {
  values: UpdateFormData[];
}

const initialState: FormState = {
  values: [],
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    submitFormData: (state, action: PayloadAction<UpdateFormData>) => {
      state.values = state.values.concat(action.payload);
    },
  },
});

export const { submitFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
