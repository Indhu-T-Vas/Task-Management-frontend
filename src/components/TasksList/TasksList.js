import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import DropArea from "../DropArea/DropArea";

const TasksList = ({ tasks, title, setActiveCard, onDrop, taskApi }) => {
  return (
    <Grid item md={4} key={title}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ backgroundColor: "blue", mb: 2, p: 1, color: "white" }}
        >
          {title}
        </Typography>
        <Stack spacing={2}>
          {tasks
            .filter((task) => task.status === title.toLowerCase())
            .map((item) => {
              return (
                <TaskCard
                  task={item}
                  setActiveCard={setActiveCard}
                  taskApi={taskApi}
                />
              );
            })}
          <DropArea onDrop={() => onDrop(title.toLowerCase())} />
        </Stack>
      </Paper>
    </Grid>
  );
};

export default TasksList;
