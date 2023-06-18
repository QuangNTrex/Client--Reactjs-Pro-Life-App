import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: JSON.parse(localStorage.getItem("bills")) || [],
};

const saveBillsToLocal = (bills) => {
  localStorage.setItem("bills", JSON.stringify(bills));
};

const BillSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    createBill: (state, action) => {
      const bill = {
        updatedAt: Date.now(),
        title: action.payload.title,
        totalPrice: 0,
        createdAt: Date.now(),
        pay: false,
        products: [],
      };

      state.bills = [bill, ...state.bills];
      saveBillsToLocal(state.bills);
    },
    updateBill: (state, action) => {
      const billId = action.payload.id;
      const bill = action.payload.bill;
      for (let i = 0; i < state.bills.length; i++) {
        if (state.bills[i].createdAt.toString() === billId.toString()) {
          state.bills[i] = { ...state.bills[i], ...bill };
        }
      }
      saveBillsToLocal(state.bills);
    },
    addProduct: (state, action) => {
      const billId = action.payload.id;
      const product = {
        title: action.payload.title,
        price: undefined,
        quantity: undefined,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      };

      for (let i = 0; i < state.bills.length; i++) {
        if (state.bills[i].createdAt.toString() === billId.toString()) {
          state.bills[i].products = [product, ...state.bills[i].products];
        }
      }
      saveBillsToLocal(state.bills);
    },
    updateProduct: (state, action) => {
      const billId = action.payload.id;
      const indexProduct = action.payload.indexProduct;
      for (let i = 0; i < state.bills.length; i++) {
        if (state.bills[i].createdAt.toString() === billId.toString()) {
          state.bills[i].products[indexProduct] = {
            ...state.bills[i].products[indexProduct],
            ...action.payload.product,
          };

          let totalPrice = 0;
          for (let j = 0; j < state.bills[i].products.length; j++) {
            const product = state.bills[i].products[j];

            if (!product.price || !product.quantity) continue;
            totalPrice += product.price * product.quantity;
          }

          state.bills[i].totalPrice = totalPrice;
        }
      }
      saveBillsToLocal(state.bills);
    },
  },
});

export default BillSlice.reducer;
export const BillActions = BillSlice.actions;
