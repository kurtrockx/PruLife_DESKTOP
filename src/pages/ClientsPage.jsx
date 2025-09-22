const CATEGORIES = ["Name", "Age", "Policy Type", "Status", "Actions"];

const CLIENTS = [
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
    actions: "Edit/Delete",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
    actions: "Edit/Delete",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
    actions: "Edit/Delete",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
    actions: "Edit/Delete",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
    actions: "Edit/Delete",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
    actions: "Edit/Delete",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
    actions: "Edit/Delete",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
    actions: "Edit/Delete",
  },
  {
    name: "John Doe",
    age: 35,
    policyType: "Life Insurance",
    status: "Active",
    actions: "Edit/Delete",
  },
  {
    name: "Jane Smith",
    age: 28,
    policyType: "Health Insurance",
    status: "Pending",
    actions: "Edit/Delete",
  },
  {
    name: "Robert Brown",
    age: 42,
    policyType: "Car Insurance",
    status: "Inactive",
    actions: "Edit/Delete",
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
      {CLIENTS.map((c) => {
        const { name, age, policyType, status, actions } = c;
        const clientDetails = [name, age, policyType, status, actions];

        return <Client client={clientDetails} />;
      })}
    </div>
  );
}

function Client({ client }) {
  return (
    <div className="flex flex-1 border px-2">
      {client.map((c, i) => (
        <h3
          className={`flex-1 border-r py-2 ${i === client.length - 1 && "border-transparent"} px-2 text-xl whitespace-nowrap`}
        >
          {c}
        </h3>
      ))}
    </div>
  );
}
