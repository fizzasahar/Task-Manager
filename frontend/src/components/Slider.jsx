import { FaCalendar, FaTasks, FaChartBar, FaCog, FaHome, FaUser, FaSearch } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-black text-white p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <FaUser className="text-xl" />
          <h2 className="text-lg font-semibold">Annabel Rio</h2>
        </div>
        <div class=" flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
          <FaSearch />

          <input
            class="placeholder:text-gray-400 placeholder:italic ... focus:outline-none"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
        </div>
        <br />
        <ul className="space-y-4">

          <h6>Home</h6>
          <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
            <FaHome /> Overview
          </li>
          <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
            <FaCalendar /> Calendar
          </li>
          <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
            <FaTasks /> Tasks
          </li>
          <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
            <FaChartBar /> Analytics
          </li>
          <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer">
            <FaCog /> Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
