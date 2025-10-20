import { useTheme } from "../../hooks/useTheme";

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black transition-colors duration-300 dark:bg-neutral-900 dark:text-white">
      <div className="w-[90%] max-w-md rounded-xl border border-black/10 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-neutral-800">
        <h1 className="mb-6 text-center text-2xl font-bold">Settings</h1>

        <div className="flex items-center justify-between">
          <span className="font-medium">Dark Mode</span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative h-7 w-14 rounded-full transition ${
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
