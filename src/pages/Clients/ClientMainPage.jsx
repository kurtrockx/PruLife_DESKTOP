import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function ClientMainPage() {
  const ClientTabStyle =
    "rounded-xl p-2 shadow-sm duration-150 hover:-translate-y-0.5 dark:bg-black dark:text-white";

  const location = useLocation();
  const currentTabOpen = location.pathname.split("/")[3];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 dark:bg-neutral-700">
      <div className="clientMainPage flex gap-4">
        <NavLink className={ClientTabStyle} to={"details"}>
          Client Details
        </NavLink>
        <NavLink className={ClientTabStyle} to={"chat"}>
          Open Chat
        </NavLink>
      </div>
      <div
        className={`flex aspect-video max-h-[90%] flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_0_10px] shadow-black/20 max-2xl:max-w-[90%] dark:border dark:border-white/40 dark:bg-black ${currentTabOpen === "chat" && "flex-col"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
