import React, { useState } from "react";
import { useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user.userData);
  const logUserNumber = useSelector((store) => store.user.logUserNumber);
  const isLogin = useSelector((store) => store.user.isLogin);

  // useEffect(() => {
  //   if (!userData || !logUserNumber) {
  //     navigate("/signup");
  //   }
  // }, []);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("otp ", otp);

    !isLogin
      ? dispatch(
          signUp(
            userData?.name,
            userData?.mobileNumber,
            userData?.email,
            userData?.vehicleNumber,
            userData?.drivingLicence,
            userData?.accountType,
            userData?.photo,
            userData?.photoId,
            Number(otp),
            navigate
          )
        )
      : dispatch(login(Number(logUserNumber), Number(otp), navigate));
  };

  return (
    <div className="flex md:bg-black flex-col justify-between md:w-1/3 md:mx-auto text-white p-5 md:gap-y-4 gap-y-8">
      <div className="text-xl md:text-2xl p-2 md:p-0">
        <h1>What’s the code ?</h1>
        <p>
          Enter the 6-digit code we just sent to +91{" "}
          {isLogin ? logUserNumber : userData?.mobileNumber}{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-[45px] md:w-[50px] border border-[#FF8000] border-opacity-50 bg-[#171515] text-white text-center rounded-lg aspect-square outline-none"
            />
          )}
          containerStyle={{
            justifyContent: "space-between",
            gap: "0 6px",
          }}
        />

        <button
          type="submit"
          className="bg-[#FF8000] text-white rounded-full text-[0.9rem] md:text-lg px-16 py-2 mt-5 md:mt-6 w-full md:py-1"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
