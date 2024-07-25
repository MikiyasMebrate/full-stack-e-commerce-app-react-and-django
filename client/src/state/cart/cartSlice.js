import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    item : []
}


export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addProduct : (state, action) => {
            state.item = [...state.item, action.payload]
        },
        removeProduct : (state, action) => {
            state.item = state.item.filter((item) => item.id !== action.payload)
        },
        updateProduct : (state, action) => {
            state.item = state.item.filter((item) => item.id !== action.payload.id)
            state.item = [...state.item, action.payload]
        }
    }
})


export const {addProduct, removeProduct, updateProduct} = cartSlice.actions
export default cartSlice.reducer