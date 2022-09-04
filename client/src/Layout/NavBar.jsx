import React from "react";
import { BsFillPersonFill } from "react-icons/bs";

const NavBar = () => {
  return (
    <div className="inderFont h-28 w-[90vw] max-w-[85rem] flex justify-between items-center">
      <h1 className="text-[1.9rem] font-medium">Tracer</h1>
      <span className="w-10 h-10 rounded-[50%] bg-white flex justify-center items-center">
        <BsFillPersonFill size="1.6rem" />
      </span>
    </div>
  );
};

export default NavBar;
