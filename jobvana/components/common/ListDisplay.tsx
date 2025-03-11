import { capitalizeWords } from "@/utils";
import React from "react";

interface ListDisplayProps {
  listItems: string[];
  type?: string;
}
const ListDisplay: React.FC<ListDisplayProps> = ({
  listItems,
  type = null,
}) => {
  return (
    <div>
      {listItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {listItems.map((item, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-800 px-3 py-1 rounded-md text-sm text-white"
            >
              {type && type === "categories" ? capitalizeWords(item) : item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListDisplay;
