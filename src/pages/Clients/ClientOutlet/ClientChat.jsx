import { useEffect, useRef, useState } from "react";
import { listenToDB, pushMessage } from "../../../backend/firebase_firestore";
import { useParams } from "react-router-dom";
import sendIcon from "../../../assets/sendIcon.svg";
import Loading from "../../../components/Loading";

export default function ClientChat() {
  const { clientId } = useParams();
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = listenToDB(clientId, (data) => {
      setMessagesList(data?.messages || []); // handle case where no messages yet
      console.log("Realtime update:", data);
    });

    return () => unsubscribe();
  }, [clientId]);

  const handleSend = () => {
    if (!message.trim()) return; // prevent empty messages
    pushMessage(clientId, "admin", message.trim());
    setMessage(""); // clear input after sending
  };

  return (
    <>
      <ChatHeader clientId={clientId} />
      <ChatMessagesContainer>
        {messagesList.length < 1 ? (
          <Loading />
        ) : (
          messagesList.map((msg, i) => <ChatMessage message={msg} key={i} />)
        )}
      </ChatMessagesContainer>
      <TypeBox message={message} setMessage={setMessage} onSend={handleSend} />
    </>
  );
}

function ChatHeader({ clientId }) {
  return (
    <div className="bg-red-950 p-2 text-center text-white">{clientId}</div>
  );
}

function TypeBox({ message, setMessage, onSend }) {
  const InputStylish =
    "shadow-[0_0_0_2.5px] shadow-red-950/0 duration-200 focus-within:shadow-red-950 hover:shadow-red-950";

  return (
    <div className="flex max-h-[10%] flex-1 items-center gap-2 p-[0.75rem] shadow-[0_-2px_10px] shadow-black/10 max-xl:py-2">
      <div
        className={`flex flex-1 rounded-full bg-black/10 px-2 text-black placeholder:text-black/80 ${InputStylish}`}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Aa"
          className="flex-1 px-2 py-2.5 text-xl outline-0"
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
      </div>
      <img
        onClick={onSend}
        src={sendIcon}
        alt="sendIcon"
        className="max-h-full cursor-pointer rounded-full p-1.5 hover:bg-black/10"
      />
    </div>
  );
}

function ChatMessagesContainer({ children }) {
  const scrollableContainerRef = useRef(null);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div
      ref={scrollableContainerRef}
      className="flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-scroll px-2 py-4"
    >
      {children}
    </div>
  );
}

function ChatMessage({ message }) {
  const { sender, message: text } = message;
  const senderStyle =
    sender === "admin"
      ? "self-end bg-blue-500 rounded-tr-none text-white duration-400 starting:translate-x-[100%]"
      : "self-start bg-black/20 rounded-tl-none text-black/80 duration-400 starting:-translate-x-[100%]";
  const messageStyle = "p-2 rounded-2xl max-w-2xl";

  return (
    <div className={`${senderStyle} ${messageStyle}`}>
      <p>{text}</p>
    </div>
  );
}
