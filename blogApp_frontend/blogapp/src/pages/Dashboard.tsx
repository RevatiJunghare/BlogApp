import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import BlogActions from "../redux/blogredux/blog.actions";
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  SpeedDial,
  Typography,
} from "@mui/material";
import moment from "moment";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DetailSingleBlog from "./DetailSingleBlog";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  loggedInUser: any;
}

const Dashboard: React.FC<Props> = ({ loggedInUser }) => {
  const dispatch = useAppDispatch();
  const [userBlogs, setUserBlogs] = useState<any>([]);
  const [isShow, setShowHide] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [blogId, setBlogId] = React.useState("");
  const [id, setId] = useState("");
  const [commentsData, setCommentsData] = React.useState([]);
  const blogs: any = useAppSelector((store: any) => store?.blogreducer?.data);
  const [localLikes, setLocalLikes] = useState<{ [key: string]: number }>({});
  const truncLength = 100;
  const [openmore, setOpenmore] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [copySuccess, setCopySuccess] = useState("");

  const actions = [
    {
      icon: <FileCopyIcon />,
      name: "Copy",
      action: (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess(""), 2000);
        });
      },
    },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const handleOpenmore = (id: any) => {
    setOpenmore(true);
    setId(id);
  };
  const handleClosemore = () => {
    setOpenmore(false);
    setId("");
  };

  const getUserBlogs = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const payload = {
      limit: 10,
      offset: offset,
      search: "",
    };
    dispatch(BlogActions.GETUSERBLOGS(payload))
      .then((res: any) => {
        console.log("userData", res?.payload?.data);
        setUserBlogs((prevBlogs: any) => [
          ...prevBlogs,
          res?.payload?.data?.blogs,
        ]);
        setHasMore(userBlogs.length > 0); // If no new blogs, stop fetching
        setOffset((prevOffset) => prevOffset + 1); // Increment offset
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  // Scroll event listener
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      getUserBlogs(); // Load more blogs when near bottom
    }
  };

  const getAllComments = (id: any) => {
    dispatch(BlogActions.allComments(id))
      .then((res: any) => {
        setCommentsData(res?.payload?.data?.allComments || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const handleLike = (e: any, blogId: any) => {
    e.preventDefault();

    // Optimistically update the like count in local state
    setLocalLikes((prevState) => ({
      ...prevState,
      [blogId]:
        (localLikes[blogId] ??
          blogs?.userBlogData?.data?.blogs.find(
            (el: any) => el.blog_id === blogId
          )?.likeCount) + 1,
    }));

    dispatch(BlogActions.AddLike({ blog_id: blogId }))
      .then((res: any) => {
        toast.success(res?.payload?.data?.message);
      })
      .catch((err: any) => {
        // Revert the like count in case of an error
        setLocalLikes((prevState) => ({
          ...prevState,
          [blogId]: prevState[blogId] - 1,
        }));
      })
      .finally(() => {});
  };

  useEffect(() => {
    getUserBlogs();
    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);
    // Clean up event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setBlogId(id);
    getAllComments(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {blogs?.userBlogData?.data?.blogs &&
      blogs?.userBlogData?.data?.blogs.length > 0
        ? blogs?.userBlogData?.data?.blogs?.map((el: any) => {
            return (
              <Card key={el?.blog_id} sx={{maxWidth: 550, mb: 5,boxShadow: "0px 0px 2px 2px gray",padding: "20px"}}>
                <CardHeader sx={{display: "flex",justifyContent: "space-between",alignItems: "center"}}
                  titleTypographyProps={{ sx: { textAlign: "left" } }}
                  subheaderTypographyProps={{ sx: { textAlign: "left" } }}
                  action={
                     <Box key={el?.blog_id} sx={{ position:"absolute",height:"auto",flexGrow:1}}>
                      <SpeedDial ariaLabel="SpeedDial controlled open example"
                                 sx={{position: "relative",bottom: -90,right: 70,color: "white"}}
                                 icon={<MoreHorizOutlinedIcon />}
                                 onClose={handleClosemore}
                                 onOpen={() => handleOpenmore(el?.blog_id)}
                                 open={openmore && id === el.blog_id}
                      >
                        {actions.map((action: any) => (
                          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name}
                            onClick={() => {
                              if (action.name === "Copy") {
                                action.action(el?.description);
                              }
                              handleClosemore();
                            }}
                          />
                        ))}
                      </SpeedDial>
                    </Box>
                  }
                  title={el?.title}
                  subheader={moment(el?.updated_at).format("DD-MM-yyyy")}
                />
                <CardMedia component="img" height="194"
                  image="https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" style={{overflowWrap:"break-word",textAlign:"left"}}>
                    {isShow ? el?.description : el?.description.substring(0, truncLength)}{" "}
                    {el?.description.length > truncLength ? (
                      <a onClick={() => {
                          if (isShow) {
                            setShowHide((previous) => !previous);
                          } else {
                            handleClickOpen(el?.blog_id);
                          }
                        }}
                        id="readbtn"
                        style={{ cursor: "pointer" }}
                      >
                        {isShow ? "Read Less" : "Read more"}
                      </a>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <DetailSingleBlog
                    handleClose={handleClose}
                    open={open}
                    data={el}
                    loggedInUser={loggedInUser || "N/A"}
                    commentsData={commentsData}
                    blogId={el?.blog_id}
                    getAllComments={getAllComments}
                  />
                </CardContent>
                <CardActions disableSpacing>
                  <Badge key={el.blog_id} style={{ marginRight:"30px",cursor:"pointer"}} color="primary" badgeContent={
                      localLikes[el.blog_id] !== undefined
                        ? localLikes[el.blog_id]
                        : el.likeCount || 0
                    }>
                    <ThumbUpAltOutlinedIcon onClick={(e) => handleLike(e, el?.blog_id)}/>
                  </Badge>
                  <Badge badgeContent={commentsData?.length} color="primary">
                    <CommentOutlinedIcon />
                  </Badge>
                </CardActions>
              </Card>
            );
          })
        : ""}
      {loading && <p>Loading more blogs...</p>}
      {!hasMore && <p>No more blogs to load.</p>}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
