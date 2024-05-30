import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: {
    id: "",
    mode: "",
    value: "",
    exp: "",
  },
  paymentMethods: [],
};

const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    setPaymentMethods: (state, action) => {
      state.paymentMethods = action.payload;
    },
    removeFromPaymentMethods: (state, action) => {
      state.paymentMethods = state.paymentMethods.filter((method) => {
        method.id !== action.payload;
      });
    },
    addToPaymentMethods: (state, action) => {
      const paymentMethodToAdd = action.payload;
      const isInPayMethods = state.paymentMethods.find(
        (paymentMethod) => paymentMethod.id === paymentMethodToAdd.id
      );
      if (!isInPayMethods) {
        state.paymentMethods.push(paymentMethodToAdd);
      }
    },
  },
});

export const { setPaymentMethods, addToPaymentMethods , removeFromPaymentMethods} =
  paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;
