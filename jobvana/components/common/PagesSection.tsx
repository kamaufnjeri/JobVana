import { JobFilterProps } from "@/interfaces";
import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface PaginationProps {
  data: {
    next: string | null;
    previous: string | null;
  };
  prevNext: (url: string | null) => void; // function to move to next/prev page of data displayed
  noOfPages: number; // no of pages available
  currentPage: number; // page the user is currently on i.e for job listings
  getItems: (params?: JobFilterProps) => void; // funtion to fetch data i.e jobs base on the page user selected
  searchItems?: { [key: string]: any }; // object containing filtering and search data user has selected i.e page or categories
}

const PagesSection: React.FC<PaginationProps> = ({
  data,
  prevNext,
  noOfPages,
  currentPage,
  getItems,
  searchItems,
}) => {

  const numbers = Array.from({ length: noOfPages }, (_, i) => i + 1); // an array depending on number of pages data i.e jobs has

  const changePageNo = async (num: number) => {
    // unction to display data i.e jobs on the the page selected/clicked
    
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
              num === currentPage ? "bg-secondary text-white" : "bg-gray-200 text-gray-800"
            } w-12 h-12 shadow-lg  hover:text-white font-semibold hover:bg-customRed hover:bg-primary rounded-full p-1 flex items-center justify-center`}
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
