import prulifeLogo from "../assets/prulifeLogo.png";

export default function Navbar() {
  return (
    <nav className="bg-red-blue max-h-20 p-2 shadow-md flex items-center gap-2 justify-center">
          <img
            src={prulifeLogo}
            alt="prulife"
            className="h-full object-contain"
          />
          <p className="text-lg font-bold text-[#450509]">
            PRULIFE INSURANCE UK
          </p>
    </nav>
  );
}
