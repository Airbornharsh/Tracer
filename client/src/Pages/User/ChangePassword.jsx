import React, { useState, useContext } from "react";
import axios from "axios";
import Context from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const UtilCtx = useContext(Context).util;

  const Navigate = useNavigate();

  const ChangePasswordSubmit = async (e) => {
    e.preventDefault();

    UtilCtx.setLoader(true);

    try {
      const res = await axios.put(
        "http://localhost:4000/user/changepassword",
        {
          password: currentPassword,
          newPassword: password,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "TracerAccessToken"
            )}`,
          },
        }
      );
      console.log(res);
      UtilCtx.setLoader(false);
      Navigate("/");
    } catch (e) {
      console.log(e);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-7rem)]">
      <div className="w-[28rem] bg-white mb-28 rounded-xl shadow-xl relative ">
        <form className="inderFont flex flex-col px-[4rem] py-12  items-center">
          <ul className="mb-7">
            <li className="flex flex-col mb-6">
              <label className="text-[1.5rem]">Current Password</label>
              <input
                className="w-[20rem] h-10 bg-Color2 p-1 px-2"
                placeholder="Enter Your Current Password"
                type="text"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col mb-6">
              <label className="text-[1.5rem]">Password</label>
              <input
                type="password"
                className="w-[20rem] h-10 bg-Color2 p-1 px-2"
                placeholder="Old Password Here"
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
                placeholder="Confirm Password Here"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </li>
          </ul>
          <button
            className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
            onClick={ChangePasswordSubmit}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
