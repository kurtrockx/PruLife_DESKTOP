export default function ChartCard({ title, children, fullWidth }) {
  return (
    <div
      className={`h-64 w-full rounded-xl bg-white p-4 shadow dark:bg-neutral-800 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <h2 className="mb-2 text-sm font-semibold sm:text-sm md:text-base">
        {title}
      </h2>
      {children}
    </div>
  );
}
