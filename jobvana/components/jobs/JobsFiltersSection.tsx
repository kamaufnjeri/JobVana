import React, { useRef, useState } from "react";
import { FaSync } from "react-icons/fa";
import { JOB_EXPERIENCE_OPTIONS, JOB_TYPES_OPTIONS } from "@/constants";
import { FaChevronDown } from "react-icons/fa6";
import Select from "react-select";
import LocationSelectSingle from "../common/LocationSelectSingle";

const JobsFiltersSection: React.FC = () => {
  const [showItem, setShowItem] = useState<{ [key: string]: string | null }>({
    experienceLevel: null,
    jobType: null,
    category: null,
    location: null,
  });

  const [search, setSearch] = useState<{[key: string]: string }>({
    title: "",
    location: "",
    category: "",
    job_type: "",
    experience_level: "",
  })

  
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const chevronRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const setLocation = (location: string) => {
    setSearch((prev) => ({ ...prev, location }));
  };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setSearch((prev) => ({...prev, [name]: value}))
  }

  return (
    <div className="w-full flex-col border border-borderColor rounded-md">
      {/* Filter Header */}
      <span className="flex flex-row gap-2 items-center justify-between border-borderColor border-b p-2">
        <h3 className="text-h3">Filter</h3>
        <FaSync />
      </span>

      {/* Job Title */}
      <span className="flex flex-col gap-2 items-start border-borderColor border-b p-2">
        <label htmlFor="name" className="text-h6 opacity-80">
          Job Title/Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Search..."
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
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
          <input
            type="text"
            name="category"
            id="cateogory"
            required
            placeholder="Category..."

            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
          />
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
          <Select
            className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
            options={JOB_EXPERIENCE_OPTIONS}
            placeholder={"Select job type"}
            isSearchable
            menuPlacement="top"
            
          />
        </div>
      </span>

      {/* Job Type */}
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
          <Select
            className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
            options={JOB_TYPES_OPTIONS}
            placeholder={"Select job type"}
            isSearchable
            menuPlacement="top"
          />
        </div>
      </span>

      {/* Location */}
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
          <LocationSelectSingle selected={search.location} setSelected={setLocation} />
        </div>
      </span>
    </div>
  );
};

export default JobsFiltersSection;
