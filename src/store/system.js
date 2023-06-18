import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serverUrl: "http://localhost:5000/",
  stateServer: false,
};

const SystemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setStateServer: (state, action) => {
      state.stateServer = action.payload.stateServer || false;
    },
  },
});

export default SystemSlice.reducer;
export const SystemActions = SystemSlice.actions;
