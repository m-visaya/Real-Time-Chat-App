import { useState } from "react";
import {
  BsBoxArrowInLeft,
  BsChatDotsFill,
  BsGearFill,
  BsPeopleFill,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SidebarAction from "./SidebarAction";

function Sidebar(props) {
  const [active, setActive] = useState("message");
  let navigate = useNavigate();

  return (
    <div className="bg-[#20222b] h-screen w-32 flex flex-col items-center py-10">
      <FaUserCircle className="text-5xl text-neutral-400 mb-2" />
      <h2 className="text-neutral-200 mb-16">{props.username}</h2>
      <div className="flex flex-col gap-12 ">
        <SidebarAction name="message" active={active}>
          <BsChatDotsFill className="text-4xl" />
        </SidebarAction>
        <SidebarAction name="people" active={active}>
          <BsPeopleFill className="text-4xl" />
        </SidebarAction>
        <SidebarAction name="settings" active={active}>
          <BsGearFill className="text-4xl" />
        </SidebarAction>
      </div>
      <BsBoxArrowInLeft
        className="mt-auto text-3xl cursor-pointer text-neutral-400 hover:text-red-800"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      />
    </div>
  );
}

export default Sidebar;
