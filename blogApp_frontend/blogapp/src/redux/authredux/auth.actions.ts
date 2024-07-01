import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export class Authactions{
    static SIGNUPACTION = createAsyncThunk("AuthSlice/SIGNUPACTION",(data:any)=>{
        return axios.post(`${Endpoints.SignupAPI}`,data)
          .then((res:any)=>{
            return res
          })
          .catch((err)=>{
            console.log("error in signup action",err)
          })
          .finally(()=>{})
    })
}


class Endpoints{
    static SignupAPI = "http://localhost:4500/signup"
}