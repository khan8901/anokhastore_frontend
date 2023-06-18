import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./slices/RegSlice";
import loginSlice from "./slices/loginSlice";
const store = configureStore({
  reducer: {
    register: registerSlice,
    loginreducer: loginSlice,
  },
});

export default store;
