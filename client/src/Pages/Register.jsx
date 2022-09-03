import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/user/register", {
        name,
        emailId,
        password,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[28rem] bg-white mb-28 rounded-xl shadow-xl relative">
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
              placeholder="Write Your Amount Here ..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-[1.5rem]">Confirm Password</label>
            <input
              type="Password"
              className="w-[20rem] h-10 bg-Color2 p-1 px-2"
              placeholder="Write Your Amount Here ..."
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={SignUpSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
