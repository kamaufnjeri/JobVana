import Button from "@/components/common/Button";
import Select from "react-select";
import { JOB_EXPERIENCE_OPTIONS, JOB_TYPES_OPTIONS } from "@/constants";
import React, { useEffect, useState } from "react";
import LocationSelectSingle from "@/components/common/LocationSelectSingle";
import ListDisplay from "@/components/common/ListDisplay";
import { JobDetailProps, JobPostProps, JobProps } from "@/interfaces";
import ListInputField from "@/components/common/ListInputField";
import { formatDate } from "@/utils";
import JobDetailsList from "./JobDetailsList";
import JobDetailsEditContainer from "./JobDetailsEditContainer";
import DeleteModal from "@/components/common/DeleteModal";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import api from "@/utils/api";
import { useRouter } from "next/router";

interface ApplicationModalProps {
  job: JobProps | null;
  error?: string;
}

type UpdateProps =
  | "title"
  | "deadline"
  | "details"
  | "job_type"
  | "experience_level"
  | "location"
  | "categories"
  | "description"
  | "min_salary"
  | "max_salary";

const SingleJobPostedDetails: React.FC<ApplicationModalProps> = ({
  job,
  error,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const [originalJobData, setOriginalJobData] = useState<JobProps | null>(job);
  const [formData, setFormData] = useState<JobPostProps | JobProps>({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    description: true,
    categories: true,
    location: true,
    job_type: true,
    experience_level: true,
    title: true,
    deadline: true,
    max_salary: true,
    min_salary: true,
    details: true,
  });

  useEffect(() => {
    if (originalJobData) {
      setFormData(originalJobData);
    }
  }, [job]);
  const enableEditing = (key: UpdateProps) => {
    setIsDisabled((prev) =>
      Object.fromEntries(
        Object.keys(prev).map((k) => [k, k === key ? false : true])
      )
    );
  };

  const cancelEditing = (key: UpdateProps) => {
    if (originalJobData) {
      setIsDisabled((prev) => ({ ...prev, [key]: true }));
      setFormData((prev) => ({
        ...prev,
        [key]: originalJobData[key],
      }));
    }
  };

  const closeModal = () => setOpenDeleteModal(false);
  const openModal = () => setOpenDeleteModal(true);

  const handleUpdateJob = async (key: UpdateProps) => {
    if (originalJobData && formData) {
      if (formData[key]) {
        setLoading(true);
        const data = { [key]: formData[key] }; // Corrected object structure

        try {
          const response = await api.patch(`jobs/${originalJobData.id}/`, data);
          if (response.status === 200) {
            const updatedJob = response.data.job;
            toast.success(response.data.message);
            setFormData(updatedJob);
            setOriginalJobData(updatedJob);
          } else if (response.data.error) {
            toast.error(response.data.error || "Job update failed");
          } else {
            throw new Error("Job update failed");
          }
        } catch (error) {
          console.error("Job update failed:", error);
          setFormData((prev) => ({ ...prev, [key]: originalJobData[key] }));
          toast.error(handleApiError(error));
        } finally {
          setLoading(false);
          setIsDisabled((prev) => ({ ...prev, [key]: true })); // Disable input after save
        }
      }
    }
  };

  const handleDeleteJob = async () => {
    if (job) {
      setLoading(true);
      try {
        const response = await api.delete(`jobs/${job.id}/`);
        if (response.status === 204) {
          router.push("/dashboard/employer");
          setFormData({
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
          toast.success("Job deleted successfully!");
        } else if (response.data.error) {
          toast.error(response.data.error || "Job delete failed");
        } else {
          throw new Error("Job delete failed");
        }
      } catch (error) {
        console.error("Job delete failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const setCategories = (categories: string[]) => {
    setFormData((prev) => ({
      ...prev,
      categories: categories,
    }));
  };

  const setDetails = (details: JobDetailProps[]) => {
    
    setFormData((prev) => ({
      ...prev,
      details: details, // Updating the details field
    }));
  
    setOriginalJobData((prev) => 
      prev ? { ...prev, details: details } : null
    );
  };
  


  const setLocation = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      location: location,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      {error ? (
        <h3 className="text-h3 text-red-500">{error}</h3>
      ) : originalJobData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 p-6 border-2 border-borderColor shadow-lg rounded-lg">
          {originalJobData && openDeleteModal && (
            <DeleteModal
              closeModal={closeModal}
              deleteItem={handleDeleteJob}
              itemName={`Job - ${originalJobData.title}`}
              loading={loading}
            />
          )}
          <div className="flex lg:flex-row flex-col justify-between items-start pr-5 lg:col-span-2">
            <h2 className="text-h2">Job - {originalJobData.title}</h2>
            <div className="flex gap-2 flex-col items-end justify-between">
              <h4 className="text-h4 font-medium flex flex-row gap-2">
                Date Posted - {formatDate(originalJobData.created_at)}
              </h4>

              <Button
                name="Delete"
                onClick={openModal}
                styles="bg-red-500 rounded-md text-h6 border-text text-white h-10 p-1 w-[150px]  hover:bg-red-600"
              />
            </div>
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
              required
              onChange={handleChange}
              disabled={isDisabled.title}
              placeholder="Enter job title"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.title === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("title")}
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
              onChange={handleChange}
              value={formData.deadline}
              disabled={isDisabled.deadline}
              placeholder="Enter job deadline"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.deadline === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("deadline")}
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
              disabled={isDisabled.description}
              placeholder="Start typing job description ..."
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white min-h-[100px]"
            ></textarea>
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.description === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("description")}
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
              <ListDisplay listItems={formData.categories} type="categories" />
            ) : (
              <ListInputField
                name="Categories"
                items={formData.categories}
                setItems={setCategories}
              />
            )}
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.categories === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("categories")}
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
                (option) => option.value === formData.job_type
              )}
              onChange={(selectedOption) =>
                setFormData((prev) => ({
                  ...prev,
                  job_type: selectedOption?.value || "",
                }))
              }
              isDisabled={isDisabled.job_type}
              placeholder={"Select job type"}
              isSearchable
              menuPlacement="top"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.job_type === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("job_type")}
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
                (option) => option.value === formData.experience_level
              )}
              onChange={(selectedOption) =>
                setFormData((prev) => ({
                  ...prev,
                  experience_level: selectedOption?.value || "",
                }))
              }
              placeholder={"Select experience level"}
              isSearchable
              isDisabled={isDisabled.experience_level}
              menuPlacement="top"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.experience_level === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("experience_level")}
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
              <h6>Location</h6>
              <h6 className="text-red-500">*</h6>
            </label>
            {isDisabled.location ? (
              <p className="text-p">{formData.location}</p>
            ) : (
              <LocationSelectSingle
                selected={formData.location}
                setSelected={setLocation}
              />
            )}
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.location === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("location")}
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
              onChange={handleChange}
              value={formData.min_salary ?? ""}
              disabled={isDisabled.min_salary}
              placeholder="Enter min salary"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.min_salary === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("min_salary")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("min_salary")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("min_salary")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
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
              onChange={handleChange}
              value={formData.max_salary ?? ""}
              disabled={isDisabled.max_salary}
              min={0}
              placeholder="Enter max salary"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.max_salary === false ? (
                <>
                  <Button
                    name="Save"
                    loading={loading}
                    onClick={() => handleUpdateJob("max_salary")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("max_salary")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("max_salary")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
          {formData.details && (
            <span className="flex flex-col gap-2 items-start lg:col-span-2">
              <label
                htmlFor="details"
                className="text-h6 font-medium flex flex-row gap-2"
              >
                <h6>Job Details</h6>
              </label>
              {isDisabled.details === true ? (
                formData.details && (
                  <div className="w-full">
                    <JobDetailsList detailsList={formData.details} />
                  </div>
                )
              ) : (
                <div className="w-full">
                  <JobDetailsEditContainer detailsList={formData.details} setDetailsList={setDetails} job={originalJobData}/>
                </div>
              )}
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.details === false ? (
                  <>
                    <Button
                      name="Cancel"
                      onClick={() => cancelEditing("details")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    onClick={() => enableEditing("details")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
          )}
        </div>
      ) : (
        <h3 className="text-h3">No job found</h3>
      )}
    </div>
  );
};

export default SingleJobPostedDetails;
