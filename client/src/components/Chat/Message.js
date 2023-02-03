import { FaUserCircle } from "react-icons/fa";

function Message(props) {
  return (
    <div className="flex gap-3">
      {props.receiver ? (
        <>
          <FaUserCircle className="text-5xl text-gray-700" />
          <div className="w-fit">
            <p className="bg-neutral-100 p-4 text-neutral-800 rounded-xl w-fit">
              {props.item.message}
            </p>
            <p className="w-fit text-sm font-light mt-1 ml-1">
              {new Date(props.item.createdAt).toLocaleString()}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="ml-auto w-fit">
            <p className="ml-auto bg-green-600 p-4 text-neutral-100 rounded-xl w-fit">
              {props.item.message}
            </p>
            <p className="w-fit text-sm font-light mt-1 mr-1">
              {new Date(props.item.createdAt).toLocaleString()}
            </p>
          </div>
          <FaUserCircle className="text-5xl text-gray-700" />
        </>
      )}
    </div>
  );
}

export default Message;
