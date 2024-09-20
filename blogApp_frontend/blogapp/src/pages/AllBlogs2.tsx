import * as React from "react";
import { styled } from "styled-components";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import {Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DetailSingleBlog from "./DetailSingleBlog";
import { useAppDispatch } from "../redux/store";
import BlogActions from "../redux/blogredux/blog.actions";
import { useSelector } from "react-redux";

interface Props {
  data: any;
  loggedInUser: string;
}

const RecipeReviewCard: React.FC<Props> = ({ data, loggedInUser }) => {
  const [isShow, setShowHide] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [blogId, setBlogId] = React.useState("");
  const [commentsData, setCommentsData] = React.useState([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const truncLength = 100;
  const LikeCount = useSelector((store: any) => store.blogreducer.data.likes);

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

  // const handleLike = (e:any)=>{
  //   e.preventDefault()
  //   dispatch(BlogActions.AddLike({blog_id:blogId}))
  //    .then((res:any)=>{
  //     // console.log("Likes",res)
  //    })
  //    .catch((err:any)=>{
  //     return err
  //    })
  //    .finally(()=>{})
  // }

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setBlogId(id);
    getAllComments(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("LikeCount",LikeCount?.data?.Likecount)

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "4px",
        overflow: "hidden",
        maxWidth: "345px",
        width:"345px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
      }}
      
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://st2.depositphotos.com/1350793/9161/i/450/depositphotos_91612518-stock-photo-blog-concept-with-man-holding.jpg"
        title="green iguana"
      />
      <CardContent style={{ padding: "0px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            style={{ fontSize: "24px", fontWeight: "bold" }}
            variant="h5"
            component="div"
          >
            {data?.title}
          </Typography>
          <Typography
            style={{ fontSize: "16px", color: "gray" }}
            variant="h5"
            component="div"
          >
            {moment(data?.created_at).format("yyyy-MM-DD")}
          </Typography>
        </Box>
        <Typography
          style={{
            fontSize: "12px",
            color: "gray",
            textAlign: "left",
            marginBottom: "10px",
          }}
          variant="body2"
          component="div"
        >
          {data?.userObject?.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          style={{ overflowWrap: "break-word", textAlign: "left" }}
        >
          {isShow
            ? data?.description 
            : data?.description.substring(0, truncLength)}{" "}
          {data?.description.length > truncLength ? (
            <a
              onClick={() => {
                if (isShow) {
                  setShowHide((previous) => !previous);
                } else {
                  handleClickOpen(data?.blog_id);
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
          data={data}
          loggedInUser={loggedInUser}
          commentsData={commentsData}
          blogId={blogId}
          getAllComments={getAllComments}
        />
      </CardContent>
      {/* <CardActions disableSpacing>
      <Badge badgeContent={LikeCount?.data?.Likecount} color="primary" style={{ marginRight: '30px' }}>
          <ThumbUpAltOutlinedIcon onClick={handleLike}/>
        </Badge>
        {" "}
        <Badge badgeContent={commentsData.length} color="primary">
          <CommentOutlinedIcon onClick={()=>redirectCommentSection(data?.blog_id)}/>
        </Badge>
      </CardActions> */}

      {/* <Box sx={{ display: 'flex', alignItems: 'flex-end',gap:"10px" }}>
        <UserAvatar name={loggedInUser}/>
        <TextField id="input-with-sx" label="Add a comment..." variant="standard" />
      </Box> */}
    </Card>
  );
};

export default RecipeReviewCard;

export const wrapbox = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  /* box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); */
  overflow: hidden;
  max-width: 345px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
