import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface PrevNextSectionProps {
  next: () => void;
  prev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const PrevNextSection: React.FC<PrevNextSectionProps> = ({ next, prev, hasNext, hasPrev }) => {
  return (
    <div className="cursor-pointer z-3 p-1 w-full flex justify-center">
      <div className="flex flex-row gap-2 items-center justify-between w-full">
        <FaAngleDoubleLeft
          onClick={hasPrev ? prev : undefined}
          className={`text-2xl ${hasPrev ? "opacity-100 hover:text-primary" : "opacity-50 pointer-events-none"}`}
        />
        <FaAngleDoubleRight
          onClick={hasNext ? next : undefined}
          className={`text-2xl ${hasNext ? "opacity-100 hover:text-primary" : "opacity-50 pointer-events-none"}`}
        />
      </div>
    </div>
  );
};

export default PrevNextSection;
