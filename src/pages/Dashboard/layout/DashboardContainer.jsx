export default function DashboardContainer({ children }) {
  return (
    <div className="from-white-50 flex flex-1 items-center justify-center bg-gradient-to-br via-neutral-300 to-white dark:from-neutral-700 dark:via-neutral-950 dark:to-black">
      <div className="flex max-h-[80dvh] max-w-[80dvw] flex-1 flex-col gap-6 overflow-y-scroll rounded-xl p-6 text-sm dark:bg-neutral-900 dark:text-white">
        {children}
      </div>
    </div>
  );
}
