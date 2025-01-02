import { createSlice } from "@reduxjs/toolkit";

 const uiSlice = createSlice({
    name: "ui",
    initialState : {
        // When the page is refreshed, to save the darkMode in localStorage
        darkMode: localStorage.getItem("darkMode") === "true" ? true : false,
    },
    reducers: {
        // It will be defined actions
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', state.darkMode.toString());
        }
    }
 })

// export const uiActions = uiSlice.actions;
// Using destructuring
export const {toggleDarkMode} = uiSlice.actions;
export default uiSlice.reducer;

// In case not using destructuring for the ui actions, when it is used, it is necessary to write as follow:
// uiActions.toggleDarkMode