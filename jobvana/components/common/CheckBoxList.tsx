import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CheckboxListProps {
  options: Option[];
  selected: string[];
  styles: string | "";
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  options,
  selected,
  setSelected,
  styles,
}) => {
  const handleCheckboxChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(newSelected);
  };

  return (
    <div>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-2 ${styles !== "" ? styles : ""}`}
        >
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxList;
