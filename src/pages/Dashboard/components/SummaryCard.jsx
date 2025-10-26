export default function SummaryCard({ title, value, color }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-neutral-800">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-3xl font-bold ${color || ""}`}>{value}</p>
    </div>
  );
}
