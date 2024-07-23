import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

const ViewTaskModel = ({
  setOpenForm,
  open,
  handleClose,
  task,
  tasks,
  setTask,
  formData,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4500/api/task/${task._id}`,

        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(55, response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const data = formJson.data;
              console.log(14, data);
            },
          }}
        >
          <DialogTitle>Task Details</DialogTitle>
          <DialogContent>
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              size="small"
              value={task.title}
              fullWidth
              type="text"
              style={{ marginBottom: 20, marginTop: 10 }}
            />

            <TextField
              id="description"
              name="description"
              label="description"
              variant="outlined"
              size="small"
              value={task.description}
              fullWidth
              type="text"
              style={{ marginBottom: 20 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default ViewTaskModel;
