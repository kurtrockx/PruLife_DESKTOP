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
      <div className="flex aspect-video max-h-[90%] flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0_10px] shadow-black/20 max-2xl:max-w-[90%]">
        <Outlet />
      </div>
    </div>
  );
}
