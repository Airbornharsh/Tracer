import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import Context from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const UtilCtx = useContext(Context).util;
  const UserCtx = useContext(Context).user;
  const Ctx = useContext(Context);

  const Navigate = useNavigate();

  const LoginSubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.post(
        `${window.localStorage.getItem("Tracer-Backend-URI")}/user/login`,
        {
          emailId,
          password,
        }
      );
      window.localStorage.setItem("TracerAccessToken", res.data.accessToken);
      Ctx.setAccessToken(res.data.accessToken);
      AppFunction(res.data.accessToken);
      UtilCtx.setLoader(false);
      UserCtx.setIsLogged(true);
      Navigate("/");
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  const AppFunction = async (token) => {
    UtilCtx.setLoader(true);

    if (token) {
      UserCtx.setIsLogged(true);
      const onLoad = async () => {
        try {
          const userData = await axios.get(
            `${window.localStorage.getItem("Tracer-Backend-URI")}/userdata`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          Ctx.setUserData(userData.data);

          const data = await axios.get(
            `${window.localStorage.getItem("Tracer-Backend-URI")}/expenses`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          Ctx.setExpenseData(data.data);
          UtilCtx.setLoader(false);
        } catch (e) {
          console.log(e);
          UtilCtx.setLoader(false);
        }
      };

      onLoad();
    }
  };

  return (
    <div className="max-w-[25rem] bg-slate-50 my-28 rounded-xl shadow-xl relative flex flex-col items-center w-[90vw]">
      <form className="inderFont flex flex-col px-[2rem] py-6 max500:px-[1rem]  items-center ">
        <ul className="mb-7">
          <li className="flex flex-col mb-3">
            <label className="text-slate-700">Email Id</label>
            <input
              type="Email"
              className="w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2 text-[0.9rem]"
              placeholder="Enter Your EmailId"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-3">
            <label className="text-slate-700">Password</label>
            <input
              type="Password"
              className="h-10 bg-slate-200 p-1 px-2 w-[80vw] max-w-[20rem] text-[0.9rem]"
              placeholder="Write Your Password Here ..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-slate-700 text-slate-200 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={LoginSubmit}
        >
          Login
        </button>
      </form>
      <Link to="/user/register" className="mb-5 text-slate-600">
        Register Instead
      </Link>
    </div>
  );
};

export default Login;
