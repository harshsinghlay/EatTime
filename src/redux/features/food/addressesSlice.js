import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // address contains curr address
  currAddress: null,
  // addresses contains saved addresses
  addresses: [],
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setCurrAddress: (state, action) => {
      state.currAddress = action.payload;
    },
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

export const { setAddresses, setCurrAddress, addToAddresses, removeFromAddresses } =
  addressesSlice.actions;
export default addressesSlice.reducer;
