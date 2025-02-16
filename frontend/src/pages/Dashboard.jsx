import Chart from "../components/Chart";


const Dashboard = () => {
    return (
        <div className="md:p-10 lg:p-12 flex-1 bg-gray-100 min-h-screen">
            <h1 className="text-4xl md:text-6xl font-bold">Let's start your new <br/> happy day!</h1>
            <p className="text-gray-500 md:text-gray-700 mt-5">
                Check the calendar to see what interesting tasks are waiting  for you today.
            </p>

            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg shadow-orange-600/50 hover:bg-orange-600 transition duration-300 ease-in-out">
                My Calendar
            </button>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-white p-5 border border-gray-200 shadow-lg hover:shadow-2xl transition rounded-lg">
                    <h2 className="text-xl font-semibold">Team Efficiency</h2>
                    <p className="text-2xl font-bold">88%</p>
                </div>

                <Chart/>
            </div>

  
      
    
        </div>
    );
};

export default Dashboard;
