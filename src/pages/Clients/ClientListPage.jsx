import { Link } from "react-router-dom";
import { fetchAllUsers } from "../../backend/firebase_firestore";
import { useEffect, useState } from "react";

const CATEGORIES = [
  { label: "Name", maxWidth: "max-w-[30%]" },
  { label: "Age", maxWidth: "max-w-[10%]" },
  { label: "Contact No.", maxWidth: "max-w-[20%]" },
  { label: "Status", maxWidth: "max-w-[20%]" },
  { label: "Actions", maxWidth: "max-w-[20%]" },
];

export default function ClientListPage() {
  const [searchInput, setSearchInput] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const users = await fetchAllUsers();
      setClients(users);
    };
    getClients();
  }, []);

  const searchedClient = () => {
    if (!searchInput.trim()) return clients;

    return clients.filter(
      (c) =>
        c.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
        c.email.toLowerCase().includes(searchInput.toLowerCase()),
    );
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex flex-1 flex-col justify-center">
      <h1 className="mx-auto pt-20 text-2xl font-semibold">
        CLIENT MANAGEMENT PAGE
      </h1>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex max-h-[70dvh] w-[70dvw] flex-1 flex-col overflow-y-scroll rounded-tl-xl rounded-bl-xl border">
          <Categories onSearchInput={handleSearchInput} />
          <ClientsList clients={searchedClient()} />
        </div>
      </div>
    </div>
  );
}

function Categories({ onSearchInput }) {
  const textResponsive = "max-2xl:text-base max-xl:text-sm max-lg:text-xs";
  const paddingResponsive = "max-xl:px-1 max-xl:py-2 max-lg:px-0.5 py-4";

  return (
    <div className="sticky top-0 space-y-2 bg-white py-2">
      <SearchClient onSearchInput={onSearchInput} />
      <div className="flex flex-1 border border-red-950 bg-red-950 px-4 font-semibold text-white shadow-sm">
        {CATEGORIES.map((c, i) => (
          <h2
            key={i}
            className={`mx-auto flex-1 border-r border-black px-2 text-center whitespace-nowrap uppercase ${textResponsive} ${paddingResponsive} ${i === CATEGORIES.length - 1 && "border-transparent"} ${c.maxWidth}`}
          >
            {c.label}
          </h2>
        ))}
      </div>
    </div>
  );
}

function SearchClient({ onSearchInput }) {
  const InputStylish =
    "shadow-[0_0_0_2.5px] shadow-red-950/0 duration-200 focus-within:shadow-red-950 hover:shadow-red-950";

  return (
    <div
      className={`sticky top-0 ml-auto flex w-1/2 rounded-xl border border-black/40 px-4 py-2 ${InputStylish}`}
    >
      <input
        className={`flex-1 outline-0`}
        type="text"
        placeholder="Search for member"
        onChange={onSearchInput}
      />
    </div>
  );
}

function ClientsList({ clients }) {
  return (
    <div className="flex flex-col gap-y-2 p-4 px-2">
      {clients.map((client) => (
        <Client key={client.uid} client={client} />
      ))}
    </div>
  );
}

function Client({ client }) {
  const textResponsive = "max-2xl:text-base max-xl:text-sm max-lg:text-xs";
  const paddingResponsive = "max-xl:p-1 max-lg:px-0.25 max-lg:py-0.25";
  const clientDetailStyle = `flex-1 border-r p-2 text-xl whitespace-nowrap  flex items-center truncate justify-center ${textResponsive} ${paddingResponsive}`;

  const calculateAge = (birthdateStr) => {
    const birthDate = new Date(birthdateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="flex flex-1 border px-2">
      <h3 className={`${clientDetailStyle} max-w-[30%] capitalize justify-start`}>{client.fullname}</h3>
      <h3 className={`${clientDetailStyle} max-w-[10%]`}>{calculateAge(client.birthdate)}</h3>
      <h3 className={`${clientDetailStyle} max-w-[20%]`}>{client.contactNumber}</h3>
      <h3 className={`${clientDetailStyle} max-w-[20%]`}>{client.status}</h3>
      <div
        className={`flex flex-1 items-center justify-center max-w-[20%] ${paddingResponsive} ${textResponsive}`}
      >
        <ClientsButton uid={client.id} />
      </div>
    </div>
  );
}

//COMPONENTS
function ClientsButton({ uid }) {
  return (
    <Link to={`/clients/${uid}`}>
      <button className="block cursor-pointer rounded-lg bg-green-700 px-2 py-1 font-semibold text-white duration-150 hover:-translate-y-0.5">
        VIEW
      </button>
    </Link>
  );
}
