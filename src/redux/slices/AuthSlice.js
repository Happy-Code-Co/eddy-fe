import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    role: {},
  },
  reducers: {
    setAccountInfo: (state, action) => {
      const { id, first_name, last_name, email, role } = action.payload;

      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.role = { ...role };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccountInfo } = AuthSlice.actions;

export default AuthSlice.reducer;
