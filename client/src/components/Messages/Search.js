import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

function Search(props) {
  const [username, setUsername] = useState("");
  const [hover, setHovered] = useState(false);

  return (
    <div className="flex justify-center items-center gap-4">
      <input
        type="search"
        className="bg-[#1e222e] py-2 px-4 rounded-lg text-neutral-200 w-full"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="relative">
        <BsPlusCircleFill
          className="text-4xl text-[#171a24] hover:text-[#0c0e13] cursor-pointer"
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            if (username) props.setConvo(username);
          }}
        />
        {hover && (
          <h1 className="bg-[#0c0e13] text-neutral-300 absolute -left-[7px] bottom-12 px-3 py-1 rounded w-max text-sm">
            chat
          </h1>
        )}
      </div>
    </div>
  );
}

export default Search;
