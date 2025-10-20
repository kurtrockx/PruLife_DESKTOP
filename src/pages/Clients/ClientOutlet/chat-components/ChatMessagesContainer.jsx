import { useRef, useEffect } from "react";
import prulifeLogo from "../../../../assets/prulifeLogo.svg";

export function ChatMessagesContainer({ children }) {
  const scrollableContainerRef = useRef(null);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div
      ref={scrollableContainerRef}
      className="relative flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-scroll px-2 py-4"
    >
      <img
        className="sticky top-0 left-0 z-0 h-full w-full dark:opacity-100 opacity-0 brightness-60"
        src={prulifeLogo}
        alt="prulife"
      />
      <div className="absolute z-10 w-full pr-4 py-4">{children}</div>
    </div>
  );
}
