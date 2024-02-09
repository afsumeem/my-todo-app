import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "@/redux/features/tasks/taskSlice";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/TodoLists.module.css";

//to do list component start

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

  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (value && priority) {
      dispatch(editTask({ id: editTaskId, title: value, priority: priority }));
      handleCancelEdit();
    }
  };

  //filter by priority

  const [selectPriority, setSelectPriority] = useState("");

  const handlePriority = (event) => {
    setSelectPriority(event.target.value);
  };

  const filteredTask = selectPriority
    ? tasks.filter((task) => task.priority === selectPriority)
    : tasks;

  //     const filteredTask = selectPriority === "all"
  //   ? tasks
  //   : tasks.filter((task) => task.priority === selectPriority);

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

  //
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //

  return (
    <div className="mt-4 my-3 ">
      <hr />

      <div className="d-flex  justify-content-between ">
        <h5 className=" fw-bold">Todo Lists</h5>
        <Form.Select
          aria-label="Default select example"
          onChange={handlePriority}
          className={styles.todoListFilterInput}
        >
          <option value="all">Filter by Priority</option>

          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Select>

        {/*  */}
      </div>
      <div className="justify-content-end d-flex gap-3 my-3">
        <p className="m-0 fw-bold">Total tasks: {tasks.length}</p>
        <p className="m-0 fw-bold">Completed tasks: {completedTasks.length}</p>
      </div>

      {filteredTask.map((task) => (
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
