import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./Context/Context";
import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";

function App() {
  // const [expenses, setExpenses] = useState([]);
  const [loader, setLoader] = useState(false);
  const Ctx = useRef(useContext(Context));
  const UserCtx = useRef(useContext(Context).user);

  // Ctx.setExpenseData(expenses);

  const Navigate = useRef(useNavigate());

  window.localStorage.setItem("Tracer-Backend-URI", "http://localhost:4000");
  // window.localStorage.setItem(
  //   "Tracer-Backend-URI",
  //   "https://mtrace.herokuapp.com"
  // );

  useEffect(() => {
    setLoader(true);

    if (Ctx.current.accessToken) {
      UserCtx.current.setIsLogged(true);
      const onLoad = async () => {
        try {
          const userData = await axios.get(
            `${window.localStorage.getItem("Tracer-Backend-URI")}/userdata`,
            {
              headers: {
                authorization: `Bearer ${window.localStorage.getItem(
                  "TracerAccessToken"
                )}`,
              },
            }
          );

          Ctx.current.setUserData(userData.data);

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
          Ctx.current.setExpenseData(data.data);
          setLoader(false);
        } catch (e) {
          if (e.response.status === 401) {
            Navigate.current("/user/login");
          }
          setLoader(false);
        }
      };

      onLoad();
    } else {
      console.log("not Logged");
      UserCtx.current.setIsLogged(false);
      setLoader(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen min-w-screen bg-slate-200">
      {loader ? (
        <div className=" wrapper gooey ">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-start min-h-screen min-w-screen ">
          <Loader />
          <NavBar />
          <RoutesContainer />
          <div>
            {/* <span className=" absolute left-[200px] top-[500px] shadow-[0_0_200px_90px_rgba(0,0,0,0.3)] contrast-[0.75] shadow-blue-500 -z-10" />
            <span className=" absolute left-[1000px] top-[600px] shadow-[0_0px_200px_90px_rgba(0,0,0,0.3)] contrast-[0.75] shadow-red-500 -z-10" />
            <span className=" absolute left-[80vw] top-[10vh] shadow-[0_0px_200px_90px_rgba(0,0,0,0.3)] contrast-[0.75] shadow-red-500 -z-10" />
            <span className=" absolute right-[10vw] bottom-[20vh] shadow-[0_0px_200px_90px_rgba(0,0,0,0.3)] contrast-[0.75] shadow-lime-500 -z-10" /> */}
            {/* <span className=" absolute right-[10vw] bottom-[20vh] shadow-[0_0px_200px_90px_rgba(0,0,0,0.3)] contrast-[0.75] shadow-lime-500 -z-10" /> */}
          </div>
          {/* <div className="absolute left-0 top-0 z-10 bg-lime-900 min-h-screen min-w-screen "></div> */}
        </div>
      )}
    </div>
  );
}

export default App;
