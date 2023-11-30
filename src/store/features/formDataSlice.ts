import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    image: null,
  },
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    submitFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    uploadImage: (state, action) => {
      state.formData.image = action.payload;
    },
  },
});

export const { submitFormData, uploadImage } = formDataSlice.actions;

export default formDataSlice.reducer;
