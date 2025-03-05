import { JOB_DETAILS_OPTIONS } from "@/constants";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import Button from "./Button";
import { JobDetailProps } from "@/interfaces";

// Define options for the React Select field

interface DetailsInputFieldProps {
  setDetailsList:(details: JobDetailProps[] | []) => void;
  detailsList: { description: string; type: string }[];
}

const DetailsInputField: React.FC<DetailsInputFieldProps> = ({
  setDetailsList,
  detailsList,
}) => {
  const [detailInput, setDetailInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // Handle adding a new detail to the list
  const addDetail = () => {
    if (detailInput && selectedType) {
      setDetailsList([
        ...detailsList,
        { description: detailInput, type: selectedType.value },
      ]);
      setDetailInput(""); // Clear input field
      setSelectedType(null); // Clear selected type
    }
  };

  // Handle removing a detail by index
  const removeDetail = (index: number) => {
    setDetailsList(detailsList.filter((_, i) => i !== index));
  };

  // Group items by type
  const groupedItems = detailsList.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as { [key: string]: { description: string; type: string }[] });

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Input for description */}
     
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={detailInput}
            onChange={(e) => setDetailInput(e.target.value)}
            placeholder="Enter a responsibility, benefit or requirement..."
            className="rounded-md text-gray-900 h-10 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* React Select for type */}
          <div className="flex flex-row gap-2 w-full md:w-2/3 lg:w-1/2 justify-between items-center self-end">
          <Select
            options={JOB_DETAILS_OPTIONS}
            value={selectedType}
            onChange={setSelectedType}
            menuPlacement="top"
            placeholder="Type"
            className="rounded-md w-1/2 text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
          />
            {/* Button to add item to the list */}
          <Button
          onClick={addDetail}
          type='button'
          name={"Add"}
          styles="bg-primary w-1/2 rounded-md text-white h-10 p-2"
        />
          </div>
         
        </div>
      
       
        
     
      {/* Display grouped items */}
      {detailsList.length > 0 && (
        <div className="flex flex-wrap gap-4 w-full">
          {Object.keys(groupedItems).map((type) => (
            <div key={type}>
              <h3 className="font-semibold text-lg">{type}</h3>
              {groupedItems[type].map((item, index) => (
                <div
                  key={`${type}-${index}`}
                  className="flex items-center justify-between gap-2 bg-primary px-3 py-1 rounded-md text-sm text-white mb-2"
                >
                  <p>{item.description}</p>
                  <button
                  type='button'
                    className="text-white hover:text-gray-300"
                    onClick={() => removeDetail(index)}
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailsInputField;
