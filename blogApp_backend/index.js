const express = require("express");
const { connection} = require("./config/db");
const {postRouter} = require("./routes/posts")
const {authRouter} = require("./routes/auth")
const {commentRouter} = require("./routes/comments")
const { Authmiddleware } = require("./Middleaware/Authmiddleware");
// var jwt = require("jsonwebtoken");
const uuid = require("uuid");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 4500

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

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


app.use("/auth",authRouter)

app.use(Authmiddleware);

app.use("/blogs",postRouter);
app.use("/comments",commentRouter)



app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("cannot connect to db", err);
  }
  console.log(`server is running ${PORT}`);
});
