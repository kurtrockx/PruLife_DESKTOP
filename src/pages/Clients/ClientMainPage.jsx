import { Link, Outlet } from "react-router-dom";

export default function ClientMainPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex gap-4">
        <Link className="border" to={""}>
          Client Details
        </Link>
        <Link className="border" to={"chat"}>
          Open Chat
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
