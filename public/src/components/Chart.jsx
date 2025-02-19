import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "New", value: 28, color: "#FFBB28" },
  { name: "Completed", value: 42, color: "#8884d8" },
  { name: "In Progress", value: 30, color: "#000000" },
];

const Chart = () => {
  return (
    <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Progress</h2>
      <div className="h-40  flex justify-center">
        <ResponsiveContainer >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={60}
              label
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
