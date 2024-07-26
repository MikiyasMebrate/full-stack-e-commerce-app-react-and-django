import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    user: null
}


export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const { login, logout } = authenticationSlice.actions
export default authenticationSlice.reducer

export const loginUser = (data) => async (dispatch) => {
    console.log(data.email, data.password)
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/',{ "email": data.email, "password": data.password })
        //dispatch(login(response))
        if(response.status == 200){
            return response.data
        }else{
            alert("error")
        }
    } catch (err) {
        console.log(err)
    }
}
