import { configureStore, createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    selectedCountries: [],
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    toggleSelectedCountry: (state, action) => {
      const country = action.payload;
      const isSelected = state.selectedCountries.some(
        (selected) => selected.name.common === country.name.common
      );
      if (isSelected) {
        state.selectedCountries = state.selectedCountries.filter(
          (selected) => selected.name.common !== country.name.common
        );
      } else {
        state.selectedCountries.push(country);
      }
    },
  },
});

export const { setCountries, toggleSelectedCountry } = countriesSlice.actions;

const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
  },
});

export default store;
