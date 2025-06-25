import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {},
  reducers: {
    setAccountInfo: (state, payload) => {
      state = { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccountInfo } = AuthSlice.actions;

export default AuthSlice.reducer;
