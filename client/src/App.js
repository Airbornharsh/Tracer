import { useContext, useEffect, useRef } from "react";
import Context from "./Context/Context";
import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";

function App() {
  const Ctx = useContext(Context);
  const UserCtx = useRef(useContext(Context).user);

  // window.localStorage.setItem("Tracer-Backend-URI", "http://localhost:4000");
  window.localStorage.setItem("Tracer-Backend-URI", "https://mtrace.herokuapp.com");

  useEffect(() => {
    console.log(Ctx.accessToken);

    if (Ctx.accessToken) {
      UserCtx.current.setIsLogged(true);
    } else {
      console.log("not Logged");
      UserCtx.current.setIsLogged(false);
    }
  }, [Ctx.accessToken]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-Color1 min-w-screen">
      <Loader />
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
