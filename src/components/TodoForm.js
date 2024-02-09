import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../styles/TodoForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/redux/features/tasks/taskSlice";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  //

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(value);
    if (value && priority) {
      dispatch(
        addTask({ title: value, priority: priority, isCompleted: false })
      );
      //

      setValue("");
      setPriority("");
    }
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    const updatedTasks = savedTasks
      ? [
          ...savedTasks,
          { title: value, priority: priority, isCompleted: false },
        ]
      : [{ title: value, priority: priority, isCompleted: false }];

    // Update local storage with the updated tasks array
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  //
  //
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    // console.log(savedTasks);
    if (savedTasks) {
      setValue(savedTasks[0]?.title);
      setPriority(savedTasks[0]?.priority);
    }
  }, []);
  return (
    <div className=" p-2 my-3 shadow rounded">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* <Form.Label>Create New Task</Form.Label> */}
          <div className="d-flex gap-4">
            <Form.Control
              type="text"
              placeholder="Create New Task"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <Button className={styles.addTaskBtn} type="submit">
              Add
            </Button>
          </div>
        </Form.Group>

        <div className="mb-2">
          <Form.Check
            className={`${styles.low} text-success fw-bold`}
            inline
            label="Low"
            name="group1"
            type="radio"
            id="inline-radio-1"
            checked={priority === "low"}
            onChange={() => setPriority("low")}
          />
          <Form.Check
            className={`${styles.medium} fw-bold`}
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
            className={`${styles.high} text-danger fw-bold`}
            inline
            label="High"
            name="group1"
            type="radio"
            id="inline-radio-3"
            checked={priority === "high"}
            onChange={() => setPriority("high")}
          />
        </div>
      </Form>
    </div>
  );
};

export default TodoForm;
