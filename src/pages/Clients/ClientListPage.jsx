import { Link } from "react-router-dom";
import { CLIENTS } from "../../sampleData/clients";

const CATEGORIES = ["Name", "Age", "Policy Type", "Status", "Actions"];

export default function ClientListPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <h1 className="mx-auto pt-20 text-2xl font-semibold">
        CLIENT MANAGEMENT PAGE
      </h1>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex max-h-[60dvh] max-w-[70dvw] flex-1 flex-col overflow-y-scroll rounded-tl-xl rounded-bl-xl border">
          <Categories />
          <ClientsList />
        </div>
      </div>
    </div>
  );
}

function Categories() {
  const textResponsive = "max-2xl:text-base max-xl:text-sm max-lg:text-xs";
  const paddingResponsive = "max-xl:px-1 max-xl:py-2 max-lg:px-0.5 py-4";

  return (
    <div className="sticky top-0 flex flex-1 border border-red-950 bg-red-950 px-4 font-semibold text-white shadow-sm">
      {CATEGORIES.map((c, i) => (
        <h2
          key={i}
          className={`mx-auto flex-1 border-r border-black px-2 text-center whitespace-nowrap uppercase ${textResponsive} ${paddingResponsive} ${i === CATEGORIES.length - 1 && "border-transparent"}`}
        >
          {c}
        </h2>
      ))}
    </div>
  );
}

function ClientsList() {
  return (
    <div className="flex flex-col gap-y-2 p-4 px-2">
      {CLIENTS.map((client, i) => {
        return <Client client={client} key={i} />;
      })}
    </div>
  );
}

function Client({ client }) {
  const textResponsive = "max-2xl:text-base max-xl:text-sm max-lg:text-xs";
  const paddingResponsive = "max-xl:p-1 max-lg:px-0.25 max-lg:py-0.25";
  const clientDetailStyle = `flex-1 border-r p-2 text-xl whitespace-nowrap max-w-[20%] flex items-center truncate justify-center ${textResponsive} ${paddingResponsive}`;

  return (
    <div className="flex flex-1 border px-2">
      <h3 className={clientDetailStyle}>{client.name}</h3>
      <h3 className={clientDetailStyle}>{client.age}</h3>
      <h3 className={clientDetailStyle}>{client.policyType}</h3>
      <h3 className={clientDetailStyle}>{client.status}</h3>
      <div
        className={`flex flex-1 items-center justify-center ${paddingResponsive} ${textResponsive}`}
      >
        <ClientsButton clientName={client.name} />
      </div>
    </div>
  );
}

//COMPONENTS
function ClientsButton({ clientName }) {
  return (
    <Link to={clientName}>
      <button className="block cursor-pointer rounded-lg bg-green-700 px-2 py-1 font-semibold text-white duration-150 hover:-translate-y-0.5">
        VIEW
      </button>
    </Link>
  );
}
