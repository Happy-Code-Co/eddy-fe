import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/AuthSlice";
import StoreSlice from "./slices/StoreSlice";

export default configureStore({
  reducer: {
    auth: AuthSlice,
    store: StoreSlice,
  },
});
