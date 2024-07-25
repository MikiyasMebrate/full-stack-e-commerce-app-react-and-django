import {configureStore} from '@reduxjs/toolkit'
import tableDataReducer from "./tableData/tableDataSlice"
import cartReducer from "./cart/cartSlice"


export const store = configureStore({
    reducer : {
        tableData : tableDataReducer,
        cart : cartReducer,
    },
})