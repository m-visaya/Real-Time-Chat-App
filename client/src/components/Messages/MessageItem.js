import React from "react";
import { FaUserCircle } from "react-icons/fa";

function MessageItem(props) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer"
      onClick={() => props.setConvo(props.item._id)}
    >
      <FaUserCircle className="text-5xl text-gray-500" />
      <div className="text-neutral-300">
        <h1 className="font-semibold text-lg">{props.item._id}</h1>
        <p className="font-light text-lg">
          {props.item.author}: {props.item.latestMessage}
        </p>
      </div>
    </div>
  );
}

export default MessageItem;
