export function ChatMessage({ message }) {
  const { sender, message: text, createdAt } = message;

  // Format the time logic
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      // Show time if within 24 hours
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays < 7) {
      // Show "x days ago" if within a week
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else {
      // Show date if more than a week
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const senderStyle =
    sender === "admin"
      ? "self-end bg-blue-500 rounded-tr-none text-white duration-400 starting:translate-x-[100%]"
      : "self-start bg-black/20 rounded-tl-none text-black/80 duration-400 starting:-translate-x-[100%]";
  const messageStyle = "p-2 rounded-2xl max-w-2xl wrap-anywhere";

  return (
    <div
      className={`flex flex-col ${sender === "admin" ? "items-end" : "items-start"}`}
    >
      <span className="mt-1 text-xs text-gray-500">
        {formatTimestamp(createdAt)}
      </span>
      <div className={`${senderStyle} ${messageStyle}`}>
        <p>{text}</p>
      </div>
    </div>
  );
}
