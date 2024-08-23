import axios from "axios";
import {REACT_APP_API_URL} from "../../common"

class BlogNetworkservice{
   static getallblogs(){
    return axios.get(`${Endpoints.allblogs}`)
   }

   static editBlog(data: any, id: string){
    return axios.put(`${Endpoints.editBlog}/${id}`,data)
}

 static PostComment(data:any, id:String){
    return axios.post(`${Endpoints.postComment}/${id}`,data)
 }
}


class Endpoints{
    static allblogs = `${REACT_APP_API_URL}/blogs/all-blog`;
    static editBlog = `${REACT_APP_API_URL}/blogs/update-blog`;
    static postComment = `${REACT_APP_API_URL}/comments/add-comment`
}

export default BlogNetworkservice