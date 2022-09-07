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
          <ul className="flex justify-start  max-w-[80rem] w-[80vw] flex-wrap max500:w-[97vw]">
            {CategoryRenderData.map((data) => {
              return (
                <li
                  key={data.id}
                  className="bg-[] rounded-md mx-4 mb-7 p-4 pb-3 max500:mx-2 max500:mb-4 flex flex-col justify-center items-center cursor-pointer shadow-lg max500:p-3 max500:pb-1 backdrop-blur-3xl bg-slate-50"
                  onClick={() => {
                    Navigate(`/category/${data.id}`);
                  }}
                >
                  <img
                    src={data.imgSrc}
                    alt={data.name}
                    className="w-12 h-12 mx-3 max500:mx-2 max500:w-8 max500:h-8"
                  />
                  <h4
                    className={`${data.id}TextColor mt-3 max500:mt-2 inderFont`}
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
