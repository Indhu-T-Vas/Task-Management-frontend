import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import { Search } from "@mui/icons-material";
import TasksSection from "./TasksSection/TasksSection";
import TaskModel from "./TasksSection/TaskModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${userInfo.token}`,
    "Content-Type": "application/json",
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const taskApi = async () => {
    try {
      console.log(99, userInfo);
      const taskData = await axios.get(
        `http://localhost:4500/api/task/${userInfo._id}`,
        { headers }
      );

      if (taskData.data.success) {
        setTasks(taskData.data.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    taskApi();
  };
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <AssignmentSharpIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Button
                color="error"
                variant="contained"
                sx={{}}
                onClick={logout}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ m: 2 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickOpenForm}
          >
            Add Task
          </Button>
        </Box>
        {/* <Box
        height={30}
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid grey",
          borderRadius: 2,
          p: 3,
          ml: 2,
          mr: 2,
          boxShadow: 2,
        }}
      ></Box> */}

        <TasksSection tasks={tasks} taskApi={taskApi} />
      </Box>
      {openForm && <TaskModel open={openForm} handleClose={handleCloseForm} />}
    </>
  );
};

export default Dashboard;
