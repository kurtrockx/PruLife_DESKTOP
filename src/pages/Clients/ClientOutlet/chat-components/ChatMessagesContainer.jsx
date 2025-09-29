import { useRef, useEffect } from "react";

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
      className="flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-scroll px-2 py-4"
    >
      {children}
    </div>
  );
}
