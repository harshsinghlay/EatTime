import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isUserInBackend: false,
};

const backendSlice = createSlice({
  name: "backend",
  initialState,
  reducers: {
    setBackendDataToStore: (state, action) => {
      state.data = action.payload;
    },

    changeUserBackendStatus: (state) => {
      console.log("Backend status changed");
      state.isUserInBackend = true;
    },
  },
});

export const { setBackendDataToStore, changeUserBackendStatus } = backendSlice.actions;
export default backendSlice.reducer;
