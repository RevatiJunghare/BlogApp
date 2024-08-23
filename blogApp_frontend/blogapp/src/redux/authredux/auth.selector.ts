import { RootState } from "../store";



export const authdata = (state:RootState)=> state.auth.data.signupData
export const logdata = (state:RootState)=> state.auth.data.loginData
export const authentication = (state:RootState)=>state.auth.data.isUserLoggedIn