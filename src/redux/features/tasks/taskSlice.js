import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, priority, isCompleted } = action.payload;
      const id =
        state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id + 1 : 1;

      state.tasks.push({
        id,
        title,
        priority,
        isCompleted: isCompleted || false,
      });
    },
    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
      }
    },
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
