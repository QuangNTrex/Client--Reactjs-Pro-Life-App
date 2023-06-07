import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        title: action.payload.title,
        deadline: action.payload.deadline,
        repeat: action.payload.repeat,
        done: false,
        list: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.tasks = [task, ...state.tasks];

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const taskId = action.payload.taskId;
      const task = action.payload.task;
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].createdAt.toString() === taskId.toString()) {
          state.tasks[i] = { ...state.tasks[i], ...task };
          state.tasks[i].updatedAt = Date.now();
        }
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      const taskId = action.payload.taskId;
      state.tasks = state.tasks.filter(
        (task) => task.createdAt.toString() !== taskId.toString()
      );

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    addListTask: (state, action) => {
      const taskId = action.payload.taskId;
      const item = {
        title: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deadline: NaN,
        done: false,
      };
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].createdAt.toString() == taskId.toString()) {
          state.tasks[i].list = [item, ...state.tasks[i].list];

          state.tasks[i].updatedAt = Date.now();
        }
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateListTask: (state, action) => {
      const taskId = action.payload.taskId;
      const taskItemId = action.payload.taskItemId;
      const item = action.payload.item;

      // console.log(taskId, taskItemId, item);

      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].createdAt.toString() == taskId.toString()) {
          for (let j = 0; j < state.tasks[i].list.length; j++) {
            if (
              state.tasks[i].list[j].createdAt.toString() ==
              taskItemId.toString()
            ) {
              state.tasks[i].list[j] = { ...state.tasks[i].list[j], ...item };
              state.tasks[i].list[j].updatedAt = Date.now();
            }
            const totalDone = state.tasks[i].list.reduce(
              (total, event) => total + event.done,
              0
            );
            state.tasks[i].done = totalDone === state.tasks[i].list.length;
            state.tasks[i].updatedAt = Date.now();
          }
        }
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTaskItem: (state, action) => {
      const taskId = action.payload.taskId;
      const taskItemId = action.payload.taskItemId;

      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].createdAt.toString() == taskId.toString()) {
          state.tasks[i].list = state.tasks[i].list.filter(
            (item) => item.createdAt.toString() !== taskItemId.toString()
          );
        }
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export default TaskSlice.reducer;
export const TaskActions = TaskSlice.actions;
