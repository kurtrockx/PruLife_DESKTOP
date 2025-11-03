import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ data = [], dataKey, xKey, color }) {
  if (!Array.isArray(data) || data.length === 0)
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        No data available
      </p>
    );

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <XAxis dataKey={xKey} tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}
