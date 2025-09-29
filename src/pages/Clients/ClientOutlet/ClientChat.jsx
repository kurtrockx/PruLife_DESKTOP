import { useEffect, useState } from "react";
import { listenToDB, pushMessage } from "../../../backend/firebase_firestore";
import { useParams } from "react-router-dom";

import Loading from "../../../components/Loading";
import { ChatMessage } from "./chat-components/ChatMessage";
import { ChatMessagesContainer } from "./chat-components/ChatMessagesContainer";
import { TypeBox } from "./chat-components/TypeBox";
import { ChatHeader } from "./chat-components/ChatHeader";

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
