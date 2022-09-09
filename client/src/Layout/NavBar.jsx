import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { ImArrowUpRight2 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import axios from "axios";

const NavBar = () => {
  const [category, setCategory] = useState("food");
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const Ctx = useContext(Context);
  const UserCtx = useContext(Context).user;
  const UtilCtx = useContext(Context).util;
  const Navigate = useNavigate();

  const Location = useLocation();

  const LogOutHandler = () => {
    Ctx.setAccessToken("");
    Ctx.setUserData({});
    Ctx.setExpenseData([]);
    window.localStorage.setItem("TracerAccessToken", "");
    UserCtx.setIsLogged(false);
    Navigate("/");
  };

  const EnablingAdding = (data) => {
    if (isAdding) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    UtilCtx.setLoader(true);

    try {
      const data = await axios.post(
        `${window.localStorage.getItem("Tracer-Backend-URI")}/expenses`,
        {
          title,
          amount,
          category,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "TracerAccessToken"
            )}`,
          },
        }
      );
      Ctx.setExpenseData([...Ctx.expenseData, data.data]);
      UtilCtx.setLoader(false);
      setAmount("");
      setTitle("");
    } catch (e) {
      console.log(e.message);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div>
      <div className="inderFont h-20 mt-4 w-[90vw] max-w-[85rem] flex justify-between items-center ">
        <h1 className="text-[1.9rem] font-medium text-black">MTrace</h1>
        <div className="flex items-center">
          {Location.pathname.split("/")[1] !== "category" && (
            <div>
              {UserCtx.isLogged && (
                <div>
                  {isAdding ? (
                    <button
                      className="z-10 flex items-center justify-center p-1 mr-3 rounded-md cursor-pointer backdrop-blur-3xl bg-slate-50 max500:fixed h-9 w-9 max500:bottom-4 max500:right-4 "
                      onClick={EnablingAdding}
                    >
                      <AiOutlineClose
                        size={"1.6rem"}
                        className="transition-none "
                        color="black"
                      />
                    </button>
                  ) : (
                    <button
                      className="z-10 flex items-center justify-center p-1 mr-3 rounded-md cursor-pointer backdrop-blur-3xl bg-slate-50 max500:fixed h-9 w-9 max500:bottom-4 max500:right-4"
                      onClick={EnablingAdding}
                    >
                      <AiOutlinePlus
                        size={"1.6rem"}
                        className="transition-none"
                        color="black"
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          {UserCtx.isLogged && (
            <div>
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
          )}
        </div>
      </div>
      {Location.pathname.split("/")[1] !== "category" && (
        <div>
          {UserCtx.isLogged && (
            <div>
              {isAdding && (
                <form className="flex p-2 mt-6 rounded bg-slate-50 w-[85vw] max550:flex-col max-w-[32.2rem] ml-3 mr-3 ">
                  <select
                    className="max-w-[15rem] w-[80vw] h-10 bg-slate-200 p-1 px-2 text-slate-600 max550:max-w-[100%] mr-2 max550:mr-0"
                    placeholder="Select Your Type"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="drink">Drink</option>
                    <option value="bill">Bill</option>
                    <option value="study">Study</option>
                    <option value="cloth">Cloth</option>
                  </select>
                  <input
                    type="text"
                    className="max-w-[15rem] w-[80vw] h-10 bg-slate-200 p-1 px-2 max550:max-w-[100%] max550:mt-2"
                    placeholder="Your Title Here ..."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <div className="flex ml-2 max550:mt-2 max550:ml-0 max550:max-w-[100%]">
                    <input
                      type="Number"
                      className="max-w-[10rem]  w-[80vw] h-10 bg-slate-200 p-1 px-2 max550:max-w-[86.6%]"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <button
                      className={`bg-slate-600 text-white flex justify-center items-center ml-2 px-2`}
                      onClick={submitExpense}
                    >
                      <ImArrowUpRight2 size={"1.4rem"} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
