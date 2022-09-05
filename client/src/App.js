import { useContext, useEffect, useRef } from "react";
import Context from "./Context/Context";
import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";

function App() {
  const Ctx = useRef(useContext(Context));
  const UserCtx = useRef(useContext(Context).user);

  // window.localStorage.setItem("Tracer-Backend-URI", "http://localhost:4000");
  window.localStorage.setItem("Tracer-Backend-URI", "https://mtrace.herokuapp.com");

  useEffect(() => {
    console.log(Ctx.current.accessToken);

    if (Ctx.current.accessToken) {
      UserCtx.current.setIsLogged(true);
    } else {
      console.log("not Logged");
      UserCtx.current.setIsLogged(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-Color1 min-w-screen">
      <Loader />
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
