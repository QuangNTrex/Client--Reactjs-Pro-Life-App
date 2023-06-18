import { createSlice } from "@reduxjs/toolkit";
import { HTTPPOST } from "../utils/http";

const nameList = {
  bill: "bill",
  lend: "lend",
  task: "task",
  plan: "plan",
};

let timeout = {
  bill: null,
};

const updateFn = {
  bill: (data) => {
    const bills = [...data];
    bills.forEach((bill) => {
      bill.totalPrice = bill.list.reduce((total, item) => {
        if (item.price && item.quantity)
          return total + item.price * item.quantity;
        return total;
      }, 0);
    });

    localStorage.setItem("bills", JSON.stringify(bills));
    return bills;
  },
  lend: (data) => {
    const lends = [...data];
    lends.forEach((lend) => {
      lend.totalPrice = lend.list.reduce((total, e) => {
        return total + e.money || 0;
      }, 0);
    });

    localStorage.setItem("lends", JSON.stringify(lends));
    return lends;
  },
  task: (data) => {
    const tasks = [...data];
    tasks.forEach((task) => {
      const totalDone = task.list.reduce(
        (total, event) => total + event.done,
        0
      );
      task.done = totalDone === task.list.length && totalDone !== 0;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return tasks;
  },
  plan: (data) => {
    const plans = [...data];
    plans.forEach((plan) => {
      const totalDone = plan.list.reduce(
        (total, event) => total + event.done,
        0
      );
      plan.done = totalDone === plan.list.length && totalDone !== 0;
    });
    localStorage.setItem("plans", JSON.stringify(plans));
    return plans;
  },
};
const getInitList = (type, list) => {
  if (nameList.bill === type)
    return {
      title: list.title,
      totalPrice: 0,
      updatedAt: Date.now(),
      createdAt: Date.now(),
      pay: false,
      list: [],
    };
  if (nameList.lend === type)
    return {
      fullName: list.fullName,
      title: list.title,
      estimateDate: list.estimateDate,
      pay: false,
      totalPrice: 0,
      list: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  if (nameList.task === type)
    return {
      title: list.title,
      deadline: list.deadline,
      repeat: list.repeat,
      done: false,
      list: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  if (nameList.plan === type)
    return {
      title: list.title || "",
      startAt: list.startAt || NaN,
      endAt: list.endAt || NaN,
      list: [],
      note: list.note || "",
      done: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

  console.log("has error");
};

const getInitItem = (type) => {
  if (nameList.bill === type)
    return {
      title: "",
      price: "",
      quantity: "",
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };
  if (nameList.lend === type)
    return {
      money: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title: "",
    };
  if (nameList.task === type)
    return {
      title: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deadline: NaN,
      done: false,
    };
  if (nameList.plan === type)
    return {
      title: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      startAt: NaN,
      endAt: NaN,
      note: "",
      done: false,
    };
  console.log("has error");
};

const initialState = {
  bill: JSON.parse(localStorage.getItem("bills")) || [],
  lend: JSON.parse(localStorage.getItem("lends")) || [],
  task: JSON.parse(localStorage.getItem("tasks")) || [],
  plan: JSON.parse(localStorage.getItem("plans")) || [],
};

const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createList: (state, action) => {
      const type = action.payload.type.toLowerCase();
      const list = action.payload.list;
      state[type] = [getInitList(type, list), ...state[type]];
      state[type] = updateFn[type](state[type]);
    },

    updateList: (state, action) => {
      const type = action.payload.type.toLowerCase();
      const listId = action.payload.listId.toString();
      const list = action.payload.list;
      for (let i = 0; i < state[type].length; i++) {
        if (state[type][i].createdAt.toString() === listId) {
          state[type][i] = {
            ...state[type][i],
            ...list,
            updatedAt: Date.now(),
          };
        }
      }
      clearTimeout(timeout[type]);
      console.log("in update");

      timeout[type] = setTimeout(
        ((data) => {
          console.log(data);
          console.log("update!");
          HTTPPOST(`/data/updates`, { data, type })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }).bind(null, JSON.parse(JSON.stringify(state[type]))),
        5000
      );
      // chạy các hàm tính toán liên quan như tổng tiền
      state[type] = updateFn[type]([...state[type]]);
    },

    deleteList: (state, action) => {
      const type = action.payload.type.toLowerCase();
      const listId = action.payload.listId.toString();

      state[type] = state[type].filter(
        (list) => list.createdAt.toString() !== listId
      );
      state[type] = updateFn[type](state[type]);
    },

    createItem: (state, action) => {
      const type = action.payload.type.toLowerCase();
      const listId = action.payload.listId.toString();
      state[type].forEach((e) => {
        if (e.createdAt.toString() === listId)
          e.list = [getInitItem(type), ...e.list];
      });
      state[type] = updateFn[type](state[type]);
    },

    updateItem: (state, action) => {
      const type = action.payload.type.toLowerCase();
      const listId = action.payload.listId.toString();
      const itemId = action.payload.itemId.toString();
      const item = action.payload.item;
      state[type].forEach((e) => {
        if (e.createdAt.toString() === listId) {
          for (let i = 0; i < e.list.length; i++) {
            if (e.list[i].createdAt.toString() === itemId) {
              e.list[i] = { ...e.list[i], ...item, updatedAt: Date.now() };
              e.updatedAt = Date.now();
            }
          }
        }
      });

      // set timeout to sync data
      clearTimeout(timeout[type]);
      console.log("in update");

      timeout[type] = setTimeout(
        ((data) => {
          console.log(data);
          console.log("update!");
          HTTPPOST(`/data/updates`, { data, type })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }).bind(null, JSON.parse(JSON.stringify(state[type]))),
        5000
      );

      state[type] = updateFn[type](state[type]);
    },

    deleteItem: (state, action) => {
      const type = action.payload.type.toLowerCase();
      const listId = action.payload.listId.toString();
      const itemId = action.payload.itemId.toString();

      state[type].forEach((e) => {
        if (e.createdAt.toString() === listId) {
          e.list = e.list.filter(
            (item) => item.createdAt.toString() !== itemId
          );
        }
      });
      state[type] = updateFn[type](state[type]);
    },
  },
});

export default DataSlice.reducer;
export const DataActions = DataSlice.actions;
