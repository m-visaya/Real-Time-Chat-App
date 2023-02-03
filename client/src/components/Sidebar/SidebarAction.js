function SidebarAction(props) {
  return (
    <div
      className={
        (props.active === props.name
          ? "text-green-600 border-b-2 pb-3 border-green-600 rounded-sm"
          : "text-neutral-400 hover:text-green-600") + " cursor-pointer"
      }
    >
      {props.children}
    </div>
  );
}

export default SidebarAction;
