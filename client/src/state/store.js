import {configureStore} from '@reduxjs/toolkit'
import tableDataReducer from "./tableData/tableDataSlice"


export const store = configureStore({
    reducer : {
        tableData : tableDataReducer
    },
})