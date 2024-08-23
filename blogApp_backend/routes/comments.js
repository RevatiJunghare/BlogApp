const express = require("express");
const cors = require("cors");
const { CommentModel, BlogModel, UserModel } = require("../config/db");
const uuid = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const commentRouter = express.Router();

commentRouter.post("/add-comment/:id", async (req, res) => {
  const x = req.body;
  if(!Object.keys(x).includes("comment")){
    res.status(400).send({"message":"comment can't be blank"})
  }

  x.comment_id = uuid.v4();
  const y = await BlogModel.findOne({ blog_id: req?.params?.id });
  // console.log("yyyyyyyyyyyyyy",y,req.params.id)
  x.comment_blog_id = y.blog_id;
  // console.log("1111111111",req?.decodedToken?.user?.user_id)
  const z = await UserModel.findOne({
    user_id: req?.decodedToken?.user?.user_id,
  });
  x.comment_user_id = z.user_id;
  // console.log("comment",req.body)
  try {
    const comment = new CommentModel(req.body);
    await comment.save();
    console.log("hiiiiiiiiiiiiii",req.body)
    res.send({ message: "Comment Added to This Post" });
  } catch (err) {
    res.status(400).send({ message: "Comment Not Added" });
  }
});

commentRouter.post("/all-comments/:id", async (req, res) => {
  const exists = await BlogModel.findOne({ blog_id: req?.params?.id });
  try {
    if (exists) {
      let allComments = await CommentModel.find({
        comment_blog_id: req?.params?.id,
      });

      const user_ids = [];
      allComments.map((comment) => {
        if (!user_ids.includes(comment.comment_user_id)) {
          user_ids.push(comment.comment_user_id);
        }
      });

      const user_data = await UserModel.find(
        { user_id: { $in: user_ids } },
        { name: 1, user_id: 1, _id: 0 }
      );

      const user_dataID_mappping = {};
      user_data.map((user) => {
        user_dataID_mappping[user.user_id] = user;
      });

      allComments = allComments.map((comment) => {
        const temp = JSON.parse(JSON.stringify(comment));
        temp["userObject"] = user_dataID_mappping[comment.comment_user_id];
        return temp;
      });
      
      res.send({ allComments: allComments });
      console.log("commentss",allComments)
    } else {
      res.status(400).send({ message: "wrong Blog id" });
      console.log("eror in blog id");
    }
  } catch (err) {
    res.status(400).send({ message: "Comments Not Found" });
    console.log(err);
  }
});

commentRouter.patch("/add-like",async(req,res)=>{
   
  try{
    const x = req.body
    const blogID =  x.blog_id
    const temp = await BlogModel.findOne({blog_id:blogID})
    if(!temp){
      res.status(400).send({"error":"Blog Not Found"})
    }
    const currentLikeCount = temp.likeCount+1
    const payload = {likeCount:currentLikeCount}
    await BlogModel.updateOne({blog_id:blogID},{$set:payload})
    
    
    res.send({"message":"Like added","Likecount":currentLikeCount})
  }catch(err){
    res.status(400).send({"error":err.message})
  }
})

module.exports = {
  commentRouter,
};
