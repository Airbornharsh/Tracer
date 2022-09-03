import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";

function App() {
  return (
    <div className="bg-Color1 min-h-screen min-w-screen flex flex-col justify-start items-center">
      <Loader />
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
