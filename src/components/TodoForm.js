import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import styles from "../styles/TodoForm.module.css";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/features/tasks/taskSlice";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(value);
    if (value && priority) {
      dispatch(
        addTask({ title: value, priority: priority, isCompleted: false })
      );
      setValue("");
      setPriority("");
    }
  };
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
