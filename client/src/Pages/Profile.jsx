import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Context from "../Context/Context";

const Profile = () => {
  const UtilCtx = useRef(useContext(Context).util);
  const Ctx = useRef(useContext(Context));
  const [expenses, setExpenses] = useState([]);
  const [weeklyDatas, setWeeklyDatas] = useState([]);
  const highestWeeklyAmount = 4000;

  const params = useParams();

  const WeeklyDatasFn = (datas) => {
    const todaysDate = new Date(Date.now()).toString().split(" ")[2];
    const thisMonth = new Date(Date.now()).toString().split(" ")[1];

    const day0 = { maxAmount: 0 };
    const day1 = { maxAmount: 0 };
    const day2 = { maxAmount: 0 };
    const day3 = { maxAmount: 0 };
    const day4 = { maxAmount: 0 };
    const day5 = { maxAmount: 0 };
    const day6 = { maxAmount: 0 };

    datas.map((data) => {
      if (new Date(data.time).toString().split(" ")[1] === thisMonth) {
        switch (todaysDate - new Date(data.time).toString().split(" ")[2]) {
          case 0:
            day0.maxAmount += data.amount;
            day0.week = new Date(data.time).toString().split(" ")[0];
            break;

          case 1:
            day1.maxAmount += data.amount;
            day1.week = new Date(data.time).toString().split(" ")[0];
            break;

          case 2:
            day2.maxAmount += data.amount;
            day2.week = new Date(data.time).toString().split(" ")[0];
            break;

          case 3:
            day3.maxAmount += data.amount;
            day3.week = new Date(data.time).toString().split(" ")[0];
            break;

          case 4:
            day4.maxAmount += data.amount;
            day4.week = new Date(data.time).toString().split(" ")[0];
            break;

          case 5:
            day5.maxAmount += data.amount;
            day5.week = new Date(data.time).toString().split(" ")[0];
            break;

          case 6:
            day6.maxAmount += data.amount;
            day6.week = new Date(data.time).toString().split(" ")[1];
            break;
          default:
        }
      }

      return data;
    });

    setWeeklyDatas([day0, day1, day2, day3, day4, day5, day6]);
  };

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
        WeeklyDatasFn(data.data);
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
    <ul className=" mt-8 w-[88vw] max-w-[83rem] flex flex-wrap">
      <li className="p-3 m-2 bg-white rounded-md shadow-lg w-96 max-h-[7.5rem]">
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
                    <p className="pl-3 w-[5rem] overflow-hidden">{expense.title}</p>
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
                    <p className="pl-3 w-[8rem] overflow-hidden max500:w-[5rem]">{expense.title}</p>
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
      <li className="p-3 pb-10 m-2 bg-white rounded-md shadow-lg h-80 max-w-[24rem] w-[90vw]  flex justify-center items-center mb-24 flex-col">
        <h3 className="text-[1.2rem] inderFont">Weekly Expenses</h3>
        <div className="border-[2px] border-t-0 border-black h-[95%] w-[90%] flex justify-center items-center">
          <ul className="flex flex-row-reverse h-[100%] items-end ">
            {weeklyDatas.map((data, index) => {
              const tempHeight = (13 * data.maxAmount) / highestWeeklyAmount;

              let tempBgColor;
              if (tempHeight / 13 > 0.65) {
                tempBgColor = "red";
              } else if (tempHeight / 13 > 0.33) {  
                tempBgColor = "blue";
              } else {
                tempBgColor = "green";
              }

              if (data.week) {
                return (
                  <li
                    key={index}
                    className="relative flex items-center justify-center w-5 mx-3 max500:mx-2 max400:mx-1"
                  >
                    <div className={`w-5 h-[13rem] bg-slate-200`} />
                    <div
                      className={`w-5 absolute bottom-0 right-0`}
                      style={{
                        height: `${tempHeight}rem`,
                        backgroundColor: `${tempBgColor}`,
                      }}
                    />
                    <p className="absolute bottom-[-1.6rem] text-[0.8rem] max500:bottom-[-1.3rem] inderFont">{data.week}</p>
                    <p className="absolute top-[-1.2rem] z-10 text-[0.8rem] inderFont">
                      {data.maxAmount}
                    </p>
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className="relative flex items-center justify-center w-5 mx-3 max500:mx-2 max400:mx-1"
                  >
                    <div className={`w-5 h-[13rem] bg-slate-200`} />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default Profile;
