import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import "./TaskCard.css";
import TaskModel from "../TasksSection/TaskModel";
import ViewTaskModel from "../TasksSection/ViewTaskModel";

const TaskCard = ({ task, setActiveCard, taskApi, handleClickOpenForm }) => {
  const { title, description, createdAt } = task;
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const deleteTask = async () => {
    try {
      const deleteCard = await axios.delete(
        `https://task-management-backend-btge.onrender.com/api/task/${task._id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(deleteCard);
      if (deleteCard.data.success) {
        taskApi();
        alert("Card deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section
        draggable
        id={task._id}
        onDragStart={() => setActiveCard(task._id)}
        onDragEnd={() => setActiveCard(null)}
        className="task_card"
      >
        <Card style={{ backgroundColor: "lightblue" }}>
          <CardHeader title={title} />
          <CardContent>
            <Typography variant="subtitle1">{description}</Typography>
            <Typography variant="caption">{`Created At: ${dayjs(
              createdAt
            ).format("DD/MM/YYYY, HH:MM:ss")}`}</Typography>
          </CardContent>
          <CardActions style={{ float: "right" }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={deleteTask}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={() => setEditModal(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => setViewModal(true)}
            >
              View Details
            </Button>
          </CardActions>
        </Card>
      </section>
      {editModal && (
        <TaskModel
          open={editModal}
          handleClose={() => {
            setEditModal(false);
            taskApi();
          }}
          task={task}
        />
      )}
      {viewModal && (
        <ViewTaskModel
          open={viewModal}
          handleClose={() => {
            setViewModal(false);
            taskApi();
          }}
          task={task}
        />
      )}
    </>
  );
};

export default TaskCard;
