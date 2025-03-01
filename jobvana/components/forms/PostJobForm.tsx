import React, { useState } from "react";
import Button from "../common/Button";
import Select from "react-select";
import { EXPERIENCE_LEVELS_OPTIONS, JOB_TYPES_OPTIONS } from "@/constants";
import CategorySelectMulti from "../common/CategorySelectMulti";
import LocationSelectSingle from "../common/LocationSelectSingle";
import ListInputField from "../common/ListInputField";


const PostJobForm: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [location, setLocation] = useState<string>('');

  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 p-4">
        <div className='lg:col-span-2'>
        <h2 className="text-h2">Post a Job & Find the Right Talent</h2>
      <h5 className="text-h5">
        Reach top professionals by posting your job today. Provide clear
        details, requirements, and expectations to attract the best candidates.
        Let’s help you find the perfect fit!
      </h5>
        </div>
      
      <span className="flex flex-col gap-2 items-start">
      <label
          htmlFor="title"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Job Title</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          placeholder="Enter job title"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>
      <span className="flex flex-col gap-2 items-start">

      <label
          htmlFor="deadline"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Deadline</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <input
          type="date"
          name="deadline"
          id="deadline"
          required
          placeholder="Enter job deadline"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="description"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Job Description</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <textarea
          name="description"
          id="description"
          required
          placeholder="Start typing job description ..."
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 min-h-[100px]"
        ></textarea>
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="categories"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Job Categories</h6>
          <h6 className="text-red-500">*</h6>
        </label>
      <CategorySelectMulti selected={categories} setSelected={setCategories}/>
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="type"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Job Type</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <Select
          className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
          options={JOB_TYPES_OPTIONS}
          placeholder={"Select job type"}
          isSearchable
          menuPlacement="top"
        />
      </span>
    
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="experience_level"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Experience Level</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <Select
          className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
          options={EXPERIENCE_LEVELS_OPTIONS}
          placeholder={"Select experience level"}
          isSearchable
          menuPlacement="top"
        />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="categories"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Job Location</h6>
        </label>
      <LocationSelectSingle selected={location} setSelected={setLocation}/>
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="requirements"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Requirements</h6>
        </label>
      <ListInputField name='requirements'/>
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="responsibilities"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Responsibilities</h6>
        </label>
      <ListInputField name='responsibilities'/>
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="benefits"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Benefits</h6>
        </label>
      <ListInputField name='benefits'/>
      </span>
      <div className="lg:col-span-2 place-self-center w-1/2">
      <Button
        type="submit"
        name="Post Job"
        styles="bg-primary w-full rounded-md text-white h-10 p-2 self-center"
      />
        </div>     
     
    </form>
  );
};

export default PostJobForm;
