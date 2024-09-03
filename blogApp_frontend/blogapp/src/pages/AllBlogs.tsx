import { useEffect, useState } from "react"
import BlogActions from "../redux/blogredux/blog.actions"
import { useAppDispatch } from "../redux/store"
import { WrapperBlog } from "./AllBlogsstyle"
import RecipeReviewCard from "./AllBlogs2"
import Navbar from "./Navbar"
import { Pagination, Stack, debounce } from "@mui/material"


import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/Infinity.png";
import CreateBlog from "./CreateBlog";
import { TextField } from "@mui/material";

interface Props {
  toggleDrawer: any;
  open: any;
  setOpen: any;
  editData: any;
  setEditData: any;
  getblogs: any;
}


const AllBlogs : React.FC<Props>= ()=>{
    const dispatch = useAppDispatch()
    const [data,setData] = useState<any>([])
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [loggedInUser,setLoggedInUser] = useState("");
    const [page, setPage] = useState(1);
    const [totalpages,setTotalPages] = useState(0)
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    
    


    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {setAnchorElNav(event.currentTarget)};
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {setAnchorElUser(event.currentTarget)};
  const handleCloseNavMenu = () => {setAnchorElNav(null)};
  const handleCloseUserMenu = () => {setAnchorElUser(null)};
   

    const getblogs = (currentPage:number,searchQuery: string)=>{
      
      let offset = currentPage
      
       dispatch(BlogActions.GETALLBLOGS({itemsPerPage,offset,searchquery:searchQuery}))
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
      getblogs(value, searchQuery); 
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const query = e.target.value;
    setSearchQuery(query || "");
  };

  

    // useEffect(()=>{
    //   if (!editData) {
    //     getblogs(page, searchQuery) 
    //   }
    //    // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[editData,page,searchQuery])

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (!editData){
          getblogs(page, searchQuery)
        }
      }, 300); // Adjust the delay as necessary
  
      return () => clearTimeout(delayDebounceFn);
  }, [editData, page,searchQuery]);
    
  return <WrapperBlog>


<AppBar position="fixed" style={{ backgroundColor: "white" }}>
      <Container sx={{ backgroundColor: "#ffffff", color: "black" }}>
        <Toolbar disableGutters>
          {/* Logo */}
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              alignItems: "center",
              height: "70px",
            }}
          >
            <img src={Logo} alt="logo" style={{ height: "100%", width: "100%", cursor: "pointer" }}/>
          </Box>

          {/* Menu for mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
           
            <TextField
              variant="outlined"
              placeholder="Search blogs..."
              size="small"
              sx={{ ml: 2, width: "300px" }} // Adjust the width as needed
              inputProps={{ style: { padding: "8px 14px" } }} // Adjust padding as needed
              onChange={(e:any)=>handleSearch(e)}
            />
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "black",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => toggleDrawer()}>Create Blog</Button>
                <CreateBlog
                  open={open}
                  setOpen={setOpen}
                  editData={editData}
                  setEditData={setEditData}
                  getblogs={getblogs}
                  // itemsPerPage={itemsPerPage}
                offset={page}
                searchquery={searchQuery}
                />
                
              </Box>
            </Menu>
          </Box>

          <Box
            sx={{
              height: "70px",
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="logo" style={{ height: "100%", width: "100%", cursor: "pointer" }}/>
          </Box>

          {/* Menu for larger screens */}
          <Box sx={{flexGrow: 1,display: { xs: "none", md: "flex" },padding: "0px 20px",}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button onClick={() => toggleDrawer()}>Create Blog</Button>
              <CreateBlog
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
                getblogs={getblogs}
                // itemsPerPage={itemsPerPage}
                offset={page}
                searchquery={searchQuery}
              />
            </Box>
            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search blogs..."
              size="small"
              sx={{ ml: 2, width: "300px" }} // Adjust the width as needed
              inputProps={{ style: { padding: "8px 14px" } }} // Adjust padding as needed
              value={searchQuery}
              onChange={(e:any)=>handleSearch(e)}
            />
          </Box>

          {/* User Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>




















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