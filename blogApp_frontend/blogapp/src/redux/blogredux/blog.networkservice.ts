import axios from "axios"

class BlogNetworkservice{
   static getallblogs(){
    return axios.get(`${Endpoints.allblogs}`)
   }

   static editBlog(data: any, id: string){
    return axios.put(`${Endpoints.editBlog}/${id}`,data)
}
}


class Endpoints{
    static allblogs = "http://localhost:4500/all-blogs";
    static editBlog = "http://localhost:4500/update-blog"
}

export default BlogNetworkservice