import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { PiPersonSimpleBikeFill } from "react-icons/pi";
import { DiGitPullRequest } from "react-icons/di";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const loginInfo = useSelector((store) => store.user.loginInfo);

  const { _id } = useSelector((store) => store.user.user);

  const handleHomeClick = () => {
    if (loginInfo?.accountType === "Driver") {
      navigate("/driver-home");
    } else {
      navigate("/pessanger-home");
    }
  };

  const handleReq = () => {
    if (loginInfo?.accountType === "Driver") {
      navigate("/driver-all-req");
    } else {
      navigate("/pessanger-send-req");
    }
  };

  const handleCompleteReq = () => {
    if (loginInfo?.accountType === "Driver") {
      navigate("/driver-accepted-req");
    } else {
      navigate(`/pessanger-complete-ride/${_id}`);
    }
  };
  return (
    <div className="w-full h-14 fixed left-0 bottom-0 p-5 rounded-md flex justify-between items-center bg-[#232121] text-white">
      <div onClick={handleHomeClick} className="hover:bg-black p-2 rounded-lg">
        <GoHomeFill className="text-3xl" />
      </div>
      <div onClick={handleReq} className="hover:bg-black p-2 rounded-lg">
        <PiPersonSimpleBikeFill className="text-3xl" />
      </div>

      {loginInfo?.accountType === "Pessanger" ? (
        <Link to={"/pessanger-complete-ride/" + _id}>
          <div
            onClick={handleCompleteReq}
            className="hover:bg-black p-2 rounded-lg"
          >
            <DiGitPullRequest className="text-3xl" />
          </div>
        </Link>
      ) : (
        <div
          onClick={handleCompleteReq}
          className="hover:bg-black p-2 rounded-lg"
        >
          <DiGitPullRequest className="text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
