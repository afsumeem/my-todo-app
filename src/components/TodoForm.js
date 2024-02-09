import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
// import styles from "../styles/TodoForm.module.css";
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
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={value}
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TodoForm;
