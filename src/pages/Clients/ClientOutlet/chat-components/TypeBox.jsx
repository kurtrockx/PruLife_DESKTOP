import sendIcon from "../../../../assets/sendIcon.svg";

export function TypeBox({ message, setMessage, onSend }) {
  const InputStylish =
    "shadow-[0_0_0_2.5px] shadow-red-950/0 duration-200 focus-within:shadow-red-950 hover:shadow-red-950";

  return (
    <div className="flex max-h-[10%] flex-1 items-center gap-2 p-[0.75rem] shadow-[0_-2px_10px] shadow-black/10 max-xl:py-2">
      <div
        className={`flex flex-1 rounded-full bg-black/10 px-2 text-black placeholder:text-black/80 ${InputStylish}`}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Aa"
          className="flex-1 px-2 py-2.5 text-xl outline-0"
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
      </div>
      <img
        onClick={onSend}
        src={sendIcon}
        alt="sendIcon"
        className="max-h-full cursor-pointer rounded-full p-1.5 hover:bg-black/10"
      />
    </div>
  );
}
