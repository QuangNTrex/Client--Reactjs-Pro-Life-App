import { configureStore } from "@reduxjs/toolkit";
import BillReduce from "./bill";
import LendReduce from "./lend";
import TaskReduce from "./task";
import DataReduce from "./data";

const store = configureStore({
  reducer: {
    bill: BillReduce,
    lend: LendReduce,
    task: TaskReduce,
    data: DataReduce,
  },
});

export default store;
