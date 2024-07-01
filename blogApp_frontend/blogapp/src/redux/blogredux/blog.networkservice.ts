import axios from "axios";
import {REACT_APP_API_URL} from "../../common"

class BlogNetworkservice{
   static getallblogs(){
    return axios.get(`${Endpoints.allblogs}`)
   }

   static editBlog(data: any, id: string){
    return axios.put(`${Endpoints.editBlog}/${id}`,data)
}
}


class Endpoints{
    static allblogs = `${REACT_APP_API_URL}/all-blog`;
    static editBlog = `${REACT_APP_API_URL}/update-blog`
}

export default BlogNetworkservice