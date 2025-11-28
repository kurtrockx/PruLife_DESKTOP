import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import PDFGenerator from "../../components/PDFGenerator";
import backIcon from "../../assets/backIcon.svg";

export default function ClientMainPage() {
  const [openPdfModal, setOpenPdfModal] = useState(false);

  const ClientTabStyle =
    "rounded-xl p-2 shadow-sm duration-150 hover:-translate-y-0.5 dark:bg-white/10 dark:text-white bg-white/50";

  const location = useLocation();
  const currentTabOpen = location.pathname.split("/")[4];

  return (
    <div className="from-white-50 flex flex-1 flex-col items-center justify-center gap-2 bg-gradient-to-br via-neutral-300 to-white dark:from-neutral-700 dark:via-neutral-950 dark:to-black">
      <div className="clientMainPage flex gap-4">
        <NavLink
          className={`clientBackButton h-10 drop-shadow-xs drop-shadow-yellow-400 duration-150 hover:-translate-y-0.5 dark:drop-shadow-transparent dark:hover:drop-shadow-yellow-400`}
          to={"/app/clients"}
        >
          <img src={backIcon} alt="back" className="h-full object-contain" />
        </NavLink>
        <NavLink className={ClientTabStyle} to={"details"}>
          Client Details
        </NavLink>
        <NavLink className={ClientTabStyle} to={"chat"}>
          Open Chat
        </NavLink>
      </div>
      <div
        className={`flex aspect-video max-h-[90%] flex-1 gap-4 overflow-hidden max-2xl:max-w-[90%]`}
      >
        <div
          className={`flex flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_0_10px] shadow-black/20 dark:border dark:border-white/40 dark:bg-black ${currentTabOpen === "chat" && "flex-col"}`}
        >
          <Outlet context={{ openPdfModal, setOpenPdfModal }} />
        </div>
        <div
          className={`cursor-pointer max-xl:hidden ${currentTabOpen !== "chat" && "hidden"} group z-100 origin-top-right -translate-y-12 duration-200 [zoom:30%] hover:translate-y-0 hover:scale-125`}
          onClick={() => setOpenPdfModal(!openPdfModal)}
        >
          <h4 className="px-4 py-2 text-right text-4xl opacity-0 duration-200 group-hover:opacity-100 dark:text-white">
            Click to open <span className="font-bold">Proposal</span>
          </h4>
          <div className="pointer-events-none dark:border dark:border-white">
            <PDFGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}
