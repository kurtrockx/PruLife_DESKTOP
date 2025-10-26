import { useTheme } from "../../hooks/useTheme";

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="from-white-50 flex min-h-screen flex-1 flex-col items-center justify-center bg-gradient-to-br via-neutral-300 to-white transition-colors duration-300 dark:from-neutral-700 dark:via-neutral-950 dark:to-black">
      <div className="w-[90%] max-w-md rounded-xl border border-black/10 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <span className="font-medium dark:text-white transition-colors">Dark Mode</span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative h-7 w-14 cursor-pointer rounded-full transition ${
              darkMode ? "bg-yellow-400" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}
