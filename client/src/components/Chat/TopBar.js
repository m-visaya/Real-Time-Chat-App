import { BsCameraVideoFill, BsTelephoneFill } from "react-icons/bs";

function TopBar(props) {
  return (
    <div className="border-b-[1px] border-neutral-300 h-[75px] flex items-center px-8 bg-neutral-200">
      <h2 className="text-neutral-900 text-xl font-semibold">{props.convo}</h2>
      <div className="ml-auto flex gap-10 text-2xl text-neutral-700">
        <BsTelephoneFill />
        <BsCameraVideoFill />
      </div>
    </div>
  );
}

export default TopBar;
