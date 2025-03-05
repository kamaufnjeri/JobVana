import { SelectValuesProps } from "@/interfaces";

export const capitalizeWords = (text: string) => {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export const getLabelByValue = (
  value: string,
  options: SelectValuesProps[]
) => {
  const item = options.find((item) => item.value === value);
  return item ? item.label : null;
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
