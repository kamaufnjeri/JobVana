import { useState } from "react";

interface CheckboxListProps {
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ options, selected, setSelected }) => {
  const handleCheckboxChange = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]; 

    setSelected(newSelected);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
         
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxList;
