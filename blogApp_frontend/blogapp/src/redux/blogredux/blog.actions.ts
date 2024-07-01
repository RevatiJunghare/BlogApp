import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_API_URL } from "../../common";

class BlogActions{
    static GETALLBLOGS = createAsyncThunk("BlogSlice/GETALLBLOGS",()=>{
       return axios.get(`${Endpoints.allblogs}`)
          .then((res:any)=>{
            return res
          })
          .catch((err)=>{
            console.log("error in allblogs action",err)
          })
          .finally(()=>{})
    })

    static deleteBlog = createAsyncThunk("BlogSlice/deleteBlog",(id:any)=>{
       return axios.delete(`${Endpoints.deleteblog}/${id}`)
         .then((res:any)=>{
          return res
         })
         .catch((err)=>{
          console.log("error in delete action",err)
         })
         .finally(()=>{})
    })

    static editBlog = createAsyncThunk("BlogSlice/editBlog",(data:any,id:any)=>{
      return axios.put(`${Endpoints.editBlog}/${id}`,data)
        .then((res:any)=>{
          return res
        })
        .catch((err)=>{
          console.log("error in update action",err)
        })
        .finally(()=>{})
    })

    static createBlog = createAsyncThunk("BlogSlice/createBlog",(data:any)=>{
      return axios.post(`${Endpoints.createBlog}`,data)
        .then((res:any)=>{
          return res
        })
        .catch((err)=>{
          console.log("error in create action",err)
        })
        .finally(()=>{})
    })


}


class Endpoints{
    static allblogs = `${REACT_APP_API_URL}/all-blogs`;
    static deleteblog = `${REACT_APP_API_URL}/delete`;
    static editBlog  = `${REACT_APP_API_URL}/update-blog`;
    static createBlog = `${REACT_APP_API_URL}/create-post`;
}


export default BlogActions