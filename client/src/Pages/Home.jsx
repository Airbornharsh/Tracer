import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryRenderData from "../Utils/Data/CategoryRenderData";
import { AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Context from "../Context/Context";

const Home = () => {
  const [category, setCategory] = useState("food");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const UserCtx = useContext(Context).user;
  const UtilCtx = useContext(Context).util;
  const Navigate = useNavigate();

  const submitExpense = async (e) => {
    e.preventDefault();
    UtilCtx.setLoader(true);

    try {
      console.log("started");
      await axios.post(
        "https://mtrace.herokuapp.com/expenses",
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
      setIsAdding(false);
      UtilCtx.setLoader(false);
    } catch (e) {
      console.log(e.message);
      setIsAdding(false);
      UtilCtx.setLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[clac(100vh-8rem)]">
      {UserCtx.isLogged ? (
        <div className="flex flex-col items-center pt-10">
          <ul className="flex justify-start  w-[80vw] max-w-[80rem] flex-wrap">
            {CategoryRenderData.map((data) => {
              return (
                <li
                  key={data.id}
                  className="bg-white rounded-md mx-4 mb-7 p-6 pb-3 flex flex-col justify-center items-center cursor-pointer shadow-[0_4px_10px_1px_rgba(0,0,0,0.3)]"
                  onClick={() => {
                    Navigate(`/category/${data.id}`);
                  }}
                >
                  <img
                    src={data.imgSrc}
                    alt={data.name}
                    className="w-20 h-20 mx-3"
                  />
                  <h4 className={`${data.id}TextColor mt-5 inderFont`}>
                    {data.name}
                  </h4>
                </li>
              );
            })}
          </ul>
          <div className="mt-32 ">
            {!isAdding ? (
              <div
                className="bg-white p-[0.35rem] rounded-xl shadow-[0_4px_10px_1px_rgba(0,0,0,0.3)] cursor-pointer"
                onClick={() => {
                  setIsAdding(true);
                }}
              >
                <AiOutlinePlus size="3rem" />
              </div>
            ) : (
              <div className="w-[28rem] bg-white mb-28 rounded-xl shadow-xl relative">
                <form className="inderFont flex flex-col px-[4rem] py-12  items-center">
                  <ul className="mb-7">
                    <li className="flex flex-col mb-6">
                      <label className="text-[1.5rem]">Category</label>
                      <select
                        className="w-[20rem] h-10 bg-Color2 p-1 px-2"
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
                    </li>
                    <li className="flex flex-col mb-6">
                      <label className="text-[1.5rem]">Title</label>
                      <input
                        type="text"
                        className="w-[20rem] h-10 bg-Color2 p-1 px-2"
                        placeholder="Write Your Title Here ..."
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </li>
                    <li className="flex flex-col mb-6">
                      <label className="text-[1.5rem]">Amount</label>
                      <input
                        type="Number"
                        className="w-[20rem] h-10 bg-Color2 p-1 px-2"
                        placeholder="Write Your Amount Here ..."
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </li>
                  </ul>
                  <button
                    className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
                    onClick={submitExpense}
                  >
                    Add Expense
                  </button>
                </form>
                <span className="absolute top-0 right-0 bg-Color2 p-2 rounded-[50%] cursor-pointer">
                  <GrClose
                    size="1.4rem"
                    onClick={() => {
                      setIsAdding(false);
                    }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <button
            className="bg-Color3 rounded-md shadow-md w-[7.1rem] mx-5 py-2 flex text-white justify-center items-center"
            onClick={() => {
              Navigate("/user/register");
            }}
          >
            Register
          </button>
          <button
            className="bg-Color3 rounded-md shadow-md w-[7.1rem] py-2 mx-5 text-white flex justify-center items-center"
            onClick={() => {
              Navigate("/user/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
