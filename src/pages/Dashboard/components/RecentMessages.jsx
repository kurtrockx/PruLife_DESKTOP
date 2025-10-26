export default function RecentMessages({ messages }) {
  console.log(messages);
  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-neutral-800">
      <h2 className="mb-4 text-lg font-semibold">Recent Messages</h2>
      {messages.length > 0 ? (
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li
              key={index}
              className="flex justify-between rounded-lg bg-neutral-100 p-3 text-sm dark:bg-neutral-700"
            >
              <div>
                <p className="font-medium">
                  {msg.sender === "admin" && "Admin > "} {msg.client}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {msg.message}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleString()
                  : "N/A"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent messages</p>
      )}
    </div>
  );
}
