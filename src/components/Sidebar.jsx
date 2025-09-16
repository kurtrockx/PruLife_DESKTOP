import chatIcon from "../assets/chatIcon.svg";
import addPost from "../assets/addPost.svg";
import calculator from "../assets/calculator.svg";

const pages = [
  { name: "chat", icon: chatIcon },
  { name: "calculator", icon: calculator },
  { name: "post", icon: addPost },
];

export default function Sidebar() {
  return (
    <div className="flex max-w-[5em] flex-col gap-6 bg-red-950 p-2">
      {pages.map((p) => (
        <img
          src={p.icon}
          alt={p.name}
          className="cursor-pointer p-2 duration-150 hover:-translate-y-0.5 hover:bg-white/20 rounded-xl"
        />
      ))}
    </div>
  );
}
