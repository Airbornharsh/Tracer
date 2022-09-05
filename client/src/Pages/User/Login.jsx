import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import Context from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const UtilCtx = useContext(Context).util;
  const Ctx = useContext(Context);

  const Navigate = useNavigate();

  const LoginSubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.post("https://mtrace.herokuapp.com/user/login", {
        emailId,
        password,
      });
      window.localStorage.setItem("TracerAccessToken", res.data.accessToken);
      Ctx.setAccessToken(window.localStorage.getItem("TracerAccessToken"));
      UtilCtx.setLoader(false);
      Navigate("/");
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div className="max-w-[28rem] bg-white my-28 rounded-xl shadow-xl relative flex flex-col items-center w-[90vw]">
      <form className="inderFont flex flex-col px-[4rem] py-6  items-center ">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Email Id</label>
            <input
              type="Email"
              className="w-[80vw] max-w-[20rem] h-10 bg-Color2 p-1 px-2"
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
              className=" h-10 bg-Color2 p-1 px-2 w-[80vw] max-w-[20rem]"
              placeholder="Write Your Amount Here ..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={LoginSubmit}
        >
          Login
        </button>
      </form>
      <Link to="/user/register" className="pb-6">
        Register Instead
      </Link>
    </div>
  );
};

export default Login;
