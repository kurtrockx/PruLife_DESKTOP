import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.svg";
import proposalsIcon from "../assets/proposalsIcon.svg";
import reportsIcon from "../assets/reportsIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import clientsIcon from "../assets/clientsIcon.svg";

const pages = [
  { name: "Dashboard", icon: dashboardIcon },
  { name: "Clients", icon: clientsIcon },
  { name: "Proposals", icon: proposalsIcon },
  { name: "Reports", icon: reportsIcon },
  { name: "Settings", icon: settingsIcon },
];

export default function Sidebar() {
  const textResponsive = "xl:text-base md:text-sm text-xs";
  const logoResponsive = "2xl:h-10 lg:h-8 h-6";

  return (
    <div className="sidebar z-20 flex max-w-[12em] flex-1 flex-col items-center gap-6 bg-red-950 px-2 py-4 shadow-[0_0_.25rem] shadow-black/40 lg:max-w-[14em] lg:gap-4 2xl:max-w-[16em]">
      {pages.map((p) => (
        <NavLink
          key={p.name}
          className="group relative flex w-full items-center justify-center rounded-xl px-2 py-1 hover:bg-white/20 lg:px-px lg:py-2.5"
          to={p.name.toLowerCase()}
        >
          <img
            src={p.icon}
            alt={p.name}
            className={`aspect-square flex-1 cursor-pointer duration-150 group-hover:-translate-y-0.5 ${logoResponsive}`}
          />
          <p className={`flex-2 px-px font-semibold text-white ${textResponsive}`}>
            {p.name}
          </p>
        </NavLink>
      ))}
    </div>
  );
}
