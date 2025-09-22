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
];

export default function ClientPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex max-w-[70dvw] flex-1 flex-col">
        <Categories />
        <ClientsList />
      </div>
    </div>
  );
}

function Categories() {
  return (
    <div className="flex flex-1 gap-10 border px-4">
      {CATEGORIES.map((c, i) => (
        <h2
          className={`flex-1 ${i === CATEGORIES.length - 1 && "border-transparent"} border-r px-2 text-center text-xl whitespace-nowrap uppercase`}
        >
          {c}
        </h2>
      ))}
    </div>
  );
}

function ClientsList() {
  return (
    <div className="flex flex-col border p-4 px-2">
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
    <div className="flex flex-1 gap-10 border px-2">
      {client.map((c, i) => (
        <h3
          className={`flex-1 border-r ${i === client.length - 1 && "border-transparent"} px-2 text-xl whitespace-nowrap`}
        >
          {c}
        </h3>
      ))}
    </div>
  );
}
