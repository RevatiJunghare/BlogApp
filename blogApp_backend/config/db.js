const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://revati:revati@cluster0.ac6kbta.mongodb.net/blogapp?retryWrites=true&w=majority")




const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    user_id:{type:String,required:true,unique:true}
})

const UserModel = mongoose.model("usercollection",userSchema)


const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    blog_id:{type:String,required:true,unique:true},
    created_by:{type:String,required:true},
    category:[{type_of_blog:String}]
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const BlogModel = mongoose.model("blogcollection",blogSchema)


module.exports = {
    connection ,
    UserModel ,
    BlogModel
}



// var UserSchema = new mongoose.Schema ({
//     username: String,
//     password: String,
//     email: String,
//     foods: [{
//       name: String,
//       category: String,
//       ingredients: [String]
//     }], 
//     ingredients: [{
//       name: String,
//       category: String
//     }]  
// });