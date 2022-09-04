import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const UtilCtx = useContext(Context).util;

  const Navigate = useNavigate();

  const RegisterSubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.post("http://localhost:4000/user/register", {
        name,
        emailId,
        password,
      });
      setAccessToken(res.data.accessToken);
      setIsCodeSent(true);
      UtilCtx.setLoader(false);
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  const VerifySubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/user/registerotpverify",
        {
          accessToken,
          otp,
        }
      );
      console.log(res);
      UtilCtx.setLoader(false);
      Navigate("/user/login");
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };
  const sendingCode = () => {
    return (
      <form className="inderFont flex flex-col px-[4rem] py-12  items-center">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Name</label>
            <input
              className="w-[20rem] h-10 bg-Color2 p-1 px-2"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Email Id</label>
            <input
              type="Email"
              className="w-[20rem] h-10 bg-Color2 p-1 px-2"
              placeholder="Enter Your EmailId"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Password</label>
            <input
              type="Password"
              className="w-[20rem] h-10 bg-Color2 p-1 px-2"
              placeholder="OldPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Confirm Password</label>
            <input
              type="text"
              className="w-[20rem] h-10 bg-Color2 p-1 px-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={RegisterSubmit}
        >
          Register
        </button>
      </form>
    );
  };

  const verifyingCode = () => {
    return (
      <form className="inderFont flex flex-col px-[4rem] py-12  items-center">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Name</label>
            <input
              className="w-[20rem] h-10 bg-Color2 p-1 px-2"
              type="number"
              placeholder="Type Your Otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={VerifySubmit}
        >
          Verify Code
        </button>
      </form>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-7rem)]">
      <div className="w-[28rem] bg-white mb-28 rounded-xl shadow-xl relative ">
        {!isCodeSent ? sendingCode() : verifyingCode()}
      </div>
    </div>
  );
};

export default Register;
