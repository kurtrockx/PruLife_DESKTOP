export default function ClientChat() {
  return (
    <>
      <div className="flex-1"></div>
      <TypeBox />
    </>
  );
}

function TypeBox() {
  return (
    <div className="flex max-h-[10%] flex-1 p-[0.75rem] shadow-[0_-2px_10px] shadow-black/10 max-xl:py-2">
      <div className="flex flex-1 rounded-full bg-white/20 px-2 py-px text-white placeholder:text-white/80">
        <input
          type="text"
          placeholder="Aa"
          className="flex-1 px-2 text-xl outline-0"
        />
      </div>
    </div>
  );
}
