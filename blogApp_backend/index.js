const express = require("express");
const { connection, UserModel, BlogModel } = require("./config/db");
const { Authmiddleware } = require("./Middleaware/Authmiddleware");
var jwt = require("jsonwebtoken");
const uuid = require("uuid");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/login", async (req, res) => {
//   const emailid = req.body.email;
//   const password = req.body.password;

//   try {
//     const temp = await UserModel.findOne({
//       $and: [{ email: emailid }, { password: password }],
//     });

//     if (temp) {
//       res.send({ message: "login successful" });
//     } else {
//       res.send({ message: "wrong credentials" });
//     }
//   } catch (err) {
//     res.send({ message: "login error", error: err });
//   }
// });

app.post("/signup", async (req, res) => {
  const temp = await UserModel.findOne({ email: req.body.email });
  let x = req.body;
  x.user_id = uuid.v4();
  try {
    if (temp) {
      res.status(400).send({ message: "user already exists" });
    } else {
      const user = new UserModel(req.body);
      await user.save();
      res.send({ message: "Signup Successful" });
    }
  } catch (err) {
    res.status(400).send({ message: "not able to signup", error: err });
    console.log("error",err)
  }
});

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({
    $and: [{ email: req.body.email }, { password: req.body.password }],
  });
  try {
    if (user) {
      var token = jwt.sign({ user: user }, "blog");
      res.send({ message: "user logged in successfully", token: token });
    } else {
      res.status(400).send({ message: "wrong credential" });
    }
  } catch (err) {
    res.send({ message: "user cannot login", error: err });
  }
});



//app.use(Authmiddleware);

app.post("/create-blog", async (req, res) => {
  try {
    console.log("token1234", req.decodedToken.user.user_id);
   const x = await UserModel.findOne({user_id: req.decodedToken.user.user_id,});
    const y = req.body;
    y.blog_id = uuid.v4();
    y.created_by = x.user_id;
    const blog = new BlogModel(req.body);
    await blog.save();
    res.send({ message: "blog created" });
  } catch (err) {
    res.send({ message: "cannot create blog", "error": err });
    console.log("errrrrrrrr", err);
  }
});




app.get("/all-blogs", async (req, res) => {
  
  try {
    console.log("pagination",req.query)
   
    const pipeline = [
      {
        $match:{status:"published"}
      },
      {
        $lookup:{
          from: "usercollections",
          localField: "created_by" ,
          foreignField: "user_id" ,
          as: "userObject"
        }
      },
      {
        $addFields:{
          userObject:{
            $arrayElemAt : ["$userObject",0]
          }
        }
      } 
    ]

    if(req.query.search){
      let search_blog = req.query.search

      let search_obj = {$match:{$or:[{"title":{$regex:search_blog,'$options': 'i'}},{"description":{$regex:search_blog,'$options': 'i'}}]}}

      pipeline.splice(1,0,search_obj)
   }


   // Execute an additional aggregation stage to count the total number of documents
   const countPipeline = [...pipeline, { $count: "totalBlogs" }];  //[...pipeline, { $count: "totalBlogs" }]: This part is an array literal.

   //[...]: This is the spread operator. It spreads the elements of the pipeline array into a new array. It's a way to create a new array containing all the elements of another array.
   
   //{ $count: "totalBlogs" }: This is an aggregation stage object. In MongoDB aggregation, $count is an aggregation stage that returns the count of documents passed to it. Here, it's counting the number of documents and assigning it to a field named "totalBlogs".
   
   //So, the line is creating a new array (countPipeline) that includes all the stages from the pipeline array and an additional $count stage to count the total number of documents. This new pipeline will be used to retrieve the count of documents matching the aggregation criteria.




    if(req.query.limit && req.query.offset){

      let limit = Number(req.query.limit)
      let offset = Number(req.query.offset)

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

    

    console.log("countResult",countResult)

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

    // Send both the count and the aggregated data in the response
    res.send({ allBlogs: blogs, totalCount: countResult[0].totalBlogs });

  } catch (err) {
    console.log(err)
    res.send({ message: "cannot get the blogs" });
  }
});



//340a3a2d-d87e-4103-83c3-f05fab1f478f

app.put("/update-blog/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;

  try {
    await BlogModel.updateOne({ blog_id: ID }, { $set: payload });
    res.send({ message: "data has been updated" });
  } catch (err) {
    res.send({ message: "data cannot be updated", err: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await BlogModel.deleteOne({ blog_id: ID });
    res.send({ message: "data has been deleted" });
  } catch (err) {
    res.send({ msg: "not deleted", err: err.message });
  }
});

app.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("cannot connect to db", err);
  }
  console.log("server is running 4500");
});
