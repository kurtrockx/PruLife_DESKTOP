import sendIcon from "../../../../assets/sendIcon.svg";
import Button from "../../../../components/Button";

export function TypeBox({ message, setMessage, onSend, onOpenPdfModal }) {
  const InputStylish =
    "shadow-[0_0_0_2.5px] shadow-red-900/0 duration-200 focus-within:shadow-white hover:shadow-white dark:shadow-[0_0_0_1.5px]";

  return (
    <div className="flex max-h-[10%] flex-1 items-center gap-2 p-[0.75rem] shadow-[0_-2px_10px] shadow-black/10 max-xl:py-2 dark:bg-black dark:shadow-[0_0_4px] dark:shadow-white">
      <Button onClick={() => onOpenPdfModal((prev) => !prev)}>
        OPEN PROPOSAL
      </Button>
      <div
        className={`flex flex-1 rounded-full bg-black/10 px-2 text-black placeholder:text-black/80 ${InputStylish} dark:border dark:border-white dark:bg-neutral-900`}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Aa"
          className="flex-1 px-2 py-2.5 text-xl outline-0 dark:text-white"
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
