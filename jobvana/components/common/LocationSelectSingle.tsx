import { useLocation } from "@/context/LocationContext";
import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

// interface for locations options
interface Location {
  label: string; // what is displayed on select drop-down
  value: string; // actual value
  type: string; // type of the location i.e city or country or state
}

// interface for location select components
interface LocationSelectProps {
  selected: string; // the selected loccation
  setSelected: (location: string) => void; // function to set location when user selects
}

const LocationSelectSingle: React.FC<LocationSelectProps> = ({
  setSelected,
  selected,
}) => {
  const { locations, searchLocations, error, loading } = useLocation(); // get locations from location context/provider
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // state to display drop down with locations

  // Debounced search
  const debouncedSearch = debounce((query: string) => {
    searchLocations(query);
  }, 300);

  useEffect(() => {
    if (!selected) {
      setSearchQuery(""); // Clear search input when reset
    } else {
      setSearchQuery(selected); // set search query to selected location
    }
  }, [selected]);

  const handleInputChange = (query: string) => {
    setSearchQuery(query);

    if (query.length > 0) {
      // search from locations based on user input
      debouncedSearch(query);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectLocation = (location: Location) => {
    // set location when user clicks on location from dropdown menu
    setSelected(location.value);
    setSearchQuery(location.label);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <input
        type="text"
        className="rounded-md text-gray-800 outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing a country/city..."
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow clicking dropdown options
      />

      {/* Dropdown Suggestions */}
      {showDropdown && locations.length > 0 && (
        <div className="absolute top-16 z-10 w-full bg-white text-gray-800 border border-primary rounded-md shadow-md max-h-40 overflow-auto">
          {locations.map((loc) => (
            <div
              key={loc.value}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectLocation(loc)}
            >
              {loc.label}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default LocationSelectSingle;
