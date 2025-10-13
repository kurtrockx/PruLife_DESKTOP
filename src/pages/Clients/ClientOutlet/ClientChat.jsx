import { useEffect, useState } from "react";
import { listenToDB, pushMessage } from "../../../backend/firebase_firestore";
import { useParams } from "react-router-dom";
import { fetchAllUsers } from "../../../backend/firebase_firestore";

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

  useEffect(() => {
    const getClients = async () => {
      const users = await fetchAllUsers();
      setClient(users.find((c) => c.id === clientId));
    };
    getClients();
  }, [clientId]);

  const [openPdfModal, setOpenPdfModal] = useState(false);

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
      <ChatHeader clientId={client === "" ? <Loading/> : client.fullname} />
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
      className="fixed top-0 left-0 z-100 flex max-h-dvh min-h-dvh min-w-dvw justify-center overflow-hidden bg-black/40 p-5 backdrop-blur-sm"
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
