import { useEffect, useState } from "react"
import BlogActions from "../redux/blogredux/blog.actions"
import { useAppDispatch } from "../redux/store"
import CreateBlog from "./CreateBlog"
import { WrapperBlog } from "./AllBlogsstyle"
import RecipeReviewCard from "./AllBlogs2"
import Navbar from "./Navbar"
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


const AllBlogs = ()=>{
    const dispatch = useAppDispatch()
    const [data,setData] = useState<any>([])
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState("")

    const getblogs = ()=>{
       dispatch(BlogActions.GETALLBLOGS())
        .then((res)=>{
          console.log("res",res?.payload?.data)
            setData(res?.payload?.data?.allBlogs || [])
            setLoggedInUser(res?.payload?.data?.loggedInUser || "")
        })
        .catch((err)=>{
            console.log("error",err)
        })
        .finally(()=>{})
      
    }

   

    const deleteBlog = (id:any)=>{
      dispatch(BlogActions.deleteBlog(id))
      getblogs()
    }


    const toggleDrawer = () => {
      console.log("open")
      setIsDrawerOpened(!isDrawerOpened);
     setOpen(true);
  
      if (isDrawerOpened) {
        setEditData(null);
      }
    };

    const handleEditIconFn = (data:any)=>{
      setEditData(data)
      toggleDrawer()
    }

  

    useEffect(()=>{
      if (!editData) {
        getblogs() 
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editData])
    
    console.log("datalength",data.length)
  return <WrapperBlog>
    <Navbar open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} getblogs={getblogs} toggleDrawer={toggleDrawer}/>
    {/* <div>
        <button onClick={()=>toggleDrawer()}>Create Blog</button>
        <CreateBlog open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} getblogs={getblogs}/>
      </div> */}
    <div className="blog-component">
      
        {
          data.length>0 ? data.map((el:any)=>{
            // console.log(el)
            return <div key={el.blog_id}  className="blog-box">
              {/* <div  className="header-box">
                <div >
                  <p className="blog-title">{el?.title}</p>
                  <p>{el?.created_by[0]?.name || ""}</p> 
                </div>
                <div >
                   <p>{moment(el?.created_at).format("yyyy-MM-DD")}</p>
                   <div style={{display:"flex"}}>
                      <button onClick={()=>deleteBlog(el.blog_id)}>Delete</button>
                      <div >
                        <button onClick={() => handleEditIconFn(el)}>Edit</button>
                      </div>
                   </div>
                </div>
              </div>
              <hr/>
              <div className="desc-box">
              {el?.description}
              </div> */}

              <RecipeReviewCard data={el} loggedInUser={loggedInUser}/>
              
            </div>
          }) : <div>NO DATA FOUND</div>
        }
    </div>
  </WrapperBlog>
}

export default AllBlogs