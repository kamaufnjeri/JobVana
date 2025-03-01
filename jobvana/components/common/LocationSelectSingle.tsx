import { useLocation } from "@/context/LocationContext";
import React, { useState } from "react";
import Select from "react-select";
import { debounce } from "lodash";

interface Location {
  label: string;
  value: string;
  type: string;
}

interface LocationSelectProps {
  selected: string; // Store only values (strings)
  setSelected: React.Dispatch<React.SetStateAction<string>>; // Update selected values (strings)
}

const LocationSelectSingle: React.FC<LocationSelectProps> = ({ setSelected, selected }) => {
  const { locations, searchLocations, error, loading } = useLocation();
  const [searchQuery, setSearchQuery] = useState(""); // Local state to manage search query

  // Debounced search to limit API calls when typing
  const debouncedSearch = debounce((query: string) => {
    searchLocations(query); // Perform search
  }, 300);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query); // Update local search query state
    debouncedSearch(query); // Trigger debounced search
  };
  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#f0f0f0', // Your desired background color
    }),
  };
  // Map selected values to objects with label and value for display
  const selectedOption = {label: selected, value: selected};

  return (
    <div className="w-full flex-col gap-2 items-start ">
      <Select
        className="rounded-md text-gray-800 outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
        options={locations} // Use filtered locations based on search
        value={selectedOption} // Keep selected options intact
        getOptionLabel={(e) => `${e.label}`} // Display label and type
        getOptionValue={(e) => e.value} // Use value to identify selected option
        isLoading={loading}
        onInputChange={handleSearchChange} // Handle search input change
        onChange={(selectedOption) => {
            setSelected(selectedOption?.value || ""); // Store only the value as a string
          }}
        placeholder={"Country/city/location"}
        isSearchable
        menuPlacement="top"
        styles={customStyles}
      />
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default LocationSelectSingle;
