import React from "react";
import styles from "../styles/Todo.module.css";
import TodoForm from "@/components/TodoForm";
import TodoLists from "@/components/TodoLists";

const TodoPage = () => {
  //   const [tasks, setTasks] = useState({});
  return (
    <main
      className={`${styles.todoContainer} d-flex justify-content-center align-items-center `}
    >
      <div className={`${styles.heroSection} px-4`}>
        <h3 className="fw-bold text-center mt-4">MY TODO</h3>
        <div>
          <TodoForm />
          <TodoLists />
        </div>
      </div>
    </main>
  );
};

export default TodoPage;
