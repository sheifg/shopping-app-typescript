import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    products: productSlice,
  },
});

// How can it be made the store available?
// When it is used redux with javascript it is being used this method
// Whenever it is created a store for typescript, it is necessary this export for the store
// Typescript is all about types
// Now when it is used useSelector, Typescript will complain about state type
// It is necessary to define a type for the state
// and there is a generic way to collect the type of the state and it will be used below code for that purpose
export type RootStateType = ReturnType<typeof store.getState>;
// This part is needed when it is used useDispatch
export type AppDispatch = typeof store.dispatch;
