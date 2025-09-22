const CATEGORIES = ["Name", "Age", "Policy Type", "Status", "Actions"];

const CLIENTS = [
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
  },
];

export default function ClientPage() {
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
  return (
    <div className="sticky top-0 flex flex-1 border border-[#450509] bg-[#450509] px-4 font-semibold text-white shadow-sm">
      {CATEGORIES.map((c, i) => (
        <h2
          className={`flex-1 py-2 ${i === CATEGORIES.length - 1 && "border-transparent"} mx-auto border-r border-black px-2 text-center text-xl whitespace-nowrap uppercase`}
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
      {CLIENTS.map((client) => {
        return <Client client={client} />;
      })}
    </div>
  );
}

function Client({ client }) {
  return (
    <div className="flex flex-1 border px-2">
      <h3 className={`flex-1 border-r p-2 text-xl whitespace-nowrap`}>
        {client.name}
      </h3>
      <h3 className={`flex-1 border-r p-2 text-xl whitespace-nowrap`}>
        {client.age}
      </h3>
      <h3 className={`flex-1 border-r p-2 text-xl whitespace-nowrap`}>
        {client.policyType}
      </h3>
      <h3 className={`flex-1 border-r p-2 text-xl whitespace-nowrap`}>
        {client.status}
      </h3>
      <div className="flex flex-1 items-center justify-center px-2">
        <button className="block rounded-lg bg-green-700 px-2 py-1 font-semibold text-white">
          VIEW
        </button>
      </div>
    </div>
  );
}
