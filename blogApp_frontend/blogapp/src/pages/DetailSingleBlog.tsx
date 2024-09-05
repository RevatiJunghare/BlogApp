import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {Badge,Box,Card,CardActionArea,CardActions,CardContent,CardMedia,Typography} from "@mui/material";
import UserAvatar from "./Avatar";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import moment from "moment";
import "./DetailSingleBlog.css";
import { useAppDispatch, useAppSelector } from "../redux/store";
import BlogActions from "../redux/blogredux/blog.actions";
import { useSelector } from "react-redux";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

interface Props {
  handleClose: any;
  open: any;
  data: any;
  loggedInUser: any;
  commentsData: any;
  blogId: any;
  getAllComments:any
}

const DetailSingleBlog: React.FC<Props>=({handleClose,open,data,loggedInUser,commentsData,blogId,getAllComments}) => {
  const [userComment,setUserComment] = React.useState({
    comment:""
  })
  const dispatch = useAppDispatch();
  const LikeCount = useAppSelector((store:any)=>store?.blogreducer?.data?.likes)

  const handleChange = (e:any)=>{
    const {name,value} = e.target
    setUserComment((prev:any)=>({
       ...prev,
       [name]:value
    }))
  }

  const handleLike = (e:any)=>{
    e.preventDefault()
    dispatch(BlogActions.AddLike({blog_id:blogId}))
     .then((res:any)=>{
     })
     .catch((err:any)=>{
      return err
     })
     .finally(()=>{})
  }

  // console.log("LikeCount",LikeCount?.data?.Likecount)

  const handleSubmit = (e:any)=>{
     e.preventDefault()
     dispatch(BlogActions.PostComment({ id: blogId, data: userComment }))
      .then((res:any)=>{
        getAllComments(blogId)
        setUserComment({ comment: "" })
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{})
  }
  

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md" 
        fullWidth={true} 
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
          sx: {
            width: "80%", 
            maxWidth: "800px", 
          },
        }}
      >
        <DialogActions sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
          <DialogTitle sx={{ m: 0, p:0 ,fontSize:"32px"}}>{data?.title}</DialogTitle>
          <CloseSharpIcon onClick={handleClose}/>
        </DialogActions>
        <Card sx={{backgroundColor: "#fff",color: "rgba(0, 0, 0, 0.87)",transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",borderRadius: "4px",overflow: "hidden",height: "300px", display: "flex",flexDirection: "row",justifyContent: "space-between",padding: "10px",gap: "10px"}}>
          <Box sx={{width: "50%",height: "100%",display: "flex",alignItems: "center",justifyContent: "center",overflow: "hidden"}}>
            <CardMedia component="img"sx={{ width: "100%", height: "auto", objectFit: "cover" }} 
              image="https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg"
              title="green iguana"/>
          </Box>
          <Box sx={{width: "50%",display: "flex",flexDirection: "column",overflow: "hidden"}}>
            <Box sx={{ flexGrow: 1, overflowY: "auto", paddingRight: "10px" }}>
              <CardContent style={{ paddingBottom: "5px" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {data?.userObject?.name}
                </Typography>
                <Typography gutterBottom variant="body2" component="div" sx={{ paddingBottom: "10px" }}>
                  {moment(data?.created_at).format("yyyy-MM-DD")}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ overflowWrap: "break-word" }}>
                  {data?.description}
                </Typography>
              </CardContent>

              <CardActions disableSpacing
                sx={{paddingTop: "20px",
                  position: "relative",
                  "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgba(0, 0, 0, 0.12)", 
                  },
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgba(0, 0, 0, 0.12)", 
                  },
                }}
              >
                <Badge badgeContent={LikeCount?.data?.Likecount} color="primary" style={{ marginRight: "30px" }}>
                  <ThumbUpAltOutlinedIcon onClick={handleLike}/>
                </Badge>{" "}
                <Badge badgeContent={commentsData?.length} color="primary">
                  <CommentOutlinedIcon />
                </Badge>
              </CardActions>
              <Box sx={{display: "flex",alignItems: "flex-end",gap: "10px",padding: "10px 0",
                  position: "relative",
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgba(0, 0, 0, 0.12)", 
                  },
                }}>
                <UserAvatar name={loggedInUser} />
                <TextField id="input-with-sx" label="Add a comment..." variant="standard" name="comment" value={userComment.comment} onChange={handleChange} type="text"/>
                <Button type="submit" variant="outlined" color="primary" onClick={handleSubmit} sx={{borderRadius: '50px', 
                                                                                                padding: '10px 30px'}}>
                Send</Button>
              </Box>

              {data?.blog_id === blogId ? (
                <Box>
                  {commentsData.length > 0
                    ? commentsData?.map((comment: any, index: number) => (
                        <Box key={index} sx={{display: "flex",alignItems: "flex-start",gap: "10px",padding: "10px 0"}}>
                          <UserAvatar name={comment?.userObject?.name || ""} />
                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                              <CardContent style={{backgroundColor:"#F5F5F5"}}>
                                <Typography variant="body2" color="text.secondary">
                                   {comment?.comment} 
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Box>
                      ))
                    : "No"}
                </Box>
              ) : (
                ""
              )}

              
            </Box>
          </Box>
        </Card>

      </Dialog>
    </React.Fragment>
  );
};

export default DetailSingleBlog;
