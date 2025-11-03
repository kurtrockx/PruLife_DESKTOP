import { useTheme } from "../hooks/useTheme";
import prulifeLogo from "../assets/prulifeLogo.svg";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="relative z-1000 flex justify-center bg-white shadow-md dark:bg-neutral-900 dark:text-white">
      <div className="flex max-h-20 items-center justify-center gap-2 p-2">
        <button
          className="relative z-10 h-full cursor-pointer rounded-full object-contain p-1 shadow-[0_0_.25rem] dark:bg-white dark:shadow-none"
          onClick={() => setDarkMode(!darkMode)}
        >
          <img
            src={prulifeLogo}
            alt="prulife"
            className="h-full w-full shadow-black/40"
          />
        </button>
        <p className="text-lg font-bold">PRULIFE ADMIN SYSTEM</p>
      </div>
      <div className="drag-region absolute top-0 right-0 z-5 h-full w-full"></div>
    </nav>
  );
}

// <button
//   onClick={() => setDarkMode(!darkMode)}
//   className="group/nav mt-2 flex w-full items-center rounded-lg px-3 py-2 transition-all hover:bg-white/20"
// >
//   {/* Icon (same layout as others) */}
//   <div className="fixed top-0 right-0 flex aspect-square min-w-[2.5rem] items-center justify-center">
//     {darkMode ? (
//       <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 group-hover/nav:rotate-90" />
//     ) : (
//       <Moon className="h-5 w-5 text-blue-300 transition-transform duration-300 group-hover/nav:-rotate-12" />
//     )}
//   </div>
// </button>;
