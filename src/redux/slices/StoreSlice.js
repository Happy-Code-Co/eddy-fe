import { createSlice } from "@reduxjs/toolkit";

export const StoreSlice = createSlice({
  name: "StoreSlice",
  initialState: {
    id: null,
    name: null,
    favico: null,
    logo_desktop: null,
    logo_mobile: null,
    pages: [],
    selectedPage: null,
    deleteModalVisible: false,
    deletingPageId: null,
    addSectionModalVisible: false,
    // Add more modal/section state as needed
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
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    addPage: (state, action) => {
      state.pages.push(action.payload);
    },
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setDeleteModalVisible: (state, action) => {
      state.deleteModalVisible = action.payload;
    },
    setDeletingPageId: (state, action) => {
      state.deletingPageId = action.payload;
    },
    setAddSectionModalVisible: (state, action) => {
      state.addSectionModalVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStoreInfo,
  setPages,
  addPage,
  setSelectedPage,
  setDeleteModalVisible,
  setDeletingPageId,
  setAddSectionModalVisible,
} = StoreSlice.actions;

export default StoreSlice.reducer;
