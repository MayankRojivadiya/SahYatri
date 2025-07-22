import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendLogOtp } from "../../services/operations/authAPI";
import { setIsLogin, setLogUserNumber } from "../../utils/userSlice";

const Login = () => {
  const [mobileNumber, setMobileNo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login data", mobileNumber);

    dispatch(setLogUserNumber(mobileNumber));
    dispatch(setIsLogin(true));

    dispatch(sendLogOtp(Number(mobileNumber), navigate));
  };

  const handleChange = (e) => {
    setMobileNo(e.target.value);
  };

  return (
    <div className="flex md:bg-black flex-col justify-between md:w-1/3 md:mx-auto text-white p-5 md:gap-y-4 gap-y-8">
      <IoMdArrowBack
        onClick={() => navigate("/choice")}
        className="text-2xl md:text-2xl cursor-pointer"
      />
      <div className="text-xl md:text-2xl p-2 md:p-0">
        <h1>What’s your phone number ?</h1>
        <h2 className="opacity-65 text-sm md:text-xl">
          We’ll text you login code
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-[0.9rem] mt-3 md:text-[1rem]"
      >
        <label>Mobile Number</label>
        <input
          required
          type="number"
          value={mobileNumber}
          onChange={handleChange}
          placeholder="Enter Your Number"
          className="border border-[#FF8000] border-opacity-50 bg-[#171515] text-sm rounded-lg py-3 px-3 mt-1 md:py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-[#FF8000] text-white rounded-full text-[0.9rem] md:text-lg px-16 py-2 mt-10 md:mt-10 w-full md:py-1"
        >
          Send Otp
        </button>
        <p className="text-center text-sm mt-2 sm:text-sm">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-[#FF8000]">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
