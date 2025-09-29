import { useParams } from "react-router-dom";
import sendIcon from "../../../assets/sendIcon.svg";

const sampleMessages = [
  { sender: "admin", message: "Welcome to the chat!" },
  { sender: "user", message: "Hi, I need some help." },
  { sender: "admin", message: "Sure, what can I assist you with?" },
  { sender: "user", message: "I have a question about my account." },
  { sender: "admin", message: "Welcome to the chat!" },
  { sender: "user", message: "Hi, I need some help." },
  { sender: "admin", message: "Sure, what can I assist you with?" },
  { sender: "user", message: "I have a question about my account." },
  { sender: "admin", message: "Please provide more details about your query." },
  { sender: "admin", message: "Welcome to the chat!" },
  { sender: "user", message: "Hi, I need some help." },
  { sender: "admin", message: "Sure, what can I assist you with?" },
  { sender: "user", message: "I have a question about my account." },
  { sender: "admin", message: "Please provide more details about your query." },
  { sender: "admin", message: "Welcome to the chat!" },
  { sender: "user", message: "Hi, I need some help." },
  { sender: "admin", message: "Sure, what can I assist you with?" },
  { sender: "user", message: "I have a question about my account." },
  { sender: "admin", message: "Please provide more details about your query." },
  { sender: "admin", message: "Welcome to the chat!" },
  { sender: "user", message: "Hi, I need some help." },
  { sender: "admin", message: "Sure, what can I assist you with?" },
  { sender: "user", message: "I have a question about my account." },
  { sender: "admin", message: "Please provide more details about your query." },
];

export default function ClientChat() {
  const { clientId } = useParams();

  return (
    <>
      <ChatMessagesContainer>
        {sampleMessages.map((msg, i) => (
          <ChatMessage message={msg} key={i} />
        ))}
      </ChatMessagesContainer>
      <TypeBox />
    </>
  );
}

function TypeBox() {
  return (
    <div className="flex max-h-[10%] flex-1 items-center p-[0.75rem] shadow-[0_-2px_10px] shadow-black/10 max-xl:py-2">
      <div className="flex flex-1 rounded-full bg-black/10 px-2 py-2.5 text-black placeholder:text-black/80">
        <input
          type="text"
          placeholder="Aa"
          className="flex-1 px-2 text-xl outline-0"
        />
      </div>
      <img src={sendIcon} alt="sendIcon" className="max-h-full" />
    </div>
  );
}

function ChatMessagesContainer({ children }) {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-scroll px-2 py-4">
      {children}
    </div>
  );
}

function ChatMessage({ message }) {
  const { sender, message: text } = message;
  const senderStyle = `${sender === "admin" ? "self-end bg-blue-500 rounded-tr-none text-white" : "self-start bg-black/20 rounded-tl-none text-black/80"}`;
  const messageStyle = "p-2 rounded-2xl max-w-2xl";

  return (
    <div className={`${senderStyle} ${messageStyle}`}>
      <h1>
        {sender}: {text}
      </h1>
    </div>
  );
}
