import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foods: [],
  trendingFoods: [],
  filteredFoods: [],
  wishlist: [],
  sortingOrder: "top rated",
};

const numberIsInRange = (number, min, max) => {
  return number > min && number < max;
};

const sorting = (foods, order) => {
  if (order === "low to high") {
    return [...foods].sort((a, b) => a.price - b.price);
  } else if (order === "high to low") {
    return [...foods].sort((a, b) => b.price - a.price);
  } else if (order === "top rated") {
    return [...foods].sort((a, b) => b.rate - a.rate);
  }
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
    setTrendingFoods: (state, action) => {
      state.trendingFoods = action.payload;
    },
    setFilteredFoods: (state, action) => {
      state.filteredFoods = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
    },
    setSortingOrder: (state, action) => {
      state.sortingOrder = action.payload;
    },
    applyFilters: (state, action) => {
      let minRate = action.payload.minimumRate;
      let minPrice = action.payload.priceRange.minimum;
      let maxPrice = action.payload.priceRange.maximum;
      let categories = action.payload.categories;
      console.log("LIST OF CATEGORIES PASSED TO FILTER", categories);
      let filteredFoods = [];
      state.foods.forEach((food) => {
        if (
          categories.includes(food.category) &&
          food.rate >= minRate &&
          numberIsInRange(parseInt(food.price), minPrice, maxPrice)
        ) {
          filteredFoods.push(food);
        }
      });
      state.filteredFoods = sorting(filteredFoods, state.sortingOrder);
    },
  },
});

export const {
  setFoods,
  setFilteredFoods,
  setTrendingFoods,
  setSortingOrder,
  applyFilters,
  addToWishlist,
  removeFromWishlist,
  setWishlist
} = foodsSlice.actions;
export default foodsSlice.reducer;
