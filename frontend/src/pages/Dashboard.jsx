import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "New", value: 28, color: "#FFBB28" },
    { name: "Completed", value: 42, color: "#8884d8" },
    { name: "In Progress", value: 30, color: "#000000" },
];

const Dashboard = () => {
    return (
        <div className="p-8 flex-1 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold">Let's start your new happy day!</h1>
            <p className="text-gray-600 mt-2">
                Check the calendar to see what interesting tasks are waiting for you today.
            </p>

            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                My Calendar
            </button>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="bg-white p-5 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold">Team Efficiency</h2>
                    <p className="text-2xl font-bold">88%</p>
                </div>

                <div className="bg-white p-5 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold">Project Efficiency</h2>
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} dataKey="value" outerRadius={50} label>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
