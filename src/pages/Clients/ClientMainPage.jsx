import { Link, Outlet } from "react-router-dom";

export default function ClientMainPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <div className="flex gap-4">
        <Link className="border" to={""}>
          Client Details
        </Link>
        <Link className="border" to={"chat"}>
          Open Chat
        </Link>
      </div>
      <div className="flex aspect-video max-h-[80%] flex-1 flex-col bg-blue-800/20 max-xl:max-w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}
