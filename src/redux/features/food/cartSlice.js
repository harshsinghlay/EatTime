import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemInCart = state.cart.find((item) => item.id === itemToAdd.id);
      if (!itemInCart) {
        state.cart.push(itemToAdd);
      } else {
        itemInCart.quantity = itemToAdd.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    itemQuantityUp: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.cart.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      }
    },
    itemQuantityDown: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.cart.find((item) => item.id === itemId);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCart,
  itemQuantityUp,
  itemQuantityDown,
} = cartSlice.actions;
export default cartSlice.reducer;
