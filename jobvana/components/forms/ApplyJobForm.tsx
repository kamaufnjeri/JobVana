import React, { useState } from "react";
import Button from "../common/Button";
import Select from "react-select";
import { AVAILABILITY_OPTIONS } from "@/constants";
import PDFInputField from "../common/PDFInputField";
import { handleApiError } from "@/utils/errorHandlerUtils";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { JobProps } from "@/interfaces";

// interface for apply job form data
interface ApplyJobFormDataProps {
  resume: string | File;
  linkedin_url?: string;
  availability?: string;
  cover_letter: string;
}

// interface for aapply job form component
interface ApplyJobFormProps {
  job: JobProps;
}

const ApplyJobForm: React.FC<ApplyJobFormProps> = ({ job }) => {
  const [formData, setFormData] = useState<ApplyJobFormDataProps>({
    resume: "",
    cover_letter: "",
    availability: "",
    linkedin_url: "",
  }); // form data for applying a job
  const [resumeUrl, setResumeUrl] = useState<string | null>(null); // resume  url
  const [loading, setLoading] = useState<boolean>(false);

  // handle change in input and textarea fields
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handles change in resume
  const handleResumeChange = (resume: File | string) => {
    setFormData((prev) => ({ ...prev, resume: resume }));
  };

  // handles submition of form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (job) {
      try {
        // use form data for application
        const newFormData = new FormData();

        Object.keys(formData).forEach((key) => {
          newFormData.append(key, (formData as Record<string, any>)[key]);
        });

        // sendt to the backend api
        const response = await api.post(
          `applications/job/${job.id}/`,
          newFormData
        );

        if (response.status === 201) {
          // on success reset form data and toast indicating success
          toast.success(response.data.message);
          setFormData((prev) => ({
            ...prev,
            cover_letter: "",
            resume: "",
            linkedin_url: "",
            availability: "",
          }));
          setResumeUrl(null);
        } else if (response.data.error) {
          toast.error(response.data.error || "Application failed");
        } else {
          throw new Error("Application failed");
        }
      } catch (error) {
        // error display the error
        console.error("Application submission failed:", error);
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      } finally {
        // finally set loading to false
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-2 p-4">
      <h3 className="text-h3">
        Take the Next Step in Your Career—Apply for the {job.title} Position
        Today!
      </h3>
      <h5 className="text-h5">
        Apply now and take the next step in your career. Fill out the form below
        to get started!
      </h5>

      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="cover_letter"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Cover Letter</h6>
          <h6 className="text-red-500">*</h6>
        </label>
        <textarea
          name="cover_letter"
          id="cover_letter"
          required
          value={formData.cover_letter}
          onChange={handleChange}
          placeholder="Start typing cover letter"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 min-h-[200px]"
        ></textarea>
      </span>

      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="resume"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Resume/CV (pdf, doc)</h6>
          <h6 className="text-red-500">*</h6>
        </label>

        <PDFInputField
          handleResumeChange={handleResumeChange}
          resume={formData.resume}
          resumeUrl={resumeUrl}
          setResumeUrl={setResumeUrl}
        />
      </span>
      <span className="flex flex-col gap-2 items-start">
        <label htmlFor="linkedin_url" className="text-h6 font-medium">
          LinkedIn Profile URL
        </label>
        <input
          type="text"
          name="linkedin_url"
          id="linkedin_url"
          value={formData.linkedin_url}
          onChange={handleChange}
          placeholder="Enter linkedin profile url"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>

      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="available"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>When can you start?</h6>
        </label>
        <Select
          className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
          options={AVAILABILITY_OPTIONS}
          placeholder={"Select when can you start"}
          isSearchable
          value={
            AVAILABILITY_OPTIONS.find(
              (level) => level.value === formData.availability
            ) || null
          }
          onChange={(selectedOption) =>
            setFormData((prev) => ({
              ...prev,
              availability: selectedOption?.value || "",
            }))
          }
        />
      </span>

      <div className="self-center lg:w-1/2 w-full md:w-2/3">
        <Button
          type="submit"
          name="Apply"
          loading={loading}
          styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
        />
      </div>
    </form>
  );
};

export default ApplyJobForm;
