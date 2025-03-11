import { JobDetailProps } from "@/interfaces";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";



interface ListTextContainerProps {
  listItems: JobDetailProps[];
}

const ListTextContainer: React.FC<ListTextContainerProps> = ({ listItems }) => {
  return (
    <ul className="flex w-full items-start gap-2 justify-start flex-col">
      {listItems.map((item, index) => (
        <li key={index} className="flex flex-row gap-2 items-start justify-start p-1 rounded-md">
                    <FaArrowRight className="text-xl text-primary" />

          <span className="text-p ">{item.description}</span>
        </li>
      ))}
    </ul>
  );
};



const JobDetailsList: React.FC<{ detailsList: JobDetailProps[] }> = ({ detailsList }) => {
  // Group items by type
  const groupedItems = detailsList.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as { [key: string]: JobDetailProps[] });
  
  // Define mapping of type to titles
  const typeToTitle: { [key: string]: string } = {
    "Benefit": "Benefits",
    "Requirement": "Requirements",
    "Responsibility": "Responsibilities",
  };

  return (
    // On small screens, stack groups; on large screens, align them in a row.
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {Object.keys(groupedItems).map((type) => {
        const items = groupedItems[type];
        return (
          // Each group is a column: header on top, then the list of items
          <div key={type} className="flex flex-col gap-2 items-start lg:w-1/3">
            <h6 className="text-h6 font-semibold">{typeToTitle[type] || "Other"}</h6>
            <ListTextContainer listItems={items} />
          </div>
        );
      })}
    </div>
  );
};

export default JobDetailsList
