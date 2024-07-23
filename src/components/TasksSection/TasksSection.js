import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TasksList from "../TasksList/TasksList";

const TasksSection = ({ tasks, taskApi }) => {
  const [activeCard, setActiveCard] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const editApi = async (id, data) => {
    try {
      const response = await axios.put(
        `https://task-management-backend-btge.onrender.com/api/task/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        console.log(111, response.data);
        taskApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    taskApi();
  }, []);

  console.log(22, tasks);

  const onDrop = (status) => {
    console.log(44, activeCard, status);

    if (activeCard === null) return;

    editApi(activeCard, { status });
  };

  return (
    <Box sx={{ m: 2 }}>
      {activeCard}
      <Grid container spacing={2} direction="row" sx={{ flexGrow: 1 }}>
        <TasksList
          tasks={tasks}
          title="TODO"
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          taskApi={taskApi}
        />
        <TasksList
          tasks={tasks}
          title="InProgress"
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          taskApi={taskApi}
        />
        <TasksList
          tasks={tasks}
          title="Done"
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          taskApi={taskApi}
        />
      </Grid>
    </Box>
  );
};

export default TasksSection;
