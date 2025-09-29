export function ChatMessage({ message }) {
  const { sender, message: text } = message;
  const senderStyle = sender === "admin"
    ? "self-end bg-blue-500 rounded-tr-none text-white duration-400 starting:translate-x-[100%]"
    : "self-start bg-black/20 rounded-tl-none text-black/80 duration-400 starting:-translate-x-[100%]";
  const messageStyle = "p-2 rounded-2xl max-w-2xl";

  return (
    <div className={`${senderStyle} ${messageStyle}`}>
      <p>{text}</p>
    </div>
  );
}
