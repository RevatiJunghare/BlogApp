import { useState } from "react";
import { TextField, Button} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { Authactions } from "../redux/authredux/auth.actions";
import { styled, createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [userinput,setUserinput] = useState({
        email:"",
        password:""
    })

  
  const handleSubmit = (e:any)=>{
    e.preventDefault()
    dispatch(Authactions.LOGINACTION(userinput))
     .then((res)=>{
       if(res?.payload?.status === 200){
         localStorage.setItem("token",res?.payload?.data?.token)
        //  alert(localStorage.getItem("token"))
          toast.success(res?.payload?.data?.message, {
            onClose: () => navigate("/allblogs"),
          });
       }
       else if(res?.payload?.response?.status === 400){
        toast.error(res?.payload?.response?.data?.message )
       }
       else{
        toast.error("something went wrong")
       }
     })
     .catch((err)=>{
      console.log("err",err)
     })
     .finally(()=>{})
}

  const handleChange = (e:any)=>{
    const {name,value} = e.target
    setUserinput((prev:any)=>({
      ...prev,
      [name]:value
    }))
 }

  return (
    <>
      <GlobalStyle />
      <Wrapsignup>
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Enter Email Id"
            name="email"
            onChange={handleChange}
            value={userinput.email}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          
          <TextField
            type="password"
            variant="outlined"
            color="secondary"
            label="Enter Password"
            name="password"
            onChange={handleChange}
            value={userinput.password}
            required
            fullWidth
            sx={{ mb: 4 }}
          />
          

          <Button variant="outlined" color="secondary" type="submit">
            Login
          </Button>
        </form>
        <small>
          Don't have an account? <Link to="/signup">Signup First</Link>
        </small>
      </Wrapsignup>
      <ToastContainer />
    </>
  );
};

export default Login;

const Wrapsignup = styled.div`
  padding: 20px;
  margin: 50px auto;
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to top, #0E0A1C, #C9BFE4);
    height: 100vh;
    font-family: Arial, sans-serif; 
  }
`;
