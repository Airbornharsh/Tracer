import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { ImArrowUpRight2 } from "react-icons/im";
import CategoryRenderData from "../Utils/Data/CategoryRenderData";
import Context from "../Context/Context";

const Category = () => {
  const [expenses, setExpenses] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState();
  const [isAdding, setIsAdding] = useState();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editingExpenseId, SetEditingExpenseId] = useState("");
  const UtilCtx = useRef(useContext(Context).util);
  const Ctx = useRef(useContext(Context));
  const ExpenseCtx = useContext(Context);
  let categoryData;

  const params = useParams();
  const Navigate = useRef(useNavigate());

  CategoryRenderData.forEach((data) => {
    if (data.id === params.categoryid) categoryData = data;
  });

  useEffect(() => {
    const onLoad = async () => {
      UtilCtx.current.setLoader(true);
      if (Ctx.current.expenseData) {
        const tempData = [];

        Ctx.current.expenseData.map((Data) => {
          if (Data.category === params.categoryid) tempData.push(Data);

          return Data;
        });

        setExpenses(tempData);
        UtilCtx.current.setLoader(false);
      } else Navigate.current("/");
      UtilCtx.current.setLoader(false);
    };

    onLoad();
  }, [params.categoryid]);

  const ToggleRemoving = () => {
    if (isRemoving) {
      setIsRemoving(false);
    } else {
      setIsAdding(false);
      setIsEditing(false);
      setIsRemoving(true);
    }
  };

  const ToggleEditing = () => {
    if (isEditing) {
      setIsAdding(false);
      setIsEditing(false);
    } else {
      setIsRemoving(false);
      setIsEditing(true);
      setIsAdding(false);
    }
  };

  const EnablingAdding = (data) => {
    if (isAdding) {
      setIsAdding(false);
      setIsEditing(false);
    } else {
      setIsAdding(true);
      setIsRemoving(false);
      setIsEditing(false);
    }
  };

  const AddingExpense = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const tempCategoryExpenseData = [];
        const tempExpenseData = [];

        expenses.forEach((data) => {
          if (data._id !== editingExpenseId) tempCategoryExpenseData.push(data);
          else {
            const tempData = { ...data };
            tempData.title = title;
            tempData.amount = amount;
            tempCategoryExpenseData.push(tempData);
          }
        });

        setExpenses(tempCategoryExpenseData);

        ExpenseCtx.expenseData.forEach((data) => {
          if (data._id !== editingExpenseId) tempExpenseData.push(data);
          else {
            const tempData = { ...data };
            tempData.title = title;
            tempData.amount = amount;
            tempExpenseData.push(tempData);
          }
        });

        ExpenseCtx.setExpenseData(tempExpenseData);

        await axios.put(
          `${window.localStorage.getItem(
            "Tracer-Backend-URI"
          )}/expense/${editingExpenseId}`,
          {
            title,
            amount,
          },
          {
            headers: {
              authorization: `Bearer ${window.localStorage.getItem(
                "TracerAccessToken"
              )}`,
            },
          }
        );
        setTitle("");
        setAmount("");
        setIsAdding(false);
      } catch (e) {
        console.log(e);
      }
    } else if (isAdding) {
      try {
        const data = await axios.post(
          `${window.localStorage.getItem("Tracer-Backend-URI")}/expenses`,
          {
            title,
            amount,
            category: params.categoryid,
          },
          {
            headers: {
              authorization: `Bearer ${window.localStorage.getItem(
                "TracerAccessToken"
              )}`,
            },
          }
        );
        ExpenseCtx.setExpenseData([...ExpenseCtx.expenseData, data.data]);
        setExpenses([...expenses, data.data]);
        setTitle("");
        setAmount("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const DeleteHandler = async (expense) => {
    const tempExpenseData = [];
    const tempCategoryExpenseData = [];

    expenses.forEach((data) => {
      if (data._id !== expense._id) tempCategoryExpenseData.push(data);
    });

    setExpenses(tempCategoryExpenseData);

    ExpenseCtx.expenseData.forEach((data) => {
      if (data._id !== expense._id) tempExpenseData.push(data);
    });

    ExpenseCtx.setExpenseData(tempExpenseData);

    try {
      if (!Ctx.current.accessToken) {
        UtilCtx.current.setLoader(false);
        console.log("Nothing");
      }

      await axios.delete(
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[85vw] max-w-[80rem] flex flex-col justify-start">
      <div className="flex items-start w-[85vw] max-w-[80rem] max500:flex-col">
        <span className="flex items-end">
          <img
            className="h-10 aspect-square"
            src={categoryData.imgSrc}
            alt={categoryData.name}
          />
          <h3
            className={`inderFont text-[1.2rem] h-8 pl-4 max500:pl-2 ${categoryData.id}TextColor`}
          >
            {categoryData.name}
          </h3>
        </span>
        <span className="flex max500:mt-2">
          {isRemoving ? (
            <button
              className="flex items-center justify-center p-2 py-1 ml-5 text-center text-white transition-none rounded-lg cursor-pointer bg-slate-50 right-1 top-1 max500:ml-1"
              onClick={ToggleRemoving}
            >
              <MdDelete
                size={"1.7rem"}
                className="transition-none"
                color="red"
              />
            </button>
          ) : (
            <button
              className="flex items-center justify-center p-2 py-1 ml-5 text-center transition-none rounded-lg cursor-pointer max500:ml-1 bg-slate-50 right-1 top-1 hover:text-red-600"
              onClick={ToggleRemoving}
            >
              <MdDelete size={"1.7rem"} className="transition-none" />
            </button>
          )}
          {isEditing ? (
            <button
              className="flex items-center justify-center p-2 py-1 ml-5 text-center text-white transition-none rounded-lg cursor-pointer bg-slate-50 right-1 top-1 max500:ml-2"
              onClick={ToggleEditing}
            >
              <MdEdit size={"1.7rem"} className="transition-none" color="red" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center p-2 py-1 ml-5 text-center transition-none rounded-lg cursor-pointer bg-slate-50 right-1 top-1 hover:text-red-600 max500:ml-2"
              onClick={ToggleEditing}
            >
              <MdEdit size={"1.7rem"} className="transition-none" />
            </button>
          )}
          {isAdding ? (
            <button
              className="flex items-center justify-center p-2 py-1 ml-5 text-center text-white transition-none rounded-lg cursor-pointer bg-slate-50 right-1 top-1 max500:ml-2"
              onClick={EnablingAdding}
            >
              <AiOutlineClose
                size={"1.7rem"}
                className="transition-none"
                color="black"
              />
            </button>
          ) : (
            <button
              className="flex items-center justify-center p-2 py-1 ml-5 text-center text-white transition-none rounded-lg cursor-pointer bg-slate-50 right-1 top-1 max500:ml-2"
              onClick={EnablingAdding}
            >
              <AiOutlinePlus
                size={"1.7rem"}
                className="transition-none"
                color="black"
              />
            </button>
          )}
        </span>
      </div>
      {isAdding && (
        <form className="flex p-2 mt-6 rounded bg-slate-50 w-[85vw] max550:flex-col max-w-[29.7rem]">
          <input
            type="text"
            className="max-w-[15rem] w-[80vw] h-10 bg-Color2 p-1 px-2 max550:max-w-[100%] "
            placeholder="Your Title Here ..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="flex ml-2 max550:mt-2 max550:ml-0 max550:max-w-[100%]">
            <input
              type="Number"
              className="max-w-[10rem]  w-[80vw] h-10 bg-Color2 p-1 px-2 max550:max-w-[86.6%]"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <button
              className={`${categoryData.id}BgColor text-white flex justify-center items-center ml-2 px-2`}
              onClick={AddingExpense}
            >
              <ImArrowUpRight2 size={"1.4rem"} />
            </button>
          </div>
        </form>
      )}
      <ul className="w-[85vw] max500:w-[95vw] max-w-[75rem] mt-10 flex flex-wrap max500:justify-center">
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
                  className="absolute cursor-pointer right-1 top-1"
                  size="1rem"
                  onClick={() => {
                    const result = window.confirm("Want to delete?");
                    if (result) {
                      DeleteHandler(expense);
                    }
                  }}
                />
              )}
              {isEditing && (
                <MdEdit
                  className="absolute cursor-pointer right-1 top-1"
                  size="1rem"
                  onClick={() => {
                    const result = window.confirm("Want to Edit?");
                    if (result) {
                      setTitle(expense.title);
                      setAmount(expense.amount);
                      SetEditingExpenseId(expense._id);
                      setIsAdding(true);
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
