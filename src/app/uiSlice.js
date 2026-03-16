import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: true,
    pageTitle: "Dashboard",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload;
        },
    },
});

export const { toggleSidebar, setPageTitle } = uiSlice.actions;
export default uiSlice.reducer;
