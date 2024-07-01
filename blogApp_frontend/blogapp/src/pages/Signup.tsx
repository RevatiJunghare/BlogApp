import { useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { Authactions } from '../redux/authredux/auth.actions'
import { styled } from 'styled-components'
import background from "../assets/background_image.jpg"

const Signup = () => {
  const dispatch = useAppDispatch()
    const [userinput,setUserinput] = useState({
        name:"",
        email:"",
        password:""
    })

   

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        dispatch(Authactions.SIGNUPACTION(userinput))
         .then((res)=>{
          // console.log("res",res)
           alert(res?.payload?.data?.message || "something went wrong")
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
    <Wrapsignup>
        <div className='header'>
          Signup
        </div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter Username' name='name' value={userinput.name} onChange={handleChange}/>
            <input type='email' placeholder='Enter Email Id' name='email' value={userinput.email} onChange={handleChange}/>
            <input type='password' placeholder='Enter Password' name='password' value={userinput.password} onChange={handleChange}/>
            <button type='submit'>Signup</button>
        </form>
    </Wrapsignup>
  )
}

export default Signup


const Wrapsignup = styled.div`
 & {
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set height to fill viewport */
  width: 100%; /* Set width to fill viewport */
  overflow: hidden; /* Ensure overflow does not distort the background image */





    .header{
      text-align: center;
      text-transform: uppercase;
      color: #4CAF50;
      font-weight:600;
      font-size:20px;
    }

    form{
      display:flex;
      gap:10px;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      margin:10px 0px;
    }

    input{
      width:350px;
      padding:10px;
      border-radius:10px;
      border:1px solid gray;
    }

    button{
      width:370px;
      border:1px solid gray;
    }
 }
`