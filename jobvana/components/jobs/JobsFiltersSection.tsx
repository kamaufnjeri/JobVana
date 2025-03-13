import React, { useRef, useState } from "react";
import { FaSync } from "react-icons/fa";
import { JOB_EXPERIENCE_OPTIONS, JOB_TYPES_OPTIONS } from "@/constants";
import { FaChevronDown } from "react-icons/fa6";
import Select from "react-select";
import LocationSelectSingle from "../common/LocationSelectSingle";
import { JobFilterProps } from "@/interfaces";

// interface for JobsFiltersSection components
interface FilterSectionProps {
  filters: JobFilterProps;
  setFilters: React.Dispatch<React.SetStateAction<JobFilterProps>>;
  fetchJobs: (filters?: JobFilterProps) => void;
}
const JobsFiltersSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilters,
  fetchJobs,
}) => {
  const [showItem, setShowItem] = useState<{ [key: string]: string | null }>({
    experienceLevel: null,
    jobType: null,
    category: null,
    location: null,
  }); // sets to show a filetring section i.e categories

  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const chevronRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // set location filter key based on user input
  const setLocation = (location: string) => {
    const newFilters = { ...filters, location };
    fetchJobs(newFilters);
    setFilters((prev) => ({ ...newFilters }));
  };
  // allow showing a certain filter section or hiding
  const toggleItemSection = (category: string) => {
    const isCurrentlyOpen = showItem[category] === category;

    setShowItem((prev) => ({
      ...prev,
      [category]: isCurrentlyOpen ? null : category,
    }));

    const itemElement = itemRefs.current[category];
    const chevronElement = chevronRefs.current[category];

    if (chevronElement) {
      chevronElement.classList.toggle("rotate-180", !isCurrentlyOpen);
    }

    if (itemElement) {
      if (isCurrentlyOpen) {
        itemElement.classList.remove("min-h-20", "opacity-90");
        itemElement.classList.add("h-0", "opacity-0");
      } else {
        itemElement.classList.remove("h-0", "opacity-0");
        itemElement.classList.add("min-h-20", "opacity-90");
      }
    }
  };

  // handles change in filter input fields i.e categories
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  //on Enter key click fetch jobs based on filters
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchJobs(filters); // Call your fetchJobs function when Enter is pressed
    }
  };

  // handle reseting jobs i.e displaying with no filters applied
  const reset = () => {
    fetchJobs();
    setFilters({
      search: "",
      location: "",
      job_type: "",
      experience_level: "",
      categories: "",
      page: 1,
    });
  };

  return (
    <div className="w-full flex-col border border-borderColor rounded-md">
      {/* Filter Header */}
      <span className="flex flex-row gap-2 items-center justify-between border-borderColor border-b p-2">
        <h3 className="text-h3">Filter</h3>
        <button onClick={() => reset()}>
          <FaSync />
        </button>
      </span>

      <span className="flex flex-col gap-2 items-start border-borderColor border-b p-2">
        <label htmlFor="search" className="text-h6 opacity-80">
          Search
        </label>
        <input
          type="text"
          name="search"
          id="search"
          required
          onKeyDown={handleKeyDown}
          value={filters.search}
          onChange={handleChange}
          placeholder="Type a keyword and press Enter to search..."
          className="rounded-md outline-none text-gray-800 w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
        />
      </span>

      {/* Categories */}

      <span className="flex flex-col gap-2 items-start border-borderColor border-b p-2">
        <div
          className="flex flex-row justify-between items-center gap-2 w-full"
          onClick={() => toggleItemSection("category")}
        >
          <label className="text-h6 opacity-80">Category</label>
          <div
            className="cursor-pointer opacity-80 transition-transform"
            ref={(el) => {
              chevronRefs.current["category"] = el;
            }}
          >
            <FaChevronDown />
          </div>
        </div>
        <div
          className="opacity-0 h-0 transition-all duration-300 w-full"
          ref={(el) => {
            itemRefs.current["category"] = el;
          }}
        >
          {showItem["category"] && (
            <input
              type="text"
              name="categories"
              id="cateogories"
              required
              value={filters.categories}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a category and press Enter to search..."
              className="rounded-md text-gray-800 outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      </span>

      <span className="flex flex-col gap-2 items-start border-borderColor border-b p-2">
        <div
          className="flex flex-row justify-between items-center gap-2 w-full"
          onClick={() => toggleItemSection("experienceLevel")}
        >
          <label className="text-h6 opacity-80">Experience Level</label>
          <div
            className="cursor-pointer opacity-80 transition-transform"
            ref={(el) => {
              chevronRefs.current["experienceLevel"] = el;
            }}
          >
            <FaChevronDown />
          </div>
        </div>
        <div
          className="opacity-0 h-0 transition-all duration-300"
          ref={(el) => {
            itemRefs.current["experienceLevel"] = el;
          }}
        >
          {showItem["experienceLevel"] && (
            <Select
              className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
              options={JOB_EXPERIENCE_OPTIONS}
              placeholder={"Select experience level"}
              isSearchable
              value={
                JOB_EXPERIENCE_OPTIONS.find(
                  (level) => level.value === filters.experience_level
                ) || null
              }
              onChange={(selectedOption) => {
                const newFilters = {
                  ...filters,
                  experience_level: selectedOption?.value || "",
                };
                fetchJobs(newFilters);
                setFilters({ ...newFilters });
              }}
              menuPlacement="top"
            />
          )}
        </div>
      </span>

      <span className="flex flex-col gap-2 items-start border-borderColor border-b p-2">
        <div
          className="flex flex-row justify-between items-center gap-2 w-full"
          onClick={() => toggleItemSection("jobType")}
        >
          <label className="text-h6 opacity-80">Job Type</label>
          <div
            className="cursor-pointer opacity-80 transition-transform"
            ref={(el) => {
              chevronRefs.current["jobType"] = el;
            }}
          >
            <FaChevronDown />
          </div>
        </div>
        <div
          className="opacity-0 h-0 transition-all duration-300"
          ref={(el) => {
            itemRefs.current["jobType"] = el;
          }}
        >
          {showItem["jobType"] && (
            <Select
              className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
              options={JOB_TYPES_OPTIONS}
              placeholder={"Select job type"}
              isSearchable
              menuPlacement="top"
              value={
                JOB_TYPES_OPTIONS.find(
                  (level) => level.value === filters.job_type
                ) || null
              }
              onChange={(selectedOption) => {
                const newFilters = {
                  ...filters,
                  job_type: selectedOption?.value || "",
                };
                fetchJobs(newFilters);
                setFilters({ ...newFilters });
              }}
            />
          )}
        </div>
      </span>

      <span className="flex flex-col gap-2 items-start border-borderColor border-b p-2 z-0">
        <div
          className="flex flex-row justify-between items-center gap-2 w-full"
          onClick={() => toggleItemSection("location")}
        >
          <label className="text-h6 opacity-80">Location</label>
          <div
            className="cursor-pointer opacity-80 transition-transform"
            ref={(el) => {
              chevronRefs.current["location"] = el;
            }}
          >
            <FaChevronDown />
          </div>
        </div>
        <div
          className="opacity-0 h-0 transition-all duration-300 w-full"
          ref={(el) => {
            itemRefs.current["location"] = el;
          }}
        >
          {showItem["location"] && (
            <LocationSelectSingle
              selected={filters.location}
              setSelected={setLocation}
            />
          )}
        </div>
      </span>
    </div>
  );
};

export default JobsFiltersSection;
