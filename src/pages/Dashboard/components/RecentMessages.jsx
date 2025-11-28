import { Link } from "react-router-dom";

export default function RecentMessages({ messages, clients }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-neutral-800">
      <h2 className="mb-4 text-lg font-semibold">Recent Messages</h2>
      {messages.length > 0 ? (
        <ul className="space-y-2">
          {messages.map((msg, index) => {
            // Find the client for this specific message
            const clientFind = clients.find((c) => c.fullname === msg.client);

            return (
              <Link
                key={index}
                to={`/app/clients/${clientFind?.id || ""}/chat`}
                className="block"
              >
                <li className="grid grid-cols-8 items-center justify-between rounded-lg bg-neutral-100 p-3 text-sm dark:bg-neutral-700 hover:brightness-90">
                  <div className="col-span-7 flex flex-col justify-center gap-1">
                    <p className="font-medium">
                      {msg.sender === "admin" && "Admin > "} {msg.client}
                    </p>
                    <p className="break-all text-gray-600 dark:text-gray-300">
                      {msg.message}
                    </p>
                  </div>
                  <span className="text-center text-xs text-gray-500">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleString()
                      : "N/A"}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent messages</p>
      )}
    </div>
  );
}
