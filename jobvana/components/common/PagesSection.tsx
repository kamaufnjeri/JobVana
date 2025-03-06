import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface PaginationProps {
  data: {
    next: string | null;
    previous: string | null;
  };
  prevNext: (url: string | null) => void;
  noOfPages: number;
  currentPage: number;
  getItems: (params: { [key: string]: any }) => Promise<void>;
  searchItems: { [key: string]: any };
}

const PagesSection: React.FC<PaginationProps> = ({
  data,
  prevNext,
  noOfPages,
  currentPage,
  getItems,
  searchItems,
}) => {
  const numbers = Array.from({ length: noOfPages }, (_, i) => i + 1);

  const changePageNo = async (num: number) => {
    await getItems({
      ...searchItems,
      page: num,
    });
  };

  return (
    <div className="cursor-pointer z-3 p-1">
      <div className="flex flex-row gap-2 items-center">
        <FaAngleDoubleLeft
          onClick={() => prevNext(data.previous)}
          className={`text-2xl ${data.previous ? "opacity-100" : "opacity-50 pointer-events-none"}`}
        />
        {numbers.map((num) => (
          <span
            key={num}
            onClick={() => changePageNo(num)}
            className={`${
              num === currentPage ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            } w-12 h-12 shadow-lg font-semibold hover:bg-customRed hover:text-white rounded-full p-1 flex items-center justify-center`}
          >
            {num}
          </span>
        ))}
        <FaAngleDoubleRight
          onClick={() => prevNext(data.next)}
          className={`text-2xl ${data.next ? "opacity-100" : "opacity-50 pointer-events-none"}`}
        />
      </div>
    </div>
  );
};

export default PagesSection;
