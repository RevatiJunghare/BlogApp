import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export class Authactions{
    static SIGNUPACTION = createAsyncThunk("AuthSlice/SIGNUPACTION",(data:any)=>{
        return axios.post(`${Endpoints.SignupAPI}`,data)
          .then((res:any)=>{
            return res
          })
          .catch((err)=>{
            return err
          })
          .finally(()=>{})
    })

    static LOGINACTION = createAsyncThunk("AuthSlice/LOGINACTION",(data:any)=>{
        return axios.post(`${Endpoints.LoginAPI}`,data)
          .then((res:any)=>{
            return res
          })
          .catch((err)=>{
            return err
          })
          .finally(()=>{})
    })
}


class Endpoints{
    static SignupAPI = "http://localhost:4500/auth/signup";
    static LoginAPI = "http://localhost:4500/auth/login";
}