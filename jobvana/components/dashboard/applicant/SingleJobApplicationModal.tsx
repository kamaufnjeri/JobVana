import Button from "@/components/common/Button";
import PDFInputField from "@/components/common/PDFInputField";
import Select from "react-select";
import { AVAILABILITY_OPTIONS } from "@/constants";
import { ApplicationProps, JobApplicationProps, JobFilterProps } from "@/interfaces";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { capitalizeWords, formatDate } from "@/utils";
import FileViewer from "@/components/common/FileViewer";
import { Update } from "next/dist/build/swc/types";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import api from "@/utils/api";
import { isNull } from "util";

interface ApplicationModalProps {
  application: ApplicationProps;
  fetchApplications: (filters?: JobFilterProps) => void;
  closeModal: () => void;
}
type UpdateProps =
  | "availability"
  | "linkedin_url"
  | "cover_letter"
  | "resume";


const SingleJobApplicationModal: React.FC<ApplicationModalProps> = ({
  application,
  fetchApplications,
  closeModal,
}) => {
  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    availability: true,
    resume: true,
    cover_letter: true,
    linkedin_url: true,
  });
  const [resumeUrl, setResumeUrl] = useState<string | null>(application.resume_url);
  const [loading, setLoading] = useState(false);
  const [displayApplication, setDisplayApplication] = useState<ApplicationProps>(application);
  const [deleteApplication, setDeleteApplication] = useState<boolean>(false);

  const handleApplicationUpdate = async (key: UpdateProps) => {
    if (!displayApplication && displayApplication[key] === null) return;
    setLoading(true);

    try {
      const formData = new FormData()
      if (key === "resume" && displayApplication.resume instanceof File) {
        formData.append(key, displayApplication.resume); // Append file if it's a File object
      } else if (typeof displayApplication[key] === "string") {
        formData.append(key, displayApplication[key] as string); // Append string if it's a string
      }
  
      const response = await api.patch(`applications/${application.id}/`, formData);

      if (response.status === 200) {
        const newApplication = response.data.application;
        setDisplayApplication(newApplication);
        toast.success(response.data.message);
        setResumeUrl(newApplication.resume_url)
        fetchApplications();
      } else {
        toast.error(response.data.error || "Failed to update application");
      }
    } catch (error) {
      toast.error(handleApiError(error));
      setDisplayApplication((prev) => ({ ...prev, [key]: application[key] }));
      setResumeUrl(application.resume_url)
    } finally {
      setLoading(false);
      setIsDisabled((prev) => ({ ...prev, [key]: true }));

    }
  };

  const enableEditing = (key: UpdateProps) => {
    setIsDisabled((prev) =>
      Object.fromEntries(
        Object.keys(prev).map((k) => [k, k === key ? false : true])
      )
    );
  };

  const cancelEditing = (key: UpdateProps) => {
   
      setIsDisabled((prev) => ({ ...prev, [key]: true }));
      setDisplayApplication((prev) => ({
        ...prev,
        [key]: application[key],
      }));
      if (key === 'resume') {
        setResumeUrl(application.resume_url)
      }
  };

 

  const handleResumeChange = (resume: File | string) => {
    setDisplayApplication((prev) => ({ ...prev, resume: resume }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDisplayApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteApplication = async () => {
    if (application) {
      setLoading(true);
      try {
        const response = await api.delete(`applications/${application.id}/`);
        if (response.status === 204) {
          fetchApplications()
          closeModal()
        
          toast.success("Job deleted successfully!");
        } else if (response.data.error) {
          toast.error(response.data.error || "Application delete failed");
        } else {
          throw new Error("Application delete failed");
        }
      } catch (error) {
        console.error("Application delete failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-2xl flex flex-col gap-6 relative h-auto max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Close Button */}
        <FaTimes
          className="cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute"
          onClick={closeModal}
        />
  
        <div className="flex flex-col w-full gap-6 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{displayApplication?.job_details.title}</h2>
            {displayApplication.created_at && (
              <p className="text-gray-500 text-sm">Date Applied: {formatDate(displayApplication.created_at)}</p>
            )}
          </div>
  
          <div className={`flex flex-col ${deleteApplication ? "lg:flex-col" : "lg:flex-row"} justify-between items-start gap-4`}>
            <Link
              href={`jobs/${application.job_details.id}`}
              className="self-end"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                name="View Job"
                styles="bg-background rounded-md text-h6 border-text border-2 h-10 px-4 w-[150px] hover:bg-text hover:text-background"
                children={<FaArrowRight />}
              />
            </Link>
           {deleteApplication ?
           <div className="flex flex-col gap-2 justify-center items-center text-center">
            <h4 className="text-h3">Are you sure you want to delete application?</h4>
            <p className="text-p">If so click Delete else click Cancel</p>
            <div className="flex flex-row gap-2">
            <Button
              name="Delete"
              loading={loading}
              onClick={() => handleDeleteApplication()}
              styles="bg-red-500 rounded-md text-h6 text-white h-10 px-4 w-[150px] hover:bg-red-600"
            />
            <Button name="Cancel" onClick={() => setDeleteApplication(false)} styles="bg-gray-700 rounded-md text-white h-10 px-4" />

            </div>
           </div> :
           <Button
              name="Delete"
              onClick={() => setDeleteApplication(true)}
              styles="bg-red-500 rounded-md text-h6 text-white h-10 px-4 w-[150px] hover:bg-red-600"
            />}
          </div>
  
          <div className="space-y-4">
            <span className="flex flex-col gap-2">
              <label className="text-h6 font-medium">Application Status:</label>
              <p>{displayApplication.status}</p>
            </span>
  
            <span className="flex flex-col gap-2">
              <label className="text-h6 font-medium flex items-center gap-1">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                name="cover_letter"
                required
                onChange={handleChange}
                disabled={isDisabled.cover_letter}
                value={displayApplication.cover_letter}
                placeholder="Start typing cover letter"
                className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 min-h-[200px] bg-white"
              ></textarea>
              <div className="flex justify-end gap-2">
                {isDisabled.cover_letter ? (
                  <Button name="Edit" onClick={() => enableEditing("cover_letter")} styles="bg-primary rounded-md text-white h-10 px-4" />
                ) : (
                  <>
                    <Button name="Save" loading={loading} onClick={() => handleApplicationUpdate("cover_letter")} styles="bg-primary rounded-md text-white h-10 px-4" />
                    <Button name="Cancel" onClick={() => cancelEditing("cover_letter")} styles="bg-gray-700 rounded-md text-white h-10 px-4" />
                  </>
                )}
              </div>
            </span>
  
            <span className="flex flex-col gap-2">
              <label className="text-h6 font-medium flex items-center gap-1">
                Resume/CV (pdf, doc) <span className="text-red-500">*</span>
              </label>
              {isDisabled.resume ? (
                <FileViewer fileUrl={displayApplication.resume_url} />
              ) : (
                <PDFInputField resume={displayApplication.resume} handleResumeChange={handleResumeChange} resumeUrl={resumeUrl} setResumeUrl={setResumeUrl} />
              )}
              <div className="flex justify-end gap-2">
                {isDisabled.resume ? (
                  <Button name="Edit" onClick={() => enableEditing("resume")} styles="bg-primary rounded-md text-white h-10 px-4" />
                ) : (
                  <>
                    <Button name="Save" loading={loading} onClick={() => handleApplicationUpdate("resume")} styles="bg-primary rounded-md text-white h-10 px-4" />
                    <Button name="Cancel" onClick={() => cancelEditing("resume")} styles="bg-gray-700 rounded-md text-white h-10 px-4" />
                  </>
                )}
              </div>
            </span>
  
            <span className="flex flex-col gap-2">
              <label className="text-h6 font-medium flex items-center gap-1">
                When can you start? <span className="text-red-500">*</span>
              </label>
              <Select
                className="rounded-md text-gray-800 outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
                options={AVAILABILITY_OPTIONS}
                value={displayApplication.availability ? AVAILABILITY_OPTIONS.find((option) => option.value === displayApplication.availability) : null}
                onChange={(selectedOption) => setDisplayApplication((prev) => ({ ...prev, availability: selectedOption?.value || "" }))}
                placeholder="Select when can you start"
                isSearchable
                isDisabled={isDisabled.availability}
              />
              <div className="flex justify-end gap-2">
                {isDisabled.availability ? (
                  <Button name="Edit" onClick={() => enableEditing("availability")} styles="bg-primary rounded-md text-white h-10 px-4" />
                ) : (
                  <>
                    <Button name="Save" loading={loading} onClick={() => handleApplicationUpdate("availability")} styles="bg-primary rounded-md text-white h-10 px-4" />
                    <Button name="Cancel" onClick={() => cancelEditing("availability")} styles="bg-gray-700 rounded-md text-white h-10 px-4" />
                  </>
                )}
              </div>
            </span>
  
            <span className="flex flex-col gap-2">
              <label className="text-h6 font-medium">LinkedIn Profile URL</label>
              <input
                type="text"
                name="linkedin_url"
                required
                onChange={handleChange}
                disabled={isDisabled.linkedin_url}
                value={displayApplication.linkedin_url ?? ""}
                placeholder="Enter LinkedIn profile URL"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="flex justify-end gap-2">
                {isDisabled.linkedin_url ? (
                  <Button name="Edit" onClick={() => enableEditing("linkedin_url")} styles="bg-primary rounded-md text-white h-10 px-4" />
                ) : (
                  <>
                    <Button name="Save" loading={loading} onClick={() => handleApplicationUpdate("linkedin_url")} styles="bg-primary rounded-md text-white h-10 px-4" />
                    <Button name="Cancel" onClick={() => cancelEditing("linkedin_url")} styles="bg-gray-700 rounded-md text-white h-10 px-4" />
                  </>
                )}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobApplicationModal;
