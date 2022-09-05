import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Context from "../Context/Context";

const Profile = () => {
  const UtilCtx = useRef(useContext(Context).util);
  const Ctx = useRef(useContext(Context));
  const [expenses, setExpenses] = useState([]);

  const params = useParams();

  useEffect(() => {
    const onLoad = async () => {
      UtilCtx.current.setLoader(true);

      try {
        if (!Ctx.current.accessToken) {
          UtilCtx.current.setLoader(false);
          console.log("Nothing");
        }

        const data = await axios.get(
          `${window.localStorage.getItem("Tracer-Backend-URI")}/expenses`,
          {
            headers: {
              authorization: `Bearer ${window.localStorage.getItem(
                "TracerAccessToken"
              )}`,
            },
          }
        );
        console.log(data);
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
    <ul className="flex items-start justify-start mt-8 w-[88vw] max-w-[83rem] flex-wrap">
      <li className="p-3 m-2 bg-white rounded-md shadow-lg w-96">
        <ul className="h-[100%] overflow-hidden">
          <li className="flex mb-2">
            <b>Name:</b>
            <p className="ml-1"> ****** ******</p>
          </li>
          <li className="flex mb-2">
            <b>Email:</b>
            <p className="ml-1"> *****************</p>
          </li>
          <li className="flex">
            <b>Income:</b>
            <p className="ml-1"> Rs *****</p>
          </li>
        </ul>
      </li>
      <li className="p-3 m-2 bg-white rounded-md shadow-lg h-80 w-96">
        {expenses ? (
          <ul className="flex flex-col overflow-auto h-[18.5rem]">
            {expenses.map((expense, index) => {
              const date = new Date(expense.time).toString().split(" ");

              if (index % 2 === 1) {
                return (
                  <li
                    key={index + 1}
                    className="flex p-[0.4rem] relative bg-slate-400 text-white"
                  >
                    <p className="pl-1">{index + 1}.</p>
                    <p className="pl-3">{expense.title}</p>
                    <span className="absolute flex right-4">
                      <p>{date[0]}</p>
                      <p className="ml-1">{date[2]}</p>
                      <p className="ml-1">{date[1]}</p>
                      <p className="w-[4.3rem] text-right">
                        Rs {expense.amount}
                      </p>
                    </span>
                  </li>
                );
              } else {
                return (
                  <li
                    key={index + 1}
                    className="flex p-[0.4rem] relative bg-slate-100"
                  >
                    <p className="pl-1">{index + 1}.</p>
                    <p className="pl-3">{expense.title}</p>
                    <span className="absolute flex right-4">
                      <p>{date[0]}</p>
                      <p className="ml-1">{date[2]}</p>
                      <p className="ml-1">{date[1]}</p>
                      <p className="w-[4.3rem] text-right">
                        Rs {expense.amount}
                      </p>
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          <div>Nothing Found</div>
        )}
      </li>
    </ul>
  );
};

export default Profile;
