import { createSlice } from "@reduxjs/toolkit"
import { Authactions } from "./auth.actions"


const initialState = {
    data:{
        signupData:null,
        loginData:null,
        isUserLoggedIn:false
    },
    error:false,
    loading:false
}


const AuthSlice = createSlice({
    name : "AuthSlice",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(Authactions.SIGNUPACTION.pending , (state,action)=>{
           state.error=false;
           state.loading=true
        })
        .addCase(Authactions.SIGNUPACTION.fulfilled , (state,action)=>{
          state.data.signupData = action.payload;
          state.error = false;
          state.loading = false
        })
        .addCase(Authactions.SIGNUPACTION.rejected , (state,action)=>{
            state.data.signupData = null;
            state.error = true;
            state.loading = false
        })
        .addCase(Authactions.LOGINACTION.pending, (state,action)=>{
             state.error=false;
             state.loading=true
        })
        .addCase(Authactions.LOGINACTION.fulfilled , (state,action)=>{
            state.data.loginData = action.payload;
            state.data.isUserLoggedIn = true
            state.error = false;
            state.loading = false
          })
        .addCase(Authactions.LOGINACTION.rejected , (state,action)=>{
              state.data.loginData = null;
              state.error = true;
              state.loading = false
          })
    }
})


export default AuthSlice.reducer