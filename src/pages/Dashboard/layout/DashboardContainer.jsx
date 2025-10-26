export default function DashboardContainer({ children }) {
  return (
    <div className="flex-1 bg-neutral-700 flex justify-center items-center">
      <div className="flex max-h-[80dvh] max-w-[80dvw] rounded-xl flex-col flex-1 gap-10 overflow-y-scroll p-6 dark:bg-neutral-900 dark:text-white">
        {children}
      </div>
    </div>
  );
}
