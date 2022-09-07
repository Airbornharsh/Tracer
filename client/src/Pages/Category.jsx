import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import CategoryRenderData from "../Utils/Data/CategoryRenderData";
import Context from "../Context/Context";

const Category = () => {
  const [expenses, setExpenses] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const UtilCtx = useRef(useContext(Context).util);
  const Ctx = useRef(useContext(Context));
  let categoryData;

  const params = useParams();
  const Navigate = useNavigate();

  CategoryRenderData.forEach((data) => {
    if (data.id === params.categoryid) categoryData = data;
  });

  useEffect(() => {
    const onLoad = async () => {
      UtilCtx.current.setLoader(true);

      // try {
      //   if (!Ctx.current.accessToken) {
      //     UtilCtx.current.setLoader(false);
      //     console.log("Nothing");
      //   }

      //   const data = await axios.get(
      //     `${window.localStorage.getItem(
      //       "Tracer-Backend-URI"
      //     )}/expenses/category/${params.categoryid}`,
      //     {
      //       headers: {
      //         authorization: `Bearer ${window.localStorage.getItem(
      //           "TracerAccessToken"
      //         )}`,
      //       },
      //     }
      //   );
      //   setExpenses(data.data);
      if (Ctx.current.expenseData) {
        const tempData = [];

        Ctx.current.expenseData.map((Data) => {
          if (Data.category === params.categoryid) tempData.push(Data);

          return Data;
        });

        setExpenses(tempData);
        UtilCtx.current.setLoader(false);
      } else Navigate("/");
      UtilCtx.current.setLoader(false);
      // } catch (e) {
      //   console.log(e);
      //   UtilCtx.current.setLoader(false);
      // }
    };

    onLoad();
  }, [params.categoryid, Navigate]);

  const ToggleRemoving = () => {
    if (isRemoving) setIsRemoving(false);
    else setIsRemoving(true);
  };

  const DeleteHandler = async (expense) => {
    console.log("Hii");
    const tempExpenseData = [];
    const tempCategoryExpenseData = [];
    const expenseData = Ctx.current.expenseData;
    try {
      if (!Ctx.current.accessToken) {
        UtilCtx.current.setLoader(false);
        console.log("Nothing");
      }

      const data = await axios.delete(
        `${window.localStorage.getItem("Tracer-Backend-URI")}/expense/${
          expense._id
        }`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "TracerAccessToken"
            )}`,
          },
        }
      );

      console.log(data);

      expenses.forEach((data) => {
        if (data._id !== expense._id) tempCategoryExpenseData.push(data);
      });

      setExpenses(tempCategoryExpenseData);

      expenseData.forEach((data) => {
        if (data._id !== expense._id) tempExpenseData.push(data);
      });

      Ctx.current.setExpenseData(tempExpenseData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[85vw] max-w-[80rem] flex flex-col items-center ">
      <div className="flex items-start w-[85vw] max-w-[80rem]">
        <span className="flex items-end">
          <img
            className="h-11 w-11 aspect-square"
            src={categoryData.imgSrc}
            alt={categoryData.name}
          />
          <h3
            className={`inderFont text-[1.8rem] h-10 pl-4 ${categoryData.id}TextColor`}
          >
            {categoryData.name}
          </h3>
          {isRemoving ? (
            <button
              className="right-1 top-1 flex justify-center items-center cursor-pointer p-2 py-1 rounded-lg text-center ml-5 text-white bg-red-600 "
              onClick={ToggleRemoving}
            >
              Remove
            </button>
          ) : (
            <button
              className="right-1 top-1 flex justify-center items-center cursor-pointer bg-white p-2 py-1 rounded-lg text-center ml-5 hover:bg-red-600 hover:text-white"
              onClick={ToggleRemoving}
            >
              Remove
            </button>
          )}
        </span>
      </div>
      <ul className="w-[85vw] max500:w-[95vw] max-w-[75rem] mt-16 flex flex-wrap max500:justify-center">
        {expenses.map((expense, index) => {
          const date = new Date(expense.time).toString().split(" ");

          return (
            <li
              key={index}
              className={`w-64  h-28 ${categoryData.id}BgColor text-white flex inderFont items-center mb-7 mr-8 max500:mb-3 max500:mr-2 max500:w-28 max500:h-[3.5rem] overflow-hidden relative`}
            >
              <span className="flex flex-col items-center mb-2 ml-4 max500:ml-1">
                <p className="text-[2.3rem] max500:text-[1.4rem] h-11 max500:h-6">
                  {date[2]}
                </p>
                <p className="text-[1.5rem] max500:text-[0.8rem]">{date[1]}</p>
              </span>
              <span className="h-[80%] w-[0.05rem] ml-3 bg-black max500:ml-1"></span>
              <span className="ml-3 overflow-hidden w-42 max500:ml-2 max500:w-14">
                <p className="text-[1.8rem] max500:text-[1rem]">
                  {expense.title}
                </p>
                <p className="text-[1.15rem] max500:text-[0.8rem]">
                  Rs {expense.amount}
                </p>
              </span>
              {isRemoving && (
                <AiOutlineClose
                  className="absolute right-1 top-1 cursor-pointer"
                  size="1rem"
                  onClick={() => {
                    const result = window.confirm("Want to delete?");
                    if (result) {
                      DeleteHandler(expense);
                    }
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
