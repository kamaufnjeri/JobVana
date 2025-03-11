import React from "react";
import { FaTimes } from "react-icons/fa";

interface PillProps {
  name: string;
  text: string;
  onRemove: (key: string) => void;
}
const Pill: React.FC<PillProps> = ({ name, text, onRemove }) => {
  return (
    <span className="flex items-center px-4 py-1 text-white bg-primary rounded-full text-sm font-medium">
      {text}
      <button
        onClick={() => onRemove(name)}
        className="ml-2 focus:outline-none hover:bg-white/20 rounded-full p-1"
      >
        <FaTimes />
      </button>
    </span>
  );
};

export default Pill;
