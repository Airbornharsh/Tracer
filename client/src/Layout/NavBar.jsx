import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const Navigate = useNavigate();
  return (
    <div className="inderFont h-28 w-[90vw] max-w-[85rem] flex justify-between items-center">
      <h1 className="text-[1.9rem] font-medium text-white">MTrace</h1>
      <div className="flex items-center">
        <div
          className="flex items-center justify-center p-1 mr-3 bg-white rounded-md cursor-pointer max500:fixed h-9 w-9 max500:bottom-4 max500:right-4"
          onClick={() => {
            Navigate("/addexpense");
          }}
        >
          <AiOutlinePlus size="1.6rem" />
        </div>
        <Link
          to="/profile"
          className="w-10 h-10 rounded-[50%] bg-white flex justify-center items-center"
        >
          <BsFillPersonFill size="1.6rem" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
