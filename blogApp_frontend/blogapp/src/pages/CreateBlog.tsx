import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "../redux/store";
import BlogNetworkservice from "../redux/blogredux/blog.networkservice";
import BlogActions from "../redux/blogredux/blog.actions";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  open?: any;
  setOpen?: any;
  editData?: any;
  setEditData?: any;
  getblogs?: any;
  offset?: any;
  searchquery?: any;
}

const CreateBlog: React.FC<Props> = ({
  open,
  setOpen,
  editData,
  setEditData,
  getblogs,
  offset,
  searchquery,
}) => {
  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = React.useState({
    title: "",
    description: "",
    status: "",
  });

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const editfn = () => {
    setUserInput({
      ...userInput,
      title: editData?.title,
      description: editData?.description,
      status: editData?.status,
    });
  };

  React.useEffect(() => {
    editfn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const handleSubmit = (values: any) => {
    
    if (!editData?.blog_id) {
      const data = {
        title: values.title.trim(),
        description: values.description,
        status: values.status,
      };
      dispatch(BlogActions.createBlog(data))
        .then((res: any) => {
          getblogs(offset, searchquery);
          if (res?.status === 200) {
            toast.success("Blog Created");
          } else {
            alert(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }

    if (editData?.blog_id) {
      const data = {
        title: values.title.trim(),
        description: values.description,
        status: values.status,
      };
      BlogNetworkservice.editBlog(data, editData?.blog_id)
        .then((res) => {
          getblogs(offset, searchquery);

          if (res?.status === 200) {
            alert(res?.data?.message);
          } else {
            alert(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("error in dispatch CreateBlog file", err);
        })
        .finally(() => {});
    }
  };

  const handleChange = (event: any) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const values: any = Object.fromEntries(formData.entries());
            console.log("values", values);
            handleSubmit(values);
            setUserInput(values);
            handleClose();
          },
        }}
      >
        <DialogTitle>
          {editData?.blog_id ? "Edit" : "Create"}
          Blog
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Blog Title"
            type="text"
            fullWidth
            variant="standard"
            value={userInput?.title}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Blog Description"
            type="text"
            fullWidth
            variant="standard"
            value={userInput?.description}
            onChange={handleChange}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Blog Status</InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="status"
                name="status"
                value={userInput?.status}
                label="Blog Status"
                onChange={handleChange}
              >
                <MenuItem value={"published"}>Published</MenuItem>
                <MenuItem value={"draft"}>Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBlog;
