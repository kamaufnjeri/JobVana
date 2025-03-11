import { useState } from "react";
import { FaTimes } from "react-icons/fa";


interface ListInputFieldProps {
    name: string;
    items: string[]; // Store only values (strings)
    setItems: (items: string[]) => void; // Update selected values (strings)
}
const ListInputField: React.FC<ListInputFieldProps> = ({ name, items, setItems  }) => {
   
  const [tagInput, setTagInput] = useState<string>("");

   // Handle adding items
   const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!items.includes(tagInput.trim())) {
        setItems([...items, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setItems(items.filter((tag) => tag !== tagToRemove));
  };
    return (
        <div className="w-full flex flex-col gap-2">
       
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={addTag}
          placeholder={`Type and press Enter to add ${name}`}
          className="rounded-md text-gray-900 outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
        />
      

      {/* Display added categories */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-primary px-3 py-1 rounded-md text-sm text-white"
            >
              {tag}
              <button
                className="ml-2 text-white hover:text-gray-300"
                onClick={() => removeTag(tag)}
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
      </div>
    )
}

export default  ListInputField;