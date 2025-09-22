import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
