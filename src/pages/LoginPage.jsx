import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/prulifeLogo.svg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctUsername = "prulifeAdmin";
    const correctPassword = "admin123";

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/app", { replace: true });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: "<span style='font-size: 1rem'>Wrong username or password. Try again.</span>",
        showCloseButton: true, // show the X button
        confirmButtonColor: "#f59e0b",
        width: 450,
        padding: "1.5rem",
        customClass: {
          closeButton: "text-xs top-2 right-2", // smaller X and adjust spacing
        },
      });
    }
  };

  return (
    <div className="from-white-50 flex h-screen">
      <div className="drag-region fixed top-0 left-0 h-10 w-full"></div>

      {/* LEFT — Branding Panel */}
      <div className="hidden items-center justify-center bg-black md:flex md:w-1/2">
        <div className="px-8 text-center">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-6 h-16 opacity-90 drop-shadow-lg md:h-24"
          />
          <h2 className="text-xl font-semibold tracking-wide text-white md:text-2xl">
            Prulife UK Admin Portal
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/70 md:text-base">
            Manage clients, handle inquiries, create announcements, and send
            automated proposals with ease.
          </p>
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-red-900"></div>
        </div>
      </div>

      {/* RIGHT — Login Panel */}
      <div className="flex w-full flex-col justify-center px-6 sm:px-12 md:w-1/2">
        {/* Logo (Mobile) */}
        <div className="mb-6 flex justify-center md:hidden">
          <img src={logo} className="h-10 sm:h-14" alt="Logo" />
        </div>

        <div className="py-4">
          <h1 className="mb-3 text-center text-xl font-bold text-black sm:text-2xl md:text-3xl">
            Welcome Back
          </h1>
          <p className="mb-6 text-center text-sm text-black/70 sm:text-base">
            Login to access your administrator dashboard.
          </p>
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold text-black/80 sm:text-base">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full rounded-lg border border-black/40 bg-white p-3 text-sm shadow-[0_0_0_1.5px] shadow-red-900/0 transition-all duration-200 placeholder:text-black/50 hover:shadow-yellow-500 focus:shadow-yellow-500 focus:outline-none sm:text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-semibold text-black/80 sm:text-base">
            Administrator Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-black/40 bg-white p-3 text-sm shadow-[0_0_0_1.5px] shadow-red-900/0 transition-all duration-200 placeholder:text-black/50 hover:shadow-yellow-500 focus:shadow-yellow-500 focus:outline-none sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-yellow-500 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-yellow-400 active:scale-95 sm:text-base"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-black/60 sm:text-sm">
          © {new Date().getFullYear()} Prulife UK Admin System
        </p>
      </div>
    </div>
  );
}
