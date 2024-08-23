const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://revati:revati@cluster0.ac6kbta.mongodb.net/blogapp?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    user_id:{type:String,required:true,unique:true}
})

const UserModel = mongoose.model("usercollection",userSchema)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    blog_id:{type:String,required:true,unique:true},
    created_by:{type:String},
    category:[{type_of_blog:String}],
    likeCount:{
                type:Number,
                default:0
            }
},{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

const BlogModel = mongoose.model("blogcollection",blogSchema)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const commentsSchema = mongoose.Schema({
    comment:{type:String},
    comment_id:{type:String},
    parent_comment_id:{
        type:String,
        default:null
    },
    comment_blog_id:{type:String},
    comment_user_id:{type:String},
    likeCount:{
        type:Number,
        default:0
    }
},{
    timestamps:{
        createdAt:"created_at"
    }
})

const CommentModel = mongoose.model("comment",commentsSchema)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



module.exports = {
    connection ,
    UserModel ,
    BlogModel,
    CommentModel
}



// var UserSchema = mongoose.Schema ({
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

// var blogSchema = mongoose.Schema({
//     title:String,
//     message:String,
//     tags:[String],
//     likeCount:{
//         type:Number,
//         default:0
//     },
//     createdAt:{
//         type:Date,
//         default:new Date()
//     }
// })