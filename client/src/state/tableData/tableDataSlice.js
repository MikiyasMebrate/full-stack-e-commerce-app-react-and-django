//redux
import { createSlice} from '@reduxjs/toolkit'


//axios 
import axios from 'axios'

//initial state
const initialState = {
    data : null,
    loading : false,
    error : null,
    selectedItem : null
}


//creating initial state
export const tableDataSlice = createSlice({
    name : 'tableData',
    initialState,
    reducers : {
        fetchDataRequest : (state) =>{
            state.loading = true,
            state.error = false
        },
        fetchDataSuccess : (state, action) =>{
            state.loading = false,
            state.data = action.payload
        },
        fetchDataFailure : (state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
        selectItem : (state, action) =>{
            state.selectedItem = action.payload
        }
    }
})


//export action and reducer
export const {fetchDataRequest,fetchDataSuccess,fetchDataFailure,selectItem } = tableDataSlice.actions
export default tableDataSlice.reducer


//server requests


//get request 
export const fetchTableData = (url) => async(dispatch) =>{
    dispatch(fetchDataRequest())
    try{
        const response = await axios.get(url)
        dispatch(fetchDataSuccess(response.data))
    }catch(error){
        dispatch(fetchDataFailure(error.message))
    }
}



// post request for add new data
export const addTableDataRequest = (url, data) => async(dispatch) =>{
    try{
        const response = await axios.post(url, data)
        dispatch(fetchTableData(url))
        return [true, response.data.message]
    }catch(error){
        dispatch(fetchTableData(url))
        return [false, error.message]
    }
}


// post request for update  data
export const updateTableDataRequest = (url, data) => async(dispatch) =>{
    try{
        const response = await axios.post(url, data)
        dispatch(fetchTableData(url))
        return [true, response.data.message]
    }catch(error){
        dispatch(fetchTableData(url))
        return [false, error.message]
    }
}


// post request for update  data
export const deleteTableDataRequest = (url) => async(dispatch) =>{
    try{
        const response = await axios.delete(url)
        dispatch(fetchTableData(url))
        return [true, response.data.message]
    }catch(error){
        dispatch(fetchTableData(url))
        return [false, error.message]
    }
}