import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";

function App() {
// window.localStorage.setItem("Tracer-Backend-URI", "http://localhost:4000");
window.localStorage.setItem("Tracer-Backend-URI", "https://mtrace.herokuapp.com");

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-Color1 min-w-screen">
      <Loader />
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
