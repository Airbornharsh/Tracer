import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import {
  Chart as ChartJs,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import Context from "../Context/Context";
ChartJs.register(
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Profile = () => {
  const Ctx = useRef(useContext(Context));
  const UtilCtx = useRef(useContext(Context).util);
  const UserCtx = useRef(useContext(Context).user);
  const [weeklyDatas, setWeeklyDatas] = useState([]);
  const [categoryDatas, setCategoryDatas] = useState([]);

  const params = useParams();
  const Navigate = useNavigate();

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

    const categoryData = [0, 0, 0, 0, 0, 0];

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

        switch (data.category) {
          case "food":
            categoryData[0] += data.amount;
            break;

          case "travel":
            categoryData[1] += data.amount;
            break;

          case "drink":
            categoryData[2] += data.amount;
            break;

          case "bill":
            categoryData[3] += data.amount;
            break;

          case "study":
            categoryData[4] += data.amount;
            break;

          case "cloth":
            categoryData[5] += data.amount;
            break;
          default:
            break;
        }
      }

      return data;
    });

    setCategoryDatas(categoryData);
    setWeeklyDatas([day0, day1, day2, day3, day4, day5, day6]);
  };

  useEffect(() => {
    if (!UserCtx.current.isLogged) Navigate("/");

    const onLoad = async () => {
      UtilCtx.current.setLoader(true);

      try {
        if (!Ctx.current.accessToken) {
          UtilCtx.current.setLoader(false);
        }

        // const userData = await axios.get(
        //   `${window.localStorage.getItem("Tracer-Backend-URI")}/userdata`,
        //   {
        //     headers: {
        //       authorization: `Bearer ${window.localStorage.getItem(
        //         "TracerAccessToken"
        //       )}`,
        //     },
        //   }
        // );

        // setUserData(userData.data);

        // const data = await axios.get(
        //   `${window.localStorage.getItem("Tracer-Backend-URI")}/expenses`,
        //   {
        //     headers: {
        //       authorization: `Bearer ${window.localStorage.getItem(
        //         "TracerAccessToken"
        //       )}`,
        //     },
        //   }
        // );
        if (Ctx.current.expenseData) WeeklyDatasFn(Ctx.current.expenseData);
        else Navigate("/");
        UtilCtx.current.setLoader(false);
      } catch (e) {
        console.log(e);
        UtilCtx.current.setLoader(false);
      }
    };

    onLoad();
  }, [params.categoryid, Navigate]);

  const weeklyDataAmount = weeklyDatas.map((data) => {
    return data.maxAmount;
  });

  const weeklyDataDay = weeklyDatas.map((data) => {
    if (data.week) return data.week;
    else return "";
  });

  return (
    <ul className=" mt-8 w-[88vw] max-w-[83rem] flex flex-wrap max500:justify-center ">
      <li className="p-3 m-2 bg-Color4 rounded-md shadow-lg w-96 max-h-[7.5rem]">
        <ul className="h-[100%] overflow-hidden">
          <li className="flex mb-2">
            <b>Name:</b>
            <p className="ml-1">{Ctx.current.userData.name}</p>
          </li>
          <li className="flex mb-2">
            <b>Email:</b>
            <p className="ml-1"> {Ctx.current.userData.emailId}</p>
          </li>
          <li className="flex">
            <b>Income:</b>
            <p className="ml-1"> Rs *****</p>
          </li>
        </ul>
      </li>
      <li className="m-2 rounded-md shadow-lg h-[19.5rem] p-2 bg-Color4 w-96">
        {Ctx.current.expenseData ? (
          <ul className="flex flex-col overflow-auto h-[18.5rem]">
            {Ctx.current.expenseData.map((expense, index) => {
              const date = new Date(expense.time).toString().split(" ");

              let Style;

              if (index % 2 === 0) Style = "profileListLight";
              else Style = "profileListDark";

              return (
                <li
                  key={index + 1}
                  className={`flex p-[0.4rem] relative bg-slate-400 rounded text-white ${Style}`}
                >
                  <p className="pl-1">{index + 1}.</p>
                  <p className="pl-3 w-[5rem] h-[1.7rem] overflow-hidden ">
                    {expense.title}
                  </p>
                  <span className="absolute flex right-4">
                    <p>{date[0]}</p>
                    <p className="ml-1">{date[2]}</p>
                    <p className="ml-1">{date[1]}</p>
                    <p className="w-[4.3rem] text-right">Rs {expense.amount}</p>
                  </span>
                </li>
              );

              // if (index % 2 === 1) {
              //   return (
              //     <li
              //       key={index + 1}
              //       className="flex p-[0.4rem] relative bg-slate-400 rounded text-white"
              //     >
              //       <p className="pl-1">{index + 1}.</p>
              //       <p className="pl-3 w-[5rem] h-[1.7rem] overflow-hidden ">
              //         {expense.title}
              //       </p>
              //       <span className="absolute flex right-4">
              //         <p>{date[0]}</p>
              //         <p className="ml-1">{date[2]}</p>
              //         <p className="ml-1">{date[1]}</p>
              //         <p className="w-[4.3rem] text-right">
              //           Rs {expense.amount}
              //         </p>
              //       </span>
              //     </li>
              //   );
              // } else {
              //   return (
              //     <li
              //       key={index + 1}
              //       className="flex p-[0.4rem] relative bg-slate-100 rounded"
              //     >
              //       <p className="pl-1">{index + 1}.</p>
              //       <p className="pl-3 w-[8rem] h-[1.7rem] overflow-hidden max500:w-[5rem]">
              //         {expense.title}
              //       </p>
              //       <span className="absolute flex right-4">
              //         <p>{date[0]}</p>
              //         <p className="ml-1">{date[2]}</p>
              //         <p className="ml-1">{date[1]}</p>
              //         <p className="w-[4.3rem] text-right">
              //           Rs {expense.amount}
              //         </p>
              //       </span>
              //     </li>
              //   );
              // }
            })}
          </ul>
        ) : (
          <div>Nothing Found</div>
        )}
      </li>
      <li className="p-3  m-2 bg-Color4 rounded-md shadow-lg max-w-[20rem] w-[90vw]  flex justify-center items-center flex-col">
        <h3 className="text-[1.2rem] inderFont">Category</h3>
        <div className="max-w-[20rem] w-[90vw]">
          <Pie
            data={{
              labels: ["Food", "Travel", "Drink", "Bill", "Study", "Cloth"],
              datasets: [
                {
                  data: categoryDatas,
                  backgroundColor: [
                    "#ff5964",
                    "#38618c",
                    "#35a7ff",
                    "#c81b25",
                    "#3bbc26",
                    "#26bc98",
                  ],
                  hoverBackgroundColor: [
                    "#ff5964",
                    "#38618c",
                    "#35a7ff",
                    "#c81b25",
                    "#3bbc26",
                    "#26bc98",
                  ],
                },
              ],
            }}
          />
        </div>
      </li>
      <li className="p-3  m-2 bg-Color4 rounded-md shadow-lg max-w-[20rem] w-[90vw]  flex justify-center items-center mb-24 flex-col max-h-[12rem]">
        <h3 className="text-[1.2rem] inderFont">Weekly Expenses</h3>
        <div className="max-w-[20rem] w-[90vw] px-3">
          <Bar
            data={{
              labels: weeklyDataDay.reverse(),
              datasets: [
                {
                  label: "WEEK",
                  data: weeklyDataAmount.reverse(),
                  backgroundColor: [
                    "#ff5964",
                    "#38618c",
                    "#35a7ff",
                    "#c81b25",
                    "#3bbc26",
                    "#26bc98",
                  ],
                  hoverBackgroundColor: [
                    "#ff5964",
                    "#38618c",
                    "#35a7ff",
                    "#c81b25",
                    "#3bbc26",
                    "#26bc98",
                  ],
                },
              ],
            }}
            options={{
              maintainAspectRatio: true,
              animation: {
                onComplete: "true ",
              },
            }}
          />
        </div>
      </li>
    </ul>
  );
};

export default Profile;
