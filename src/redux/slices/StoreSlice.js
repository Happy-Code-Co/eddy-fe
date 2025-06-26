import { createSlice } from "@reduxjs/toolkit";

export const StoreSlice = createSlice({
  name: "StoreSlice",
  initialState: {
    id: null,
    name: null,
    favico: null,
    logo_desktop: null,
    logo_mobile: null,
    /* created_at: null,
    updated_at: null, */
  },
  reducers: {
    setStoreInfo: (state, action) => {
      const { id, name, favico, logo_desktop, logo_mobile } =
        action.payload.store;

      state.id = id;
      state.name = name;
      state.favico = favico;
      state.logo_desktop = logo_desktop;
      state.logo_mobile = logo_mobile;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStoreInfo } = StoreSlice.actions;

export default StoreSlice.reducer;
