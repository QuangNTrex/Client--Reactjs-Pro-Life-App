import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lends: JSON.parse(localStorage.getItem("lends")) || [],
};

const LendSlice = createSlice({
  name: "lend",
  initialState,
  reducers: {
    addLend: (state, action) => {
      const lend = {
        fullName: action.payload.fullName,
        title: action.payload.title,
        estimateDate: action.payload.estimateDate,
        pay: false,
        totalPrice: 0,
        amounts: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.lends = [lend, ...state.lends];

      localStorage.setItem("lends", JSON.stringify(state.lends));
    },
    updateLend: (state, action) => {
      const lendId = action.payload.lendId;
      const lend = action.payload.lend;
      for (let i = 0; i < state.lends.length; i++) {
        if (state.lends[i].createdAt.toString() === lendId.toString()) {
          state.lends[i] = { ...state.lends[i], ...lend };
          state.lends[i].updatedAt = Date.now();
        }
      }

      localStorage.setItem("lends", JSON.stringify(state.lends));
    },
    addAmount: (state, action) => {
      const lendId = action.payload.lendId;
      const amount = {
        money: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        title: "",
        estimateDate: NaN,
      };
      for (let i = 0; i < state.lends.length; i++) {
        if (state.lends[i].createdAt.toString() === lendId) {
          state.lends[i].amounts = [amount, ...state.lends[i].amounts];

          state.lends[i].updatedAt = Date.now();
        }
      }
      localStorage.setItem("lends", JSON.stringify(state.lends));
    },
    updateAmount: (state, action) => {
      const lendId = action.payload.lendId;
      const amountId = action.payload.amountId;
      const amount = action.payload.amount; // {ajdasd: asjdnasjdn}

      for (let i = 0; i < state.lends.length; i++) {
        if (lendId === state.lends[i].createdAt.toString())
          for (let j = 0; j < state.lends[i].amounts.length; j++) {
            if (state.lends[i].amounts[j].createdAt.toString() === amountId) {
              state.lends[i].amounts[j] = {
                ...state.lends[i].amounts[j],
                ...amount,
              };
              const totalPrice = state.lends[i].amounts.reduce((total, e) => {
                return total + e.money;
              }, 0);
              state.lends[i].totalPrice = totalPrice;
              state.lends[i].amounts[j].updatedAt = Date.now();
              state.lends[i].updatedAt = Date.now();
            }
          }
      }
      localStorage.setItem("lends", JSON.stringify(state.lends));
    },
    deleteAmount: (state, action) => {
      const lendId = action.payload.lendId;
      const amountId = action.payload.amountId;

      for (let i = 0; i < state.lends.length; i++) {
        if (lendId === state.lends[i].createdAt.toString()) {
          state.lends[i].amounts = state.lends[i].amounts.filter(
            (e) => e.createdAt.toString() !== amountId.toString()
          );
          state.lends[i].updatedAt = Date.now();
        }
      }

      localStorage.setItem("lends", JSON.stringify(state.lends));
    },
  },
});

export default LendSlice.reducer;
export const LendActions = LendSlice.actions;
