import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_API_URL,getAuthToken } from "../../common";


// const authToken = localStorage.getItem("token")   
class BlogActions{
    
    static GETALLBLOGS = createAsyncThunk("BlogSlice/GETALLBLOGS",({itemsPerPage,offset}:any)=>{
      const authToken = getAuthToken()
      const headers:any = {
        authorization:authToken
      }
      // console.log("headers",headers)
       return axios.get(`${Endpoints.allblogs}?limit=${itemsPerPage}&offset=${offset}`,{headers:headers})
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
      const authToken = getAuthToken()
      const headers:any = {
        authorization:authToken
      }
      return axios.post(`${Endpoints.createBlog}`,data,{headers:headers})
        .then((res:any)=>{
          return res
        })
        .catch((err)=>{
          return err
        })
        .finally(()=>{})
    })

    static allComments = createAsyncThunk("BlogSlice/allComments",(id:any)=>{
      const authToken = getAuthToken()
      const headers:any = {
        authorization:authToken
      }
      return axios.post(`${Endpoints.allComment}/${id}`,{},{headers})
       .then((res:any)=>{
        return res
       })
       .catch((err)=>{
        return err
       })
       .finally(()=>{})
      
    })

    static PostComment = createAsyncThunk("BlogSlice/PostComment",({id,data}:any)=>{
      const authToken = getAuthToken()
      const headers:any = {
        authorization:authToken
      }
      return axios.post(`${Endpoints.postComment}/${id}`,data,{headers:headers})
        .then((res:any)=>{
          return res
        })
        .catch((err:any)=>{
          return err
        })
        .finally(()=>{})
    })


   static AddLike = createAsyncThunk("BlogSlice/AddLike",(data:any)=>{
    const authToken = getAuthToken()
      const headers:any = {
        authorization:authToken
      }
     return axios.patch(`${Endpoints.AddLike}`,data,{headers:headers})
      .then((res:any)=>{
        return res
      })
      .catch((err:any)=>{
        return err
      })
      .finally(()=>{})
   })


}


class Endpoints{
    static allblogs = `${REACT_APP_API_URL}/blogs/all-blogs`;
    static deleteblog = `${REACT_APP_API_URL}/blogs/delete`;
    static editBlog  = `${REACT_APP_API_URL}/blogs/update-blog`;
    static createBlog = `${REACT_APP_API_URL}/blogs/create-post`;
    static allComment = `${REACT_APP_API_URL}/comments/all-comments`;
     static postComment = `${REACT_APP_API_URL}/comments/add-comment`;
     static AddLike = `${REACT_APP_API_URL}/comments/add-like`
}


export default BlogActions