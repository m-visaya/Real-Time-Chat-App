import { useState } from "react";
import InputMessage from "./InputMessage";
import TopBar from "./TopBar";
import Thread from "./Thread";

function Chat(props) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    props.socket.emit("newMessage", {
      from: props.username,
      to: props.convo,
      message: message,
    });
    setMessage("");
  };

  props.socket.on("newChat", (message) => {
    props.getLatestChats();
    Notification.requestPermission().then((permission) => {
      if (permission === "granted" && message.from !== props.username) {
        new Notification(
          `New message from ${message.from}: ${message.message}`
        );
      }
    });
  });

  return (
    <div className="bg-gray-200 w-full flex flex-col max-h-screen">
      <TopBar {...props} />
      <Thread {...props} thread={props.thread} setThread={props.setThread} />
      <InputMessage
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

export default Chat;
