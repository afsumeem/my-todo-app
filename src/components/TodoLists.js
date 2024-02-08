import {
  deleteTask,
  toggleTaskCompletion,
} from "@/redux/features/tasks/taskSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TodoLists = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const handleTaskCompletionToggle = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };
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

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{ border: `1px solid ${getPriorityColor(task.priority)}` }}
          className="m-2 p-2"
        >
          <li>{task.title}</li>

          <button
            onClick={() => handleTaskCompletionToggle(task.id)}
            disabled={task.isCompleted}
          >
            {task.isCompleted ? "Completed" : "Not Completed"}
          </button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete task</button>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
