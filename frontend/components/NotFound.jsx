import { TbError404 } from "react-icons/tb";

const NotFound = ({ message }) => {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center text-2xl font-serif">
      <TbError404 size={48}/> &nbsp; Error | {message}
    </div>
  );
};

export default NotFound;
