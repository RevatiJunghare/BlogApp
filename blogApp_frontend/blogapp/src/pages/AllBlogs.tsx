import { useEffect, useState } from "react"
import BlogActions from "../redux/blogredux/blog.actions"
import { useAppDispatch } from "../redux/store"
import { WrapperBlog } from "./AllBlogsstyle"
import RecipeReviewCard from "./AllBlogs2"
import Navbar from "./Navbar"
import { Pagination, Stack } from "@mui/material"


const AllBlogs = ()=>{
    const dispatch = useAppDispatch()
    const [data,setData] = useState<any>([])
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState("");
    const [page, setPage] = useState(1);
    const [totalpages,setTotalPages] = useState(0)
    const itemsPerPage = 10;
   

    const getblogs = (currentPage:number)=>{
      const offset = currentPage
      
      
       dispatch(BlogActions.GETALLBLOGS({itemsPerPage,offset}))
        .then((res)=>{
            setTotalPages(res?.payload?.data?.totalPages)
            setData(res?.payload?.data?.allBlogs || [])
            setLoggedInUser(res?.payload?.data?.loggedInUser || "")
        })
        .catch((err)=>{
            console.log("error",err)
        })
        .finally(()=>{})
      
    }

   

    // const deleteBlog = (id:any)=>{
    //   dispatch(BlogActions.deleteBlog(id))
    //   getblogs()
    // }


    const toggleDrawer = () => {
      setIsDrawerOpened(!isDrawerOpened);
      setOpen(true)
      if (isDrawerOpened) {
        setEditData(null)
      }
    }

    // const handleEditIconFn = (data:any)=>{
    //   setEditData(data)
    //   toggleDrawer()
    // }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
  };

  

    useEffect(()=>{
      if (!editData) {
        getblogs(page) 
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editData,page])
    
  return <WrapperBlog>
    <Navbar open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} getblogs={getblogs} toggleDrawer={toggleDrawer}/>
    <div className="blog-component">
      {
          data.length>0 ? data.map((el:any)=>{
            return <div key={el.blog_id}  className="blog-box">
              <RecipeReviewCard data={el} loggedInUser={loggedInUser}/>
            </div>
          }) : <div>NO DATA FOUND</div>
        }
    </div>
    <Stack spacing={2} sx={{ alignItems: "center", marginTop: "20px" }}>
        <Pagination count={totalpages} page={page} onChange={handlePageChange} />
    </Stack>
  </WrapperBlog>
}

export default AllBlogs