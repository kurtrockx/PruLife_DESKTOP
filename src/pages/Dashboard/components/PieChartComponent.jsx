import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartComponent({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0)
    return <p className="text-sm text-gray-500">No data available</p>;

  return (
    <ResponsiveContainer width="100%" height="90%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, value }) => `${name} (${value})`}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
