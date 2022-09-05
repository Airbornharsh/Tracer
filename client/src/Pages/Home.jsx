import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CategoryRenderData from "../Utils/Data/CategoryRenderData";
import Context from "../Context/Context";

const Home = () => {
  const UserCtx = useContext(Context).user;
  const Navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[clac(100vh-8rem)]">
      {UserCtx.isLogged ? (
        <div className="flex flex-col items-center pt-10">
          <ul className="flex justify-start  max-w-[80rem] w-[80vw] flex-wrap max500:w-[97vw] max500:justify-center">
            {CategoryRenderData.map((data) => {
              return (
                <li
                  key={data.id}
                  className="bg-white rounded-md mx-4 mb-7 p-6 pb-3 flex flex-col justify-center items-center cursor-pointer shadow-[0_4px_10px_1px_rgba(0,0,0,0.3)] max500:p-3 max500:pb-1 "
                  onClick={() => {
                    Navigate(`/category/${data.id}`);
                  }}
                >
                  <img
                    src={data.imgSrc}
                    alt={data.name}
                    className="w-20 h-20 mx-3 max500:mx-2 max500:w-10 max500:h-10"
                  />
                  <h4
                    className={`${data.id}TextColor mt-5 max500:mt-2 inderFont`}
                  >
                    {data.name}
                  </h4>
                </li>
              );
            })}
          </ul>
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
