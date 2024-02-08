import React from "react";
// import styles from "../styles/Todo.module.css";
import TodoForm from "@/components/TodoForm";
import TodoLists from "@/components/TodoLists";

const TodoPage = () => {
  //   const [tasks, setTasks] = useState({});
  return (
    <div>
      <h2>My ToDo App</h2>
      <div>
        <TodoForm />
        <TodoLists />
      </div>
    </div>
  );
};

export default TodoPage;
