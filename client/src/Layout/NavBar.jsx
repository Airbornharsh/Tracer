import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="inderFont h-28 w-[90vw] max-w-[85rem] flex justify-between items-center">
      <h1 className="text-[1.9rem] font-medium">MTrace</h1>
      <Link
        to="/profile"
        className="w-10 h-10 rounded-[50%] bg-white flex justify-center items-center"
      >
        <BsFillPersonFill size="1.6rem" />
      </Link>
    </div>
  );
};

export default NavBar;
