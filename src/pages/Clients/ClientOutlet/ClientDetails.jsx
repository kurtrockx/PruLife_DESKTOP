import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllUsers, updateUser } from "../../../backend/firebase_firestore";
import { Pencil, Check } from "lucide-react";
import Loading from "../../../components/Loading";
import prulifeLogo from "../../../assets/prulifeLogo.svg";
import Button from "../../../components/Button";

export default function ClientDetails() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [editedClient, setEditedClient] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getClient = async () => {
      const users = await fetchAllUsers();
      const found = users.find((c) => c.id === clientId);
      setClient(found);
      setEditedClient(found);
      setLoading(false);
    };
    getClient();
  }, [clientId]);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (field, value) => {
    setEditedClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser(clientId, editedClient); // assumes your firebase util has this function
      setClient(editedClient);
      setEditingField(null);
      alert("Client info updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user info.");
    }
    setSaving(false);
  };

  if (loading) return <Loading />;

  const textResponsive = "max-2xl:text-sm max-xl:text-xs max-lg:text-[0.75rem]";

  const labelStyle = `font-semibold text-sm text-black/60 flex-2 dark:text-white ${textResponsive}`;
  const inputStyle = `flex-5 max-xl:flex-10 dark:border-white text-gray-400 dark:text-white max-md:flex-5 border border-black/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 duration-100 dark:disabled:bg-neutral-900 disabled:bg-black/5 disabled:cursor-not-allowed ${textResponsive}`;
  const buttonStyle = `text-yellow-600 hover:text-yellow-800 transition-all flex-0.5 cursor-pointer ${textResponsive}`;

  const fields = [
    { key: "fullname", label: "Full Name" },
    { key: "contactNumber", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "occupation", label: "Occupation" },
    { key: "status", label: "Status" },
  ];

  return (
    <>
      <div className="aspect-square max-w-1/2 bg-stone-900 p-24 inset-shadow-[0_0_4rem] inset-shadow-white/20 max-xl:hidden dark:bg-neutral-800 dark:inset-shadow-black">
        <img
          src={prulifeLogo}
          alt="client"
          className="block w-full rounded-full border-8 border-white/80 object-contain shadow-lg"
        />
      </div>

      <div className="flex flex-1 flex-col gap-y-2 overflow-y-auto p-6 text-white dark:bg-black">
        <h2 className="py-4 text-2xl font-bold">Client Details</h2>
        <h2 className="text-right text-xs text-black/50 dark:text-white/90">
          You can edit the Client's Details by pressing the pencil icon
        </h2>
        {fields.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-2 rounded-lg border border-black/20 px-2 py-4 duration-100 focus-within:shadow-md hover:shadow-md lg:gap-4 dark:border-white"
          >
            <span className={labelStyle}>{label}</span>
            <input
              className={inputStyle}
              value={editedClient[key] || ""}
              disabled={editingField !== key}
              onChange={(e) => handleChange(key, e.target.value)}
            />
            {editingField === key ? (
              <button
                className={buttonStyle}
                onClick={() => setEditingField(null)}
              >
                <Check size={20} />
              </button>
            ) : (
              <button className={buttonStyle} onClick={() => handleEdit(key)}>
                <Pencil size={20} />
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}
