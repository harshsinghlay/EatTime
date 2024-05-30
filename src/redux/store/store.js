import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/food/cartSlice";
import addressesSlice from "../features/food/addressesSlice";
import paymentMethodsSlice from "../features/food/paymentMethodsSlice";
import ordersSlice from "../features/food/ordersSlice";
import foodsSlice from "../features/food/foodsSlice";
import blogSlice from "../features/blog/blogSlice";
import backendSlice from "../features/backend/backendSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    foods: foodsSlice,
    cart: cartSlice,
    orders: ordersSlice,
    addresses: addressesSlice,
    paymentMethods: paymentMethodsSlice,
    blogs: blogSlice,
    backend : backendSlice,
  },
});

export default store;
