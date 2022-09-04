import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import Context from "../../Context/Context";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const UtilCtx = useContext(Context).util;

  const LoginSubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.post("http://localhost:4000/user/login", {
        emailId,
        password,
      });
      window.localStorage.setItem("TracerAccessToken", res.data.accessToken);
      UtilCtx.setLoader(false);
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div className="w-[28rem] bg-white my-28 rounded-xl shadow-xl relative">
      <form className="inderFont flex flex-col px-[4rem] py-12  items-center">
        <ul className="mb-7">
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
    </div>
  );
};

export default Login;
