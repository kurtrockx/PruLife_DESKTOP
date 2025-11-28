import { useEffect, useState } from "react";
import { listenToDB, pushMessage } from "../../../backend/firebase_firestore";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchAllUsers } from "../../../backend/firebase_firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../backend/firebase_firestore";

import Loading from "../../../components/Loading";

import { ChatMessage } from "./chat-components/ChatMessage";
import { ChatMessagesContainer } from "./chat-components/ChatMessagesContainer";
import { TypeBox } from "./chat-components/TypeBox";
import { ChatHeader } from "./chat-components/ChatHeader";
import PDFGenerator from "../../../components/PDFGenerator";

export default function ClientChat() {
  const { clientId } = useParams();
  const [client, setClient] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const { setOpenPdfModal, openPdfModal } = useOutletContext();
  console.log(openPdfModal)

  useEffect(() => {
    const getClients = async () => {
      const users = await fetchAllUsers();
      setClient(users.find((c) => c.id === clientId));
    };
    getClients();
  }, [clientId]);

  useEffect(() => {
    const unsubscribe = listenToDB(clientId, async (data) => {
      if (!data?.messages) return;

      setMessagesList(data.messages);

      // 🔹 Mark unread client messages as read
      const unread = data.messages.filter(
        (msg) => msg.sender !== "admin" && !msg.read,
      );

      if (unread.length > 0) {
        const userRef = doc(db, "users", clientId);
        const updatedMessages = data.messages.map((m) =>
          m.sender !== "admin" ? { ...m, read: true } : m,
        );
        await updateDoc(userRef, { messages: updatedMessages });
      }
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
      <ChatHeader clientId={client === "" ? <Loading /> : client.fullname} />
      {openPdfModal && <PDFModal onOpenPdfModal={setOpenPdfModal} />}
      <ChatMessagesContainer>
        {messagesList.length < 1 ? (
          <Loading />
        ) : (
          messagesList.map((msg, i) => <ChatMessage message={msg} key={i} />)
        )}
      </ChatMessagesContainer>
      <TypeBox
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        onOpenPdfModal={setOpenPdfModal}
      />
    </>
  );
}

function PDFModal({ onOpenPdfModal }) {
  return (
    <div
      className="fixed top-0 left-0 z-1000 flex flex-col max-h-dvh min-h-dvh min-w-dvw justify-center overflow-hidden bg-black/40 p-5 backdrop-blur-sm"
      onClick={() => onOpenPdfModal(false)}
    >
      <div
        className="max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <PDFGenerator />
      </div>
    </div>
  );
}
