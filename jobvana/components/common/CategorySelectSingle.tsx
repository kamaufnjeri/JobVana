import { JOB_CATEGORIES } from "@/constants";
import React from "react";
import Select from "react-select";

interface category {
  label: string;
  value: string;
}

interface LocationSelectProps {
  selected: string; // Store only values (strings)
  setSelected: React.Dispatch<React.SetStateAction<string>>; // Update selected values (strings)
}

const CategorySelectSingle: React.FC<LocationSelectProps> = ({
  selected,
  setSelected,
}) => {
  const selectedOptions = JOB_CATEGORIES.filter((loc) =>
    selected.includes(loc.value)
  );

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#f0f0f0", // Your desired background color
    }),
  };
  return (
    <div className="w-full flex-col gap-2 items-start">
      <Select
        className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
        options={JOB_CATEGORIES} // Use filtered locations based on search
        value={selectedOptions} // Keep selected options intact
        getOptionLabel={(e) => `${e.label}`} // Display label and type
        getOptionValue={(e) => e.value} // Use value to identify selected option
        onChange={(selectedOption) => {
          setSelected(selectedOption?.value || ""); // Store only the value as a string
        }}
        placeholder={"Category"}
        isSearchable
        menuPlacement="top"
        styles={customStyles}
      />
    </div>
  );
};

export default CategorySelectSingle;
