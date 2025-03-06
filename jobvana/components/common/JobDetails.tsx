import { JobDetailsProps } from "@/interfaces";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";



interface ListTextContainerProps {
  listItems: JobDetailsProps[];
}

const ListTextContainer: React.FC<ListTextContainerProps> = ({ listItems }) => {
  return (
    <ul className="flex w-full items-start gap-2 justify-start flex-col p-4">
      {listItems.map((item, index) => (
        <li key={index} className="flex flex-row gap-2 items-start justify-start">
          <FaArrowRight className="text-xl text-primary" />
          <span className="text-p stylish">{item.description}</span>
        </li>
      ))}
    </ul>
  );
};



const JobDetails: React.FC<{detailsList: JobDetailsProps[]}> = ({ detailsList }) => {
  // Group items by type
  const groupedItems = detailsList.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as { [key: string]: JobDetailsProps[] });
  

  // Define mapping of type to titles
  const typeToTitle: { [key: string]: string } = {
    "Benefit": "What's in It for You",
    "Requirement": "What We're Looking For",
    "Responsibility": "What You'll Do",
  };

  return (
    <div>
      {Object.keys(groupedItems).map((type) => {
        const items = groupedItems[type];
        return (
          <div key={type} className="w-full flex items-start justify-start gap-2 flex-col">
            <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>
            <h4 className="text-h4 font-semibold">{typeToTitle[type] || "Other"}</h4>
            <ListTextContainer listItems={items} />
          </div>
        );
      })}
    </div>
  );
};

export default JobDetails;
