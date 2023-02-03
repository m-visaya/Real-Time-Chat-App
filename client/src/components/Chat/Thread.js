import { useEffect, useRef } from "react";
import Message from "./Message";

function Thread(props) {
  const scrollToEnd = useRef(null);

  useEffect(() => {
    props.socket.on("previousChats", (conversations) => {
      props.setThread(conversations);
    });
  }, []);

  useEffect(() => {
    scrollToEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [props.thread]);

  return (
    <div
      className="p-10 flex flex-col gap-12 overflow-y-scroll h-[90vh]"
      ref={props.threadRef}
    >
      {props.thread.map((item, index) => (
        <Message
          key={item.to + item.from + index}
          receiver={item.from === props.convo}
          item={item}
        />
      ))}
      <div ref={scrollToEnd} className="-mt-10"></div>
    </div>
  );
}

export default Thread;
