import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.svg";
import proposalsIcon from "../assets/proposalsIcon.svg";
import announcementIcon from "../assets/announcementIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import clientsIcon from "../assets/clientsIcon.svg";

const pages = [
  { name: "Dashboard", icon: dashboardIcon },
  { name: "Clients", icon: clientsIcon },
  { name: "Proposals", icon: proposalsIcon },
  { name: "Announcement", icon: announcementIcon },
  { name: "Settings", icon: settingsIcon },
];

export default function Sidebar() {
  const textResponsive = "xl:text-base md:text-sm text-xs";
  const logoResponsive = "2xl:h-10 lg:h-8 h-6";

  return (
    <aside className="group z-20 flex h-full max-w-[5rem] flex-col items-center bg-red-950 px-2 py-4 shadow-[0_0_.25rem] shadow-black/40 transition-all duration-400 hover:max-w-[12em] lg:hover:max-w-[14em] 2xl:hover:max-w-[16em] dark:bg-neutral-950">
      <nav className="flex w-full flex-col gap-2 lg:gap-4">
        {pages.map((p) => (
          <NavLink
            key={p.name}
            to={p.name.toLowerCase()}
            className={({ isActive }) =>
              `group/nav duratioe-500 flex w-full items-center rounded-lg px-3 py-2 transition-all hover:bg-white/20 ${
                isActive ? "bg-white/50" : ""
              }`
            }
          >
            {/* Icon */}
            <div className="flex min-w-[2.5rem] aspect-square items-center justify-center">
              <img
                src={p.icon}
                alt={p.name}
                className={`${logoResponsive} duration-300 group-hover/nav:-translate-y-0.5`}
              />
            </div>

            {/* Label */}
            <span
              className={`w-0 overflow-hidden pl-2 font-semibold whitespace-nowrap text-white opacity-0 transition-all duration-500 ${textResponsive} group-hover:w-full group-hover:opacity-100`}
            >
              {p.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
