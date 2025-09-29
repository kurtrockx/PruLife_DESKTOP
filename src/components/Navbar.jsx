import { Link } from "react-router-dom";
import prulifeLogo from "../assets/prulifeLogo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-center bg-white shadow-md">
      <Link to={'dashboard'} className="flex max-h-20 items-center justify-center gap-2 p-2">
        <img
          src={prulifeLogo}
          alt="prulife"
          className="h-full rounded-full object-contain p-1 shadow-[0_0_.25rem] shadow-black/40"
        />
        <p className="text-lg font-bold">PRULIFE ADMIN SYSTEM</p>
      </Link>
    </nav>
  );
}
