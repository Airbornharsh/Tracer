import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryRenderData from "../Utils/Data/CategoryRenderData";
import Context from "../Context/Context";

const Category = () => {
  const [expenses, setExpenses] = useState([]);
  const UtilCtx = useRef(useContext(Context).util);
  const Ctx = useRef(useContext(Context));
  let categoryData;

  const params = useParams();

  CategoryRenderData.forEach((data) => {
    if (data.id === params.categoryid) categoryData = data;
  });

  useEffect(() => {
    const onLoad = async () => {
      UtilCtx.current.setLoader(true);

      try {
        if (!Ctx.current.accessToken) {
          UtilCtx.current.setLoader(false);
          console.log("Nothing");
        }

        const data = await axios.get(
          `${window.localStorage.getItem(
            "Tracer-Backend-URI"
          )}/expenses/category/${params.categoryid}`,
          {
            headers: {
              authorization: `Bearer ${window.localStorage.getItem(
                "TracerAccessToken"
              )}`,
            },
          }
        );
        setExpenses(data.data);
        UtilCtx.current.setLoader(false);
      } catch (e) {
        console.log(e);
        UtilCtx.current.setLoader(false);
      }
    };

    onLoad();
  }, [params.categoryid]);

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
        </span>
      </div>
      <ul className="w-[85vw] max-w-[75rem] mt-16 flex flex-wrap">
        {expenses.map((expense) => {
          const date = new Date(expense.time).toString().split(" ");

          return (
            <li
              key={expense.title}
              className={`w-64 h-28 ${categoryData.id}BgColor text-white flex inderFont items-center mb-7 mr-8 max500:w-48 max500:h-[4.9rem]`}
            >
              <span className="flex flex-col items-center mb-2 ml-4 max500:ml-2">
                <p className="text-[2.3rem] max500:text-[1.7rem] h-11 max500:h-9">
                  {date[2]}
                </p>
                <p className="text-[1.5rem] max500:text-[1rem]">{date[1]}</p>
              </span>
              <span className="h-[80%] w-[0.05rem] ml-3 bg-black"></span>
              <span className="ml-3 overflow-hidden w-42">
                <p className="text-[1.8rem] max500:text-[1.2rem]">{expense.title}</p>
                <p className="text-[1.15rem] max500:text-[0.8rem]">Rs {expense.amount}</p>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
