import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";

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

  const validateForm = () => {
    return password === confirmPassword && emailId && name;
  };

  const RegisterSubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.post(
        `${window.localStorage.getItem("Tracer-Backend-URI")}/user/register`,
        {
          name,
          emailId,
          password,
        }
      );
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
        `${window.localStorage.getItem(
          "Tracer-Backend-URI"
        )}/user/registerotpverify`,
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
      <form className="inderFont flex flex-col px-[4rem] max500:px-[1rem] py-6  items-center">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-slate-700">Name</label>
            <input
              className=" h-10 bg-slate-200 p-1 px-2 w-[80vw] max-w-[20rem] text-[0.9rem]"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-slate-700">Email Id</label>
            <input
              type="Email"
              className=" h-10 bg-slate-200 p-1 px-2 w-[80vw] max-w-[20rem] text-[0.9rem]"
              placeholder="Enter Your EmailId"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-slate-700">Password</label>
            <input
              type="Password"
              className="text-[0.9rem] w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-slate-700">Confirm Password</label>
            <input
              type="text"
              className="text-[0.9rem] w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-slate-700 text-slate-200  rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={RegisterSubmit}
          disabled={!validateForm()}
        >
          Register
        </button>
      </form>
    );
  };

  const verifyingCode = () => {
    return (
      <form className="inderFont flex flex-col px-[4rem] max500:px-[1rem] py-6  items-center">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-slate-700">Code</label>
            <input
              className="text-[0.9rem] w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2"
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
          className="bg-slate-700 text-slate-200  rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={VerifySubmit}
        >
          Verify Code
        </button>
      </form>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[25rem] w-[90vw] bg-white rounded-xl shadow-xl relative flex flex-col items-center">
        {!isCodeSent ? sendingCode() : verifyingCode()}
        <Link to="/user/login" className="pb-5">
          Login Instead
        </Link>
      </div>
    </div>
  );
};

export default Register;
