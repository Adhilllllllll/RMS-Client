import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import availabilityReducer from "../features/availability/availabilitySlice";
import adminReducer from "../features/admin/adminSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    availability: availabilityReducer,
    admin: adminReducer,
  },
});

export default store;
