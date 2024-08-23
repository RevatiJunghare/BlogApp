const express = require("express");
const { UserModel} = require("../config/db");
const uuid = require("uuid");
const app = express();
var jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
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
  
  authRouter.post("/login", async (req, res) => {
    const user = await UserModel.findOne({
      $and: [{ email: req.body.email }, { password: req.body.password }],
    });
    // console.log("login api login user",user)
    
    try {
      if (user) {
        var token = jwt.sign({ user: user }, "blog");
        // console.log("login api login user token",token)
        res.send({ message: "user logged in successfully", token: token });
        // localStorage.setItem("backendloginToken",token)
      } else {
        res.status(400).send({ message: "wrong credential" });
      }
    } catch (err) {
      res.send({ message: "user cannot login", error: err });
      console.log("eror in login",err)
    }
  });


  module.exports = {
    authRouter
  }