import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    addToAddresses: (state, action) => {
      const addressToAdd = action.payload;
      const isInAddresses = state.addresses.find(
        (address) => address.id === addressToAdd.id
      );
      if (!isInAddresses) {
        state.addresses.push(addressToAdd);
      }
    },
    removeFromAddresses: (state, action) => {
      state.addresses = state.addresses.filter((address) => {
        address.id !== action.payload;
      });
    },
  },
});

export const { setAddresses, addToAddresses, removeFromAddresses } =
  addressesSlice.actions;
export default addressesSlice.reducer;
