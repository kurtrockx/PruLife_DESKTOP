import { useParams } from "react-router-dom";
import { CLIENTS } from "../../../sampleData/clients";

export default function ClientDetails() {
  const { clientId } = useParams();
  const client = CLIENTS.find((c) => c.name === clientId);

  return (
    <>
      <img
        src="https://avatars.githubusercontent.com/u/170799880?v=4"
        alt="client picture"
        className="block aspect-square w-1/2 rounded object-cover"
      />
      <ul className="mx-auto flex w-full flex-1 flex-col items-center justify-center text-center">
        <li>{client.name}</li>
        <li>{client.age}</li>
        <li>{client.status}</li>
      </ul>
    </>
  );
}
