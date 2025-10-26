import { Link, useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../backend/firebase_firestore";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import chatIcon from "../../assets/chatIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

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
    <div className="flex flex-1 flex-col justify-center dark:bg-neutral-700">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex max-h-[80dvh] w-[70dvw] flex-1 flex-col overflow-y-scroll rounded-tl-xl rounded-bl-xl bg-white shadow-[0_0_.25rem] shadow-black/20 dark:border dark:border-white/50 dark:bg-neutral-900 dark:text-white">
          <Categories onSearchInput={handleSearchInput} />
          {clients.length === 0 ? (
            <Loading />
          ) : (
            <ClientsList clients={searchedClient()} />
          )}
        </div>
      </div>
    </div>
  );
}

function Categories({ onSearchInput }) {
  const textResponsive = "max-2xl:text-base max-xl:text-sm max-lg:text-xs";
  const paddingResponsive = "max-xl:px-1 max-xl:py-2 max-lg:px-0.5 py-4";

  return (
    <div className="sticky top-0 space-y-2 py-2">
      <SearchClient onSearchInput={onSearchInput} />
      <div className="flex flex-1 border border-red-950 bg-black px-4 font-semibold text-white shadow-sm dark:border-x-0 dark:border-y-white/40">
        {CATEGORIES.map((c, i) => (
          <h2
            key={i}
            className={`mx-auto flex-1 border-r border-white/50 px-2 text-center whitespace-nowrap uppercase ${textResponsive} ${paddingResponsive} ${i === CATEGORIES.length - 1 && "border-r-0"} ${c.maxWidth}`}
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
    "shadow-[0_0_0_1.5px] shadow-red-950/0 duration-200 focus-within:shadow-yellow-500 hover:shadow-yellow-500 dark:focus-within:shadow-white dark:hover:shadow-white";
  const textResponsive = "max-2xl:text-base max-xl:text-sm max-lg:text-xs";

  return (
    <div
      className={`sticky top-0 ml-auto flex w-1/2 rounded-xl border border-black/40 px-4 py-2 ${InputStylish} dark:border-white`}
    >
      <input
        className={`flex-1 outline-0 ${textResponsive} dark:placeholder:text-white/50`}
        type="text"
        placeholder="Search for member"
        onChange={onSearchInput}
      />
      <img
        className="max-h-6 opacity-50 dark:invert"
        src={searchIcon}
        alt="searchIcon"
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
  const clientDetailStyle = `flex-1 border-r border-black/10 p-2 text-md whitespace-nowrap flex items-center truncate justify-center dark:border-white/40 ${textResponsive} ${paddingResponsive}`;

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
    <div className="flex flex-1 rounded-lg border border-black/10 px-2 shadow-sm duration-100 hover:shadow-md dark:bg-neutral-800 dark:shadow-black/80">
      <h3
        className={`${clientDetailStyle} max-w-[30%] justify-start font-medium capitalize`}
      >
        {client.fullname}
      </h3>
      <h3 className={`${clientDetailStyle} max-w-[10%] text-black/60 dark:text-white/60`}>
        {calculateAge(client.birthdate)}
      </h3>
      <h3 className={`${clientDetailStyle} max-w-[20%] text-black/60 dark:text-white/60`}>
        {client.contactNumber}
      </h3>
      <h3 className={`${clientDetailStyle} max-w-[20%] text-black/60 dark:text-white/60`}>{client.status}</h3>
      <div
        className={`flex max-w-[20%] flex-1 items-center justify-center text-black/60 dark:text-white/60 ${paddingResponsive} ${textResponsive}`}
      >
        <div className="flex items-center gap-4 max-2xl:gap-2">
          <ClientsLink uid={client.id} />
          <ClientsButton uid={client.id} />
        </div>
      </div>
    </div>
  );
}

//COMPONENTS
function ClientsLink({ uid }) {
  const textResponsive = "max-2xl:text-sm max-xl:text-xs max-lg:text-[.5rem]";

  return (
    <Link
      to={`/clients/${uid}`}
      className={`text-blue-800 lowercase underline underline-offset-2 hover:text-blue-500 ${textResponsive} dark:text-blue-300 dark:hover:text-blue-200`}
    >
      VIEW DETAILS
    </Link>
  );
}

function ClientsButton({ uid }) {
  const imgResponsive = "max-2xl:max-h-8 max-xl:max-h-6";

  return (
    <Link to={`${uid}/chat`}>
      <img
        className={`max-h-8 drop-shadow-sm duration-100 hover:-translate-y-0.5 hover:brightness-95 ${imgResponsive}`}
        src={chatIcon}
        alt="chat"
      />
    </Link>
  );
}
