import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '@/types/constants';
import { Country } from '@/types/interfaces';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await fetch(API_URL);
  const countries: Country[] = await response.json();
  return countries.map((country) => country.name.common);
});

interface CountriesState {
  countries: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default countriesSlice.reducer;
