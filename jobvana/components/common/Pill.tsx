import React from "react";
import { FaTimes } from "react-icons/fa";

interface PillProps {
  name: string; // name of the filter applied eg categories
  text: string; // the value of the filter eg categories can be 'IT'
  onRemove: (key: string) => void;
}
const Pill: React.FC<PillProps> = ({ name, text, onRemove }) => {
  // displays filters for job listings applied i.e categories, location
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
