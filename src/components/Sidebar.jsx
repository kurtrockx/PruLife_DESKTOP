import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.svg";
import proposalsIcon from "../assets/proposalsIcon.svg";
import announcementIcon from "../assets/announcementIcon.svg";
import clientsIcon from "../assets/clientsIcon.svg";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const pages = [
  { name: "Dashboard", icon: dashboardIcon },
  { name: "Clients", icon: clientsIcon },
  { name: "Announcement", icon: announcementIcon },
];

export default function Sidebar() {
  const textResponsive = "xl:text-sm text-xs";
  const logoResponsive = "2xl:h-6 lg:h-5 h-5";
  const { darkMode, setDarkMode } = useTheme();

  return (
    <aside className="group z-20 flex h-full max-w-[6rem] justify-between flex-col items-center bg-red-900 px-2 py-4 shadow-[0_0_.25rem] shadow-black/40 transition-all duration-400 hover:max-w-[12rem] lg:hover:max-w-[14em] 2xl:hover:max-w-[16em] dark:bg-neutral-950">
      <nav className="flex w-full flex-col gap-2 lg:gap-4">
        {pages.map((p) => (
          <NavLink
            key={p.name}
            to={p.name.toLowerCase()}
            className={({ isActive }) =>
              `group/nav flex w-full items-center justify-start rounded-lg px-4 py-3 transition-all duration-100 hover:bg-black/40 dark:hover:bg-white/40 ${
                isActive ? "bg-black/40 dark:bg-white/40" : ""
              }`
            }
          >
            {/* Icon */}
            <div className="flex aspect-square min-w-[2.5rem] items-center justify-center">
              <img
                src={p.icon}
                alt={p.name}
                className={`${logoResponsive} duration-300 group-hover/nav:-translate-y-0.5`}
              />
            </div>

            {/* Label */}
            <span
              className={`w-0 overflow-hidden whitespace-nowrap text-white opacity-0 transition-all duration-500 ${textResponsive} group-hover:w-full group-hover:opacity-100`}
            >
              {p.name}
            </span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="group/nav flex w-full items-center justify-center  place-self-end rounded-lg bg-black px-3 py-2 transition-all hover:bg-black/80 dark:bg-black/80 dark:hover:bg-white/40"
      >
        {/* Icon (same layout as others) */}
        <div className="flex aspect-square min-w-[2.5rem] items-center justify-center">
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 group-hover/nav:rotate-90" />
          ) : (
            <Moon className="h-5 w-5 text-blue-300 transition-transform duration-300 group-hover/nav:-rotate-12" />
          )}
        </div>
      </button>
    </aside>
  );
}
