import React from "react";
import sahyatri from "../assets/logo/sahyatri-logo.png";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <img src={sahyatri} alt="app-logo" />

      <div onClick={() => navigate("/start-1")}>
        <button className="bg-[#FF8000] text-white rounded-full text-[0.9rem] md:text-lg px-8 py-2 md:py-2 hover:translate-y-[1px]">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Start;
