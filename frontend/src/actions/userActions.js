import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants" 

export const login = (email,password) => async (dispatch)=>{
    try{
        dispatch({  
            type:USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/users/login",{email,password},config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error) {
        console.log(error)
        console.log("error response",error.response);
        console.log(error.response.data.message)
        console.log(error.response && error.response.data.message)
        dispatch({
            type:USER_LOGIN_FAIL,
            // payload:error.response && error.response.data.messsage ? error.response.data.message : error.message
            payload:error.response.data.message
        })
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({
        type:USER_LOGOUT
    })
}