import React, { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../Common/Profile";
import Navbar from "../Common/Navbar";
import homeimg from "../../assets/logo/home-page.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PessangerHome = () => {
  const [menu, setMenu] = useState(false);
  const loginInfo = useSelector((store) => store.user.loginInfo);
  const user = useSelector((store) => store.user.user);

  const handleToggel = () => {
    setMenu(!menu);
  };
  return (
    <div className="w-full h-[100%] md:w-1/3 mx-auto relative text-white p-5">
      <div className="flex flex-col gap-5">
        <img
          onClick={handleToggel}
          className="w-10 rounded-full cursor-pointer"
          src={loginInfo?.image}
          alt="user-img"
        />
        <h1 className="text-2xl">
          Hello👋{" "}
          <span className="text-[#FF8000]">
            {loginInfo ? loginInfo?.name : user.name}
          </span>
        </h1>
      </div>

      <div className="mt-4 mb-20">
        <p className="text-lg text-gradient">Start Riding</p>

        <div className="mt-10 border border-[#FF8000] border-opacity-70 p-5 rounded-md">
          <p className="opacity-70 font-thin">
            " Craft your ride, share your vibes! Customize your passenger
            profile for a personalized ride-pooling experience tailored to your
            preferences. "
          </p>
        </div>

        <img className="mt-10 rounded-lg opacity-80" src={homeimg} />

        <Link to={"/pessanger-send-req"}>
          <p className="flex justify-center w-[15rem] gap-x-5 items-center bg-[#FF8000] rounded-full mt-7 p-2">
            Ride Request <FaArrowRightLong />
          </p>
        </Link>
      </div>

      <Navbar />

      {menu && <Profile userInfo={loginInfo} />}
    </div>
  );
};

export default PessangerHome;
