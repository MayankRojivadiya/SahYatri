import { createSlice } from "@reduxjs/toolkit";

const rideRequestSlice = createSlice({
  name: "rideRequest",
  initialState: {
    rides: [],
  },
  reducers: {
    setRides: (state, action) => {
      state.rides.push(action.payload);
    },
  },
});

export default rideRequestSlice.reducer;
export const { setRides } = rideRequestSlice.actions;
