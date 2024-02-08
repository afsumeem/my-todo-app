import {
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "@/redux/features/tasks/taskSlice";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const TodoLists = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  //task complete toggle button
  const handleTaskCompletionToggle = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  //edit task
  const [editTaskId, setEditTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setEditTaskId(taskId);
    const selectedTask = tasks.find((task) => task.id === taskId);
    setValue(selectedTask.title);
    setPriority(selectedTask.priority);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setValue("");
    setPriority("");
  };

  //   const handleEditTask = (taskId) => {
  //     dispatch(editTask(taskId));
  //   };

  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (value && priority) {
      dispatch(editTask({ id: editTaskId, title: value, priority: priority }));
      handleCancelEdit();
    }
  };

  //delete task
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
        return "red";
      default:
        return "white";
    }
  };

  //completed tasks
  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  return (
    <div>
      <h2>Total tasks: {tasks.length}</h2>
      <h2>Completed tasks: {completedTasks.length}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{ border: `1px solid ${getPriorityColor(task.priority)}` }}
          className="m-2 p-2"
        >
          <li>{task.title}</li>

          {/*  */}
          {editTaskId === task.id && (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  defaultValue={task.title}
                  onChange={(event) => setValue(event.target.value)}
                />
              </Form.Group>
              <div className="mb-3">
                <Form.Check
                  // className={styles.low}
                  inline
                  label="Low"
                  name="group1"
                  type="radio"
                  id="inline-radio-1"
                  checked={priority === "low"}
                  onChange={() => setPriority("low")}
                />
                <Form.Check
                  // className={styles.medium}
                  //   className="medium"
                  inline
                  label="Medium"
                  name="group1"
                  type="radio"
                  id="inline-radio-2"
                  checked={priority === "medium"}
                  onChange={() => setPriority("medium")}
                />
                <Form.Check
                  // className={styles.high}
                  inline
                  label="High"
                  name="group1"
                  type="radio"
                  id="inline-radio-3"
                  checked={priority === "high"}
                  onChange={() => setPriority("high")}
                />
              </div>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          )}
          {/*  */}

          <button
            onClick={() => handleTaskCompletionToggle(task.id)}
            disabled={task.isCompleted}
          >
            {task.isCompleted ? "Completed" : "Not Completed"}
          </button>

          <button onClick={() => handleEditClick(task.id)}>Edit task</button>
          <button onClick={() => handleCancelEdit()}>Cancel Edit</button>

          <button onClick={() => handleDeleteTask(task.id)}>Delete task</button>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
