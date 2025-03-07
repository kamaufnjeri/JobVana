import React, { useState } from "react";
import Button from "../common/Button";
import Select from "react-select";
import { JOB_EXPERIENCE_OPTIONS, JOB_TYPES_OPTIONS } from "@/constants";
import LocationSelectSingle from "../common/LocationSelectSingle";
import { JobDetailProps, JobPostProps, JobProps } from "@/interfaces";
import DetailsInputField from "../common/DetailsInputField";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { toast } from "react-toastify";
import ListInputField from "../common/ListInputField";

const todaysDate = new Date().toISOString().split("T")[0];

const PostJobForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<JobPostProps>({
    title: "",
    description: "",
    experience_level: "",
    max_salary: null,
    min_salary: null,
    deadline: "",
    categories: [],
    location: "",
    job_type: "",
    details: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setLocation = (location: string) => {
    setFormData((prev) => ({ ...prev, location }));
  };

  const setCategories = (categories: string[]) => {
    setFormData((prev) => ({ ...prev, categories: categories }));
  };

  const setDetails = (details: JobDetailProps[]) => {
    setFormData((prev) => ({ ...prev, details: details }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("jobs/", formData);

      if (response.status === 201) {
        toast.success("Job posted successful!");

        setFormData((prev) => ({
          title: "",
          description: "",
          experience_level: "",
          max_salary: null,
          min_salary: null,
          deadline: "",
          categories: [],
          location: "",
          job_type: "",
          details: [],
        }));
      } else if (response.data.error) {
        toast.error(response.data.error || "Registration failed");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Job posting failed:", error);
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 p-6 border-2 border-borderColor shadow-lg rounded-lg"
    >
      <div className="lg:col-span-2">
        <h2 className="text-h2">Post a Job & Find the Right Talent</h2>
        <h5 className="text-h5">
          Reach top professionals by posting your job today. Provide clear
          details, requirements, and expectations to attract the best
          candidates. Let’s help you find the perfect fit!
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
          value={formData.title}
          onChange={handleChange}
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
          value={formData.deadline}
          onChange={handleChange}
          placeholder="Enter job deadline"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>
      <span className="flex flex-col gap-2 items-start lg:col-span-2">
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
          value={formData.description}
          onChange={handleChange}
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
        <ListInputField
          name="Categories"
          items={formData.categories}
          setItems={setCategories}
        />
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
          value={
            JOB_TYPES_OPTIONS.find(
              (level) => level.value === formData.job_type
            ) || null
          }
          onChange={(selectedOption) =>
            setFormData((prev) => ({
              ...prev,
              job_type: selectedOption?.value || "",
            }))
          }
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
          options={JOB_EXPERIENCE_OPTIONS}
          placeholder={"Select experience level"}
          isSearchable
          menuPlacement="top"
          value={
            JOB_EXPERIENCE_OPTIONS.find(
              (level) => level.value === formData.experience_level
            ) || null
          }
          onChange={(selectedOption) =>
            setFormData((prev) => ({
              ...prev,
              experience_level: selectedOption?.value || "",
            }))
          }
        />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="location"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Location</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <LocationSelectSingle
          selected={formData.location}
          setSelected={setLocation}
        />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="min_salary"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Min Salary ($)/month</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <input
          type="number"
          name="min_salary"
          id="min_salary"
          required
          min={0}
          value={formData.min_salary ?? ""}
          onChange={handleChange}
          placeholder="Enter min salary"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="max_salary"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Max Salary ($)/month</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <input
          type="number"
          name="max_salary"
          id="max_salary"
          required
          value={formData.max_salary ?? ""}
          onChange={handleChange}
          min={0}
          placeholder="Enter max salary"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>

      <span className="flex flex-col gap-2 items-start lg:col-span-2">
        <label
          htmlFor="details"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Details i.e (responsibilities, benefits or requirements)</h6>
        </label>
        <DetailsInputField
          setDetailsList={setDetails}
          detailsList={formData?.details}
        />
      </span>
      <div className="lg:col-span-2 place-self-center w-1/2">
        <Button
          type="submit"
          loading={loading}
          name="Post Job"
          styles="bg-primary w-full rounded-md text-white h-10 p-2 self-center"
        />
        {/*
       <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="responsibilities"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Responsibilities</h6>
        </label>
        <ListInputField name="responsibilities" />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="benefits"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Benefits</h6>
        </label>
        <ListInputField name="benefits" />
      </span> */}
      </div>
    </form>
  );
};

export default PostJobForm;
