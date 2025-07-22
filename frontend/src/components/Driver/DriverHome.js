import React, { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../Common/Profile";
import Navbar from "../Common/Navbar";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import homeimg from "../../assets/logo/driver-home-img.png";

const DriverHome = () => {
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
        />
        <h1 className="text-2xl">
          Hello👋{" "}
          <span className="text-[#FF8000]">
            {loginInfo ? loginInfo?.name : user.name}
          </span>
        </h1>
      </div>

      <div className="mt-4 mb-20">
        <p className="text-lg text-gradient">Start Driving</p>

        <div className="mt-10 border border-[#FF8000] border-opacity-70 p-5 rounded-md">
          <p className="opacity-70 font-thin">
            " Welcome, Driver! Enhance your ride-sharing experience by setting
            up your personalized driver profile. Share details about your
            vehicle, preferred music, and any unique features. Optimize your
            driving preferences, such as conversation style and temperature
            settings, to create a comfortable journey for both you and your
            passengers. Let's make every ride enjoyable and tailored to your
            preferences! "
          </p>
        </div>

        <img className="mt-10 rounded-lg opacity-80" src={homeimg} />

        <Link to={"/driver-all-req"}>
          <p className="flex justify-center w-[15rem] gap-x-5 items-center bg-[#FF8000] rounded-full mt-7 p-2">
            Accept Request <FaArrowRightLong />
          </p>
        </Link>
      </div>

      <Navbar />
      {menu && <Profile userInfo={loginInfo} />}
    </div>
  );
};

export default DriverHome;
