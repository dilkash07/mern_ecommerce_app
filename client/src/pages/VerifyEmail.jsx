import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Otptimer } from "otp-timer-ts";
import { RxCountdownTimer } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/AuthAPI";
import Header from "../components/core/Header";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const { signupData, loading } = useSelector((state) => state.auth);

  const handleVerifyAndSignup = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const handleResend = () => {
    dispatch(sendOtp(signupData.email));
  };
  return (
    <div className="h-screen min-h-[calc(100vh-3.5rem)] flex justify-center mt-16">
      <Header />
      {loading ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <div>
            <h1 className="font-semibold text-[1.875rem] leading-[2.375rem]">
              Verify Email
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-5 ">
              Enter the code we just send on your email {signupData.email}
            </p>
          </div>
          <div className="mt-24">
            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-orange-200 rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-orange-600"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full bg-orange-600 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white"
              >
                Verify Email
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/signup">
                <p className=" flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>
              <div className="flex items-center gap-x-2">
                <RxCountdownTimer size={16} />
                <Otptimer
                  seconds={60}
                  minutes={0}
                  onResend={handleResend}
                  textStyle={{ fontSize: "16px" }}
                  buttonStyle={{ fontSize: "16px" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
