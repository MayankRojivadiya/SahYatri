import React from "react";
import Navbar from "../Common/Navbar";

const AcceptReq = () => {
  return (
    <div className="w-full h-screen md:w-1/3 mx-auto text-white p-5">
      Accepted Reqests
      <p className="flex h-[80%] justify-center items-center text-lg bg-black rounded-md">
        Accept Reqest Not Found
      </p>
      <Navbar />
    </div>
  );
};

export default AcceptReq;
