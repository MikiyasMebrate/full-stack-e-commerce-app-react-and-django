import {configureStore} from '@reduxjs/toolkit'
import tableDataReducer from "./tableData/tableDataSlice"
import cartReducer from "./cart/cartSlice"
import authenticationReducer from './Authentication/authenticationSlice'


export const store = configureStore({
    reducer : {
        tableData : tableDataReducer,
        cart : cartReducer,
        authentication : authenticationReducer,
    },
})