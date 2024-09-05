import { Route, Routes } from 'react-router-dom'
import AllBlogs from './AllBlogs'
import Signup from './Signup'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard'

const AllRoutes = () => {

 
  return (
    <Routes>
      
        <Route path="/allblogs" element={<PrivateRoute>
        <AllBlogs />
        </PrivateRoute>
        }/>
      
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default AllRoutes