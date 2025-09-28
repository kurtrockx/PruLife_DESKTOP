import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.svg";
import policiesIcon from "../assets/policiesIcon.svg";
import proposalsIcon from "../assets/proposalsIcon.svg";
import reportsIcon from "../assets/reportsIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import clientsIcon from "../assets/clientsIcon.svg";

const pages = [
  { name: "Dashboard", icon: dashboardIcon },
  { name: "Clients", icon: clientsIcon },
  { name: "Policies", icon: policiesIcon },
  { name: "Proposals", icon: proposalsIcon },
  { name: "Reports", icon: reportsIcon },
  { name: "Settings", icon: settingsIcon },
];

export default function Sidebar() {
  return (
    <div className="z-100 flex max-w-[5em] flex-1 flex-col items-center gap-6 bg-red-950 px-2 py-6">
      {pages.map((p) => (
        <NavLink
          key={p.name}
          className="group relative flex aspect-square w-full items-center justify-center rounded-xl p-4 hover:bg-white/20"
          to={p.name.toLowerCase()}
        >
          <img
            src={p.icon}
            alt={p.name}
            className="cursor-pointer duration-150 group-hover:-translate-y-0.5"
          />
        </NavLink>
      ))}
    </div>
  );
}
