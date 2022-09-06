import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
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

  // window.localStorage.setItem("Tracer-Backend-URI", "http://localhost:4000");
  window.localStorage.setItem(
    "Tracer-Backend-URI",
    "https://mtrace.herokuapp.com"
  );

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
          console.log(e);
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-Color1 min-w-screen ">
      {loader ? (
        <div className=" wrapper gooey">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start min-h-screen bg-Color1 min-w-screen ">
          <Loader />
          <NavBar />
          <RoutesContainer />
        </div>
      )}
    </div>
  );
}

export default App;
