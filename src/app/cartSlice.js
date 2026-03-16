import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const item = state.items.find(
                p => p.id === action.payload.id
            );

            if (item) {
                if (item.quantity < 5) {
                    item.quantity += 1;
                }
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(
                p => p.id === action.payload
            );

            if (item) {
                item.quantity -= 1;

                if (item.quantity === 0) {
                    state.items = state.items.filter(
                        p => p.id !== action.payload
                    );
                }
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                p => p.id !== action.payload
            );
        }

    }
});

export const {
    addToCart,
    decreaseQty,
    removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
