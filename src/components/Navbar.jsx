import prulifeLogo from "../assets/prulifeLogo.png";

export default function Navbar() {
  return (
    <nav className="bg-red-blue flex max-h-20 items-center justify-center gap-2 p-2 shadow-md">
      <img src={prulifeLogo} alt="prulife" className="h-full object-contain" />
      <p className="text-lg font-bold">PRULIFE ADMIN SYSTEM</p>
    </nav>
  );
}
