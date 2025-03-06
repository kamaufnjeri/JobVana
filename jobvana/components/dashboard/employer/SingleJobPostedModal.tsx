import Button from "@/components/common/Button";
import Select from "react-select";
import {
  AVAILABILITY_OPTIONS,
  EXPERIENCE_LEVELS_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_TYPES_OPTIONS,
} from "@/constants";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import LocationSelectSingle from "@/components/common/LocationSelectSingle";
import ListDisplay from "@/components/common/ListDisplay";
import { JobProps } from "@/interfaces";
import ListInputField from "@/components/common/ListInputField";

interface ApplicationModalProps {
  closeModal: () => void;
  job: JobProps;
}

const SingleJobPostedModal: React.FC<ApplicationModalProps> = ({
  closeModal,
  job
}) => {
  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    responsibilities: true,
    benefits: true,
    requirements: true,
    description: true,
    categories: true,
    location: true,
    type: true,
    experience_level: true,
    title: true,
  });

  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
  };
  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-4 lg:w-2/3 md:w-2/3 w-full flex flex-col gap-2 relative h-auto max-h-[95vh] overflow-y-auto">
        <FaTimes
          className="cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute"
          onClick={closeModal}
        />

        <div className=" flex flex-col w-full gap-4 p-4">
          <div className="flex lg:flex-row flex-col justify-between items-start pr-5">
            <h2 className="text-h2">Job - {job.title}</h2>
          </div>
          <div className="flex gap-2 flex-wrap justify-between">
            <h6 className="text-h6 font-medium flex flex-row gap-2">
              Date Posted - {job.deadline}
            </h6>

            <Button
              name="Delete"
              styles="bg-red-500 rounded-md text-h6 border-text text-white h-10 p-1 w-[150px]  hover:bg-red-600"
            />
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
              value={job.title}
              required
              disabled={isDisabled.title}
              placeholder="Enter job title"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.title === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("title")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("title")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
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
              value={job.deadline}
              disabled={isDisabled.deadline}
              placeholder="Enter job deadline"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.deadline === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("deadline")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("deadline")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
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
              value={job.description}
              disabled={isDisabled.description}
              placeholder="Start typing job description ..."
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white min-h-[100px]"
            ></textarea>
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.description === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("description")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("description")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label
              htmlFor="categories"
              className="text-h6 font-medium flex flex-row gap-2"
            >
              <h6>Job Categories</h6>
              <h6 className="text-red-500">*</h6>
            </label>
            {isDisabled.categories ? (
              <ListDisplay
                listItems={job.categories}
                type="categories"
              />
            ) : (
              <ListInputField name='Categories' items={job.categories} setItems={setCategories}/>

            )}
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.categories === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("categories")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("categories")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label
              htmlFor="job_type"
              className="text-h6 font-medium flex flex-row gap-2"
            >
              <h6>Job Type</h6>
              <h6 className="text-red-500">*</h6>
            </label>
            <Select
              className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
              options={JOB_TYPES_OPTIONS}
              value={JOB_TYPES_OPTIONS.find(
                (option) => option.value === job.job_type
              )}
              placeholder={"Select job type"}
              isSearchable
              menuPlacement="top"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.job_type === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("job_type")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("job_type")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
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
              options={JOB_EXPERIENCE_OPTIONS}
              value={JOB_EXPERIENCE_OPTIONS.find(
                (option) => option.value === job.experience_level
              )}
              placeholder={"Select experience level"}
              isSearchable
              menuPlacement="top"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.experience_level === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("experience_level")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("experience_level")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label
              htmlFor="categories"
              className="text-h6 font-medium flex flex-row gap-2"
            >
              <h6>Job Location</h6>
            </label>
            <LocationSelectSingle
              selected={location}
              setSelected={setLocation}
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.location === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("location")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("location")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
          
        </div>
      </div>
    </div>
  );
};

export default SingleJobPostedModal;
