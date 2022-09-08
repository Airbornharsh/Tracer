import React, { useContext, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../Context/Context";

const NavBar = () => {
  const Ctx = useContext(Context);
  const UserCtx = useRef(useContext(Context).user);
  const Navigate = useNavigate();

  const Location = useLocation();

  const LogOutHandler = () => {
    Ctx.setAccessToken("");
    Ctx.setUserData({});
    Ctx.setExpenseData([]);
    window.localStorage.setItem("TracerAccessToken", "");
    UserCtx.current.setIsLogged(false);
    Navigate("/");
  };

  return (
    <div className="inderFont h-28 w-[90vw] max-w-[85rem] flex justify-between items-center ">
      <h1 className="text-[1.9rem] font-medium text-black">MTrace</h1>
      <div className="flex items-center">
        {Location.pathname.split("/")[1] !== "category" && (
          <div
            className="z-10 flex items-center justify-center p-1 mr-3 rounded-md cursor-pointer backdrop-blur-3xl bg-slate-50 max500:fixed h-9 w-9 max500:bottom-4 max500:right-4"
            onClick={() => {
              Navigate("/addexpense");
            }}
          >
            <AiOutlinePlus size="1.6rem" />
          </div>
        )}

        {Location.pathname !== "/profile" ? (
          <Link
            to="/profile"
            className="w-10 h-10 rounded-[50%] backdrop-blur-3xl bg-slate-50 flex justify-center items-center"
          >
            <BsFillPersonFill size="1.6rem" />
          </Link>
        ) : (
          <div
            className="w-10 h-10 rounded-[50%] backdrop-blur-3xl bg-slate-50 flex justify-center items-center cursor-pointer"
            onClick={LogOutHandler}
          >
            <BiLogOut size="1.6rem" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
