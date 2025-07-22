import React from "react";
import { useSelector } from "react-redux";
import DriverHome from "./Driver/DriverHome";
import PessangerHome from "./Pessanger/PessangerHome";

const Home = () => {
  const user = useSelector((store) => store.user.user);
  return (
    <div className="text-white p-5 h-screen">
      {user?.accountType === "Driver" ? <DriverHome /> : <PessangerHome />}
    </div>
  );
};

export default Home;
