import Sidebar from "./components/Slider";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css"

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
