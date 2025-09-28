import { useParams } from "react-router-dom";
import { CLIENTS } from "../../../sampleData/clients";
import clientsIcon from "../../../assets/clientsIcon.svg";

export default function ClientDetails() {
  const { clientId } = useParams();
  const client = CLIENTS.find((c) => c.name === clientId);

  return (
    <>
      <img src={clientsIcon} alt="client picture" className="max-h-[20%]" />
      <ul className="mx-auto flex flex-col text-center">
        <li>{client.name}</li>
        <li>{client.age}</li>
        <li>{client.status}</li>
      </ul>
    </>
  );
}
