const express = require("express");
const { UserModel, BlogModel } = require("../config/db");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

const postRouter = express.Router()

postRouter.post("/create-post", async (req, res) => {
    //console.log("token1234", req?.decodedToken?.user);
    // console.log(req)
    try {
      
     const x = await UserModel.findOne({user_id: req?.decodedToken?.user?.user_id,});
      const y = req.body;
      y.blog_id = uuid.v4();
      y.created_by = x.user_id;
      const blog = new BlogModel(req.body);
      await blog.save();
      res.send({ "message": "blog created" });
    } catch (err) {
      res.send({ "message": "cannot create blog", "error": err });
      console.log("errrrrrrrr", err);
    }
  });



  postRouter.post("/loged-in-user-blogs",async(req,res)=>{
    //console.log( " req?.decodedToken?.user",req?.decodedToken?.user?.user_id)
    try{
      const userId = req?.decodedToken?.user?.user_id;

      const pipeline = [
        {
          
          $match:{
            created_by: userId,
            status:"published"}
        },
        {
          $project:{_id:0}
        }
         
      ]
  
      if (req.body.search !== undefined) {
        let search_blog = req.body.search.trim(); // Trim to remove any extra whitespace
    
        if (search_blog) {
            let search_obj = {
                $match: {
                    $or: [
                        { "title": { $regex: search_blog, '$options': 'i' } },
                        { "description": { $regex: search_blog, '$options': 'i' } }
                    ]
                }
            };
            pipeline.splice(1, 0, search_obj);
        }
    }
    
     const countPipeline = [...pipeline, { $count: "totalBlogs" }];  

     let limit = Number(req.body.limit)
     let offset = Number(req.body.offset)
  
      if(req.body.limit && req.body.offset){
        let limit_obj = {
          $limit:Number(req.body.limit)
        }
  
        let offset_obj = {
          $skip: limit * (offset - 1)
        }
  
        pipeline.push(offset_obj, limit_obj)
      }

      const [blogs, countResult] = await Promise.all([
       BlogModel.aggregate(pipeline),
       BlogModel.aggregate(countPipeline)
      ]);

      const total_pages = Math.ceil(countResult[0].totalBlogs / limit)

      res.send({"blogs":blogs,"user":req?.decodedToken?.user,"totalCount": countResult[0].totalBlogs,totalPages:total_pages, perPage:limit})
      console.log("total_pages",countResult[0].totalBlogs)
    }catch(err){
      res.send({"error":err})
    }

  })
  
  
  
  
  postRouter.get("/all-blogs", async (req, res) => {

    //const loginToken = localStorage.getItem("backendloginToken")
    // console.log("loginToken",req?.decodedToken)
    const loggedInUser = req?.decodedToken?.user?.name
    // console.log( " req?.decodedToken?.user",req?.decodedToken?.user?.user_id)
    
    try {
      // console.log("pagination",req.query)
     
      const pipeline = [
        {
          $match:{status:"published"}
        },
        {
          $project:{_id:0}
        }
        // ,
        // {
        //   $lookup:{
        //     from: "usercollections",
        //     localField: "created_by" ,
        //     foreignField: "user_id" ,
        //     as: "userObject"
        //   }
        // }
        // ,
        // {
        //   $addFields:{
        //     userObject:{
        //       $arrayElemAt : ["$userObject",0]
        //     }
        //   }
        // } 
      ]
  
      if (req.query.search !== undefined) {
        let search_blog = req.query.search.trim(); // Trim to remove any extra whitespace
    
        if (search_blog) {
            let search_obj = {
                $match: {
                    $or: [
                        { "title": { $regex: search_blog, '$options': 'i' } },
                        { "description": { $regex: search_blog, '$options': 'i' } }
                    ]
                }
            };
            pipeline.splice(1, 0, search_obj);
        }
    }
    // console.log("pipeline",pipeline)
  
     // Execute an additional aggregation stage to count the total number of documents
     const countPipeline = [...pipeline, { $count: "totalBlogs" }];  //[...pipeline, { $count: "totalBlogs" }]: This part is an array literal.
  
     //[...]: This is the spread operator. It spreads the elements of the pipeline array into a new array. It's a way to create a new array containing all the elements of another array.
     
     //{ $count: "totalBlogs" }: This is an aggregation stage object. In MongoDB aggregation, $count is an aggregation stage that returns the count of documents passed to it. Here, it's counting the number of documents and assigning it to a field named "totalBlogs".
     
     //So, the line is creating a new array (countPipeline) that includes all the stages from the pipeline array and an additional $count stage to count the total number of documents. This new pipeline will be used to retrieve the count of documents matching the aggregation criteria.
  
  
     let limit = Number(req.query.limit)
     let offset = Number(req.query.offset)
  
      if(req.query.limit && req.query.offset){
  
        
  
        let limit_obj = {
          $limit:Number(req.query.limit)
        }
  
        let offset_obj = {
          $skip: limit * (offset - 1)
        }
  
        pipeline.push(offset_obj, limit_obj)
      }

      
  
      // const countStage = {$count:"totalBlogs"}
      // pipeline.push(countStage)
  
      // console.log(pipeline)
  
      // let skip = limit * (offset - 1)
  
    
  
      // Execute the aggregation pipeline to get both aggregated data and count
      const [blogs, countResult] = await Promise.all([
       BlogModel.aggregate(pipeline),
       BlogModel.aggregate(countPipeline)
      ]);
  
      
  
      // console.log("countResult",countResult)
  
      //= await Promise.all([...]): This line uses Promise.all() to await multiple promises simultaneously. Promise.all() takes an array of promises and returns a single promise that resolves when all of the input promises have resolved, or rejects with the reason of the first promise that rejects.
      //[...]: Inside Promise.all(), an array is created with two elements:
      //BlogModel.aggregate(pipeline): This is the first promise. It executes the aggregation pipeline defined earlier (pipeline) using the aggregate method of the BlogModel collection. This promise resolves with the result of the aggregation.
      //BlogModel.aggregate(countPipeline): This is the second promise. It executes another aggregation pipeline (countPipeline) to count the total number of documents. This promise resolves with the count result.
  
      //So, this line effectively executes two MongoDB aggregation queries in parallel: one to retrieve the aggregated data and another to retrieve the count of documents, and assigns their results to the variables blogs and countResult, respectively.
  
      // Extract the count from the result
     // const totalCount = countResult.length > 0 ? countResult[0].totalBlogs : 0;
    
  
      // const blogs = await BlogModel.aggregate(pipeline)
      // console.log("blogs",blogs)
  
      // res.send({ allBlogs: blogs });
      

      const user_ids = []
      blogs.map((blog)=>{
        if(!user_ids.includes(blog.created_by)){
          user_ids.push(blog.created_by)
        }
      })
      
      const user_data = await UserModel.find({user_id:{$in:user_ids}},{name:1,user_id:1,_id:0})

      const user_dataID_mappping = {}
      user_data.map((user)=>{
        user_dataID_mappping[user.user_id]=user
      })

      blogs.map((blog)=>{
        blog["userObject"] = user_dataID_mappping[blog.created_by]
        return blog
      })

      const total_pages = Math.ceil(countResult[0].totalBlogs / limit)

     // console.log("total Pages",total_pages,countResult[0].totalBlogs,limit)
      // Send both the count and the aggregated data in the response
      
      // console.log("countResult",blogs)
      res.send({ allBlogs: blogs, totalCount: countResult[0].totalBlogs ,loggedInUser:loggedInUser, totalPages:total_pages, perPage:limit});
  
    } catch (err) {
      console.log(err)
      res.status(400).send({ message: "cannot get the blogs" });
    }
  });
  
  
  
  //340a3a2d-d87e-4103-83c3-f05fab1f478f
  
  postRouter.put("/update-blog/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
  
    try {
      await BlogModel.updateOne({ blog_id: ID }, { $set: payload });
      res.send({ message: "data has been updated" });
    } catch (err) {
      res.send({ message: "data cannot be updated", err: err.message });
    }
  });
  
  postRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    try {
      await BlogModel.deleteOne({ blog_id: ID });
      res.send({ message: "data has been deleted" });
    } catch (err) {
      res.send({ msg: "not deleted", err: err.message });
    }
  });


  module.exports = {
    postRouter
  }
  