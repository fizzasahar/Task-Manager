import Sidebar from "./components/Slider";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./components/MoodTracker";



import "./styles/global.css"

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
      <MoodTracker/>
   
    </div>
  );
};

export default App;
