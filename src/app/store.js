import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import availabilityReducer from "../features/availability/availabilitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    availability: availabilityReducer,
  },
});

export default store;
