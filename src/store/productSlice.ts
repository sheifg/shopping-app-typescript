import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store";

// api - url: https://dummyjson.com/products/search

interface ProductStateInterface {
  loading: boolean;
  error: boolean;
  // Product[]: it comes from types.d.ts, where it is created/defined some interface to use it
  favorites: Product[];
  productList: Product[];
}

const initialState: ProductStateInterface = {
  loading: false,
  error: false,
  favorites: [],
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Initialice the loading
    setLoading: (state) => {
      state.error = false;
      state.loading = true;
    },
    // When there is an error
    setError: (state) => {
      state.error = true;
      state.loading = false;
    },
    // It will be received an action
    setProductList: (state, action) => {
      // Update product list
      state.productList = action.payload;
      state.loading = false;
      state.error = false;
    },
    addFavorite: (state, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
    },
    //It can be defined a type for the action
    deleteFavorite: (state, action: PayloadAction<number>) => {
      // Here it is looped on favorites and each item it is had in favorites will come one by one
      // While looping it is being said here item.id !=== action.payload
      // It is defined favorites as an empty array and TS will complain item will have an id in it or not
      // To solve this problem, it is used interface (interface Product) when it is defined the initial state
      // So favorite will be initially an empty array, but it will be an array of Product type. So TS will not complain.
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const getProducts = (search: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${search}`
      );
      dispatch(productSlice.actions.setProductList(data.products));
    } catch (error) {
      console.log(error);
      dispatch(productSlice.actions.setError());
    }
  };
};

export const {
  // The following 3 are internal process, so it is not needed to export them:
  //   setLoading,
  //   setError,
  //   setProductList,
  addFavorite,
  deleteFavorite,
} = productSlice.actions;

export default productSlice.reducer;
