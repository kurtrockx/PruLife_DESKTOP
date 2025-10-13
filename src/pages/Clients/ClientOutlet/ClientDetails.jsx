import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllUsers } from "../../../backend/firebase_firestore";
import Loading from "../../../components/Loading";

export default function ClientDetails() {
  const { clientId } = useParams();
  const [client, setClient] = useState("");

  useEffect(() => {
    const getClients = async () => {
      const users = await fetchAllUsers();
      setClient(users.find((c) => c.id === clientId));
    };
    getClients();
  }, [clientId]);

  return (
    <>
      <img
        src="https://avatars.githubusercontent.com/u/170799880?v=4"
        alt="client picture"
        className="block aspect-square w-1/2 rounded object-cover"
      />
      {client === "" ? (
        <Loading />
      ) : (
        <ul className="mx-auto flex w-full flex-1 flex-col items-center justify-center text-center">
          <li>{client?.fullname}</li>
          <li>{client?.contactNumber}</li>
          <li>{client?.email}</li>
          <li>{client?.occupation}</li>
          <li>{client?.status}</li>
        </ul>
      )}
    </>
  );
}
