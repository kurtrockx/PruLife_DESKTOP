import chatIcon from "../assets/chatIcon.svg";
import addPost from "../assets/addPost.svg";
import calculator from "../assets/calculator.svg";

const pages = [
  { name: "Chat Support Section", icon: chatIcon },
  { name: "Proposal Calculation Panel", icon: calculator },
  { name: "Create a New Post or Make an Announcement", icon: addPost },
];

export default function Sidebar() {
  return (
    <div className="flex max-w-[5em] flex-1 flex-col gap-6 bg-red-950 px-2 py-6">
      {pages.map((p) => (
        <div className="group relative">
          <img
            src={p.icon}
            alt={p.name}
            className="cursor-pointer rounded-xl p-2 duration-150 hover:-translate-y-0.5 hover:bg-white/20"
          />
          <p className="absolute top-0 -right-4 translate-x-full cursor-default rounded-2xl rounded-bl-none bg-white px-4 py-2 font-semibold whitespace-nowrap opacity-0 shadow-[2px_2px_4px] shadow-black/40 delay-200 duration-200 group-hover:opacity-100">
            {p.name}
          </p>
        </div>
      ))}
    </div>
  );
}
