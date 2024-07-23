import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

export default function TaskModel({
  open,
  handleClose,
  task,
  tasks,
  setTask,
  setOpenForm,
}) {
  const [formData, setFormData] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
  });

  console.log(77, formData);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (task?._id) {
        response = await axios.put(
          `http://localhost:4500/api/task/${task._id}`,
          { ...formData, user: userInfo._id },
          config
        );
      } else {
        response = await axios.post(
          "http://localhost:4500/api/task/create",
          { ...formData, user: userInfo._id },
          config
        );
      }

      console.log(21, response);

      if (response.data.success) {
        alert(`Task ${task?._id ? "updated" : "created"} successfully`);
        handleClose();
      }
    } catch (error) {
      console.log(404, error);
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
          <DialogTitle>{`${task?._id ? "Update" : "Create"} Task`}</DialogTitle>
          <DialogContent>
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              size="small"
              value={formData.title}
              onChange={handleFormDataChange}
              required
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
              value={formData.description}
              onChange={handleFormDataChange}
              required
              fullWidth
              type="text"
              style={{ marginBottom: 20 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onSubmit={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
