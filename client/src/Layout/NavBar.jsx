import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../Context/Context";

const NavBar = () => {
  const [profileIcon, setProfileIcon] = useState();
  const Ctx = useContext(Context);
  const UserCtx = useRef(useContext(Context).user);
  const Navigate = useNavigate();

  const Location = useLocation();

  useEffect(() => {
    if (Location.pathname === "/profile") setProfileIcon(false);
    else setProfileIcon(true);
  }, [Location.pathname]);

  const LogOutHandler = () => {
    Ctx.setAccessToken("");
    Ctx.setUserData({});
    Ctx.setExpenseData([]);
    window.localStorage.setItem("TracerAccessToken", "");
    UserCtx.current.setIsLogged(false);
    Navigate("/");
  };

  return (
    <div className="inderFont h-28 w-[90vw] max-w-[85rem] flex justify-between items-center">
      <h1 className="text-[1.9rem] font-medium text-white">MTrace</h1>
      <div className="flex items-center">
        <div
          className="flex items-center justify-center p-1 mr-3 bg-white rounded-md cursor-pointer max500:fixed h-9 w-9 max500:bottom-4 max500:right-4 z-10"
          onClick={() => {
            Navigate("/addexpense");
          }}
        >
          <AiOutlinePlus size="1.6rem" />
        </div>

        {profileIcon ? (
          <Link
            to="/profile"
            className="w-10 h-10 rounded-[50%] bg-white flex justify-center items-center"
          >
            <BsFillPersonFill size="1.6rem" />
          </Link>
        ) : (
          <div
            className="w-10 h-10 rounded-[50%] bg-white flex justify-center items-center cursor-pointer"
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
