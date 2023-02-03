import React from "react";
import MessageItem from "./MessageItem";
import Search from "./Search";

function Messages(props) {
  return (
    <div className="bg-[#2c313d] w-2/6 p-9 flex flex-col gap-8 ">
      <h2 className="text-neutral-200 text-4xl">Messages</h2>
      <Search {...props} />
      <div
        className="flex flex-col gap-8 mt-3 overflow-y-scroll max-h-[76vh]"
        id="inv-scrollbar"
      >
        {props.messages.map((item, index) => (
          <MessageItem key={index} item={item} setConvo={props.setConvo} />
        ))}
      </div>
    </div>
  );
}

export default Messages;
