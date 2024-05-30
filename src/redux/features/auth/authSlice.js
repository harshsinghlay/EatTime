import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeLogin: (state, action) => {
      state.userData = action.payload;
      state.status = true;
    },
    storeLogout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { storeLogin, storeLogout } = authSlice.actions;
export default authSlice.reducer;
