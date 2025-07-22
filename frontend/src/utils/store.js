import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import rideRequestSlice from "./rideRequestSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    rideRequest: rideRequestSlice,
  },
});

export default appStore;
