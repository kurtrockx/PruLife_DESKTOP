export default function ChartCard({ title, children, fullWidth }) {
  return (
    <div
      className={`h-64 w-full rounded-xl bg-white p-4 shadow dark:bg-neutral-800 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
