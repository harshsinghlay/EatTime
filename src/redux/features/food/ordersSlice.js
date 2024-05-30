import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {
    orderId: "",
    items: [],
    status: "",
    billingAddress: {},
    deliveryAddress: {},
    paymentMethod: "",
    date: "",
    time: "",
    price: 0,
  },
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrderProperty: (state, action) => {
      const { key, value } = action.payload;
      state.order[key] = value;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addToOrders: (state) => {
      state.orders.push(state.order);
    },
    removeFromOrders: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.orderId !== orderId);
    },
  },
});

export const { setOrders, addToOrders, removeFromOrders , addOrderProperty} = ordersSlice.actions;
export default ordersSlice.reducer;
