import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../assets/Infinity.png"
import CreateBlog from './CreateBlog';
import { TextField } from '@mui/material';


interface Props {
    toggleDrawer: any;
    open:any;
    setOpen:any;
    editData:any;
    setEditData:any;
    getblogs:any;
  }

const Navbar:React.FC<Props> = ({ toggleDrawer, open, setOpen, editData, setEditData, getblogs }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "#ffffff", color: "black" }}>
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',  alignItems: "center", height: "70px" }}>
            <img
              src={Logo}
              alt="logo"
              style={{ height: "100%", width: "100%", cursor: "pointer" }}
            />
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
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
                alignItems:"center"
              }}
            >
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" color={"black"}>Products</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" color={"black"}>Pricing</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" color={"black"}>Blog</Typography>
              </MenuItem> */}
              
              <Box sx={{display: "flex",alignItems: "center"}}>
                <Button onClick={()=>toggleDrawer()}>Create Blog</Button>
                <CreateBlog open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} getblogs={getblogs}/>
              </Box>
            </Menu>
          </Box>
          

          {/* Logo for mobile view */}
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
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
            LOGO
          </Typography> */}
          <Box sx={{  height: "70px" ,mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none", }}>
            <img
              src={Logo}
              alt="logo"
              style={{ height: "100%", width: "100%", cursor: "pointer" }}
            />
          </Box>

          {/* Menu for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, padding: "0px 20px" }}>
            {/* <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "black", display: "block" }}>
              Products
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "black", display: "block" }}>
              Pricing
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "black", display: "block" }}>
              Blog
            </Button> */}
            <Box sx={{display: "flex",alignItems: "center"}}>
              <Button onClick={()=>toggleDrawer()}>Create Blog</Button>
              <CreateBlog open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} getblogs={getblogs}/>
            </Box>
            {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search blogs..."
          size="small"
          sx={{ ml: 2, width: "300px" }} // Adjust the width as needed
          inputProps={{ style: { padding: "8px 14px" } }} // Adjust padding as needed
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
  );
}

export default Navbar;
