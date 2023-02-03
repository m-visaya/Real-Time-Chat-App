import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";

import Chat from "./Chat/Chat";
import Messages from "./Messages/Messages";
import Sidebar from "./Sidebar/Sidebar";

function Main() {
  const [messages, setMessages] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [currConvo, setCurrConvo] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const [thread, setThread] = useState([]);

  let navigate = useNavigate();

  const handleSetConvo = (value) => {
    const sender = username;
    const receiver = value;
    socket.emit("startChat", { sender, receiver });
    socket.on("previousChats", (convo) => {
      setCurrConvo(value);
      setThread(convo);
    });
  };

  const getLatestChats = async () => {
    let response = await axios.get(
      "http://localhost:3000/get-latest-messages",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setMessages(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(false);

    if (!token) {
      return navigate("/");
    }

    setSocket(
      io("http://localhost:3000", {
        query: {
          token: localStorage.getItem("token"),
        },
        transports: ["websocket"],
        origin: "http://localhost:3001",
        autoConnect: true,
      })
    );

    getLatestChats();
    setAuthenticated(true);
    setUsername(jwt_decode(localStorage.getItem("token")).username);

    return () => socket?.disconnect();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const receiver = messages[0]._id;
      handleSetConvo(receiver);
    }
  }, [messages]);

  return (
    <div className="flex">
      {authenticated && (
        <>
          <Sidebar username={username}></Sidebar>
          <Messages
            convo={currConvo}
            setConvo={handleSetConvo}
            messages={messages}
          ></Messages>
          <Chat
            convo={currConvo}
            socket={socket}
            username={username}
            thread={thread}
            setThread={setThread}
            getLatestChats={getLatestChats}
          ></Chat>
        </>
      )}
    </div>
  );
}

export default Main;
