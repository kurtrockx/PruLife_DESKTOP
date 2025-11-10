import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { fetchAllUsers, listenToDB } from "./backend/firebase_firestore";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const prevMessagesRef = useRef({}); // store previous messages per client

  useEffect(() => {
    const setupListeners = async () => {
      const users = await fetchAllUsers();

      users.forEach((user) => {
        // initialize previous messages
        prevMessagesRef.current[user.id] = user.messages || [];

        // set up listener for each client
        listenToDB(user.id, (data) => {
          const prevMessages = prevMessagesRef.current[user.id] || [];
          const newMessages = (data?.messages || []).filter(
            (msg) =>
              msg.sender !== "admin" &&
              !msg.read &&
              !prevMessages.some(
                (m) =>
                  m.createdAt === msg.createdAt && m.message === msg.message,
              ),
          );

          if (newMessages.length > 0) {
            newMessages.forEach((msg) => {
              toast(
                <div>
                  <strong>New message from {msg?.sender}</strong>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.8,
                      color: "#999999",
                      whiteSpace: "nowrap", // single line
                      overflow: "hidden", // hide overflow
                      textOverflow: "ellipsis", // show '...'
                      maxWidth: "280px", // adjust width as needed
                    }}
                  >
                    {msg?.message}
                  </div>
                </div>,
                {
                  style: {
                    backgroundColor: "#ffffff", // white background
                    color: "#7f111a", // black text
                    borderRadius: "10px",
                    padding: "0.95rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                },
              );
            });
          }

          // update the ref for next comparison
          prevMessagesRef.current[user.id] = data?.messages || [];
        });
      });
    };

    setupListeners();
  }, []);

  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <div className="flex h-full">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          closeOnClick={true}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
