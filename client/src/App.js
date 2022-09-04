import NavBar from "./Layout/NavBar";
import RoutesContainer from "./Routes";
import Loader from "./Utils/Loader";

function App() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-Color1 min-w-screen">
      <Loader />
      <NavBar />
      <RoutesContainer />
    </div>
  );
}

export default App;
