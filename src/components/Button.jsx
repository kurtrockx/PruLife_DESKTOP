export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-red-900 px-4 py-2 text-sm font-semibold text-white duration-100 hover:-translate-y-0.5 hover:bg-red-800 dark:border"
    >
      {children}
    </button>
  );
}
