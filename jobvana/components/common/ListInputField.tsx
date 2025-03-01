import { useState } from "react";
import { FaTimes } from "react-icons/fa";


interface ListInputFieldProps {
  name: string
}
const ListInputField: React.FC<ListInputFieldProps> = ({ name }) => {
    const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

   // Handle adding tags
   const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
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