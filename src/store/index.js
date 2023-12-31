import { configureStore } from "@reduxjs/toolkit";
// import BillReduce from "./bill";
// import LendReduce from "./lend";
// import TaskReduce from "./task";
import DataReduce from "./data";
import AuthReduce from "./auth";
import SystemReduce from "./system";

const store = configureStore({
  reducer: {
    // bill: BillReduce,
    // lend: LendReduce,
    // task: TaskReduce,
    data: DataReduce,
    auth: AuthReduce,
    system: SystemReduce,
  },
});

export default store;
