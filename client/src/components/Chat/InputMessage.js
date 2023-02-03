import { FaLocationArrow } from "react-icons/fa";

function InputMessage(props) {
  return (
    <div className="mt-auto flex items-center bg-neutral-50 overflow-hidden">
      <textarea
        cols={1}
        placeholder="Write your message here"
        className="h-16 w-full bg-neutral-50 px-6 -mb-1 py-5 resize-none focus-visible:outline-none"
        value={props.message}
        onChange={(e) => props.setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.handleSubmit(e);
          }
        }}
      />
      <FaLocationArrow
        className="text-green-500 text-2xl mr-6 hover:text-green-600 cursor-pointer"
        onClick={props.handleSubmit}
      />
    </div>
  );
}

export default InputMessage;
