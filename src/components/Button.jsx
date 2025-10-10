export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-red-950 px-4 py-2 text-sm font-semibold text-white duration-100 hover:-translate-y-0.5 cursor-pointer hover:bg-red-800"
    >
      {children}
    </button>
  );
}
