import Button from "@/components/common/Button";
import FileViewer from "@/components/common/FileViewer";
import { APPLICATIONS_STATUS_OPTIONS } from "@/constants";
import { ApplicationProps, JobFilterProps } from "@/interfaces";
import { formatDate } from "@/utils";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Link from "next/link";
import { useState } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import Select from "react-select";
import { toast } from "react-toastify";

interface ApplicationReceivedModalProps {
  application: ApplicationProps;
  fetchApplications: (filters?: JobFilterProps) => void;
  closeModal: () => void;
}

const SingleApplicationReceivedModal: React.FC<ApplicationReceivedModalProps> = ({
  application,
  fetchApplications,
  closeModal,
}) => {
  const [isStatusDisabled, setIsStatusDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [displayApplication, setDisplayApplication] = useState<ApplicationProps>(application);

  const handleStatusUpdate = async () => {
    if (!displayApplication) return;
    setLoading(true);

    try {
      const formData = new FormData()
      formData.append('status', displayApplication.status)
      const response = await api.patch(`applications/${application.id}/`, formData);

      if (response.status === 200) {
        setDisplayApplication(response.data.application);
        toast.success(response.data.message);
        fetchApplications();
      } else {
        toast.error(response.data.error || "Failed to update application status");
      }
    } catch (error) {
      toast.error(handleApiError(error));
      setDisplayApplication((prev) => ({ ...prev, status: application.status }));
    } finally {
      setLoading(false);
      setIsStatusDisabled(true);
    }
  };

  const cancelEditing = () => {
    setIsStatusDisabled(true);
    setDisplayApplication((prev) => ({ ...prev, status: application.status }));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-2xl flex flex-col gap-4 relative h-auto max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Close Button */}
        <FaTimes className="cursor-pointer text-2xl hover:text-primary absolute top-4 right-4" onClick={closeModal} />

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">{displayApplication?.applicant_details.name}</h2>
          {displayApplication.created_at && (
            <p className="text-gray-500 text-sm">Date Applied: {formatDate(displayApplication.created_at)}</p>
          )}
        </div>

        {/* Status Update */}
        <div>
          <h3 className="text-lg font-semibold">Application Status</h3>
          <Select
            className="w-full border border-gray-300 rounded-md"
            options={APPLICATIONS_STATUS_OPTIONS}
            value={APPLICATIONS_STATUS_OPTIONS.find((option) => option.value === displayApplication.status)}
            placeholder="Select status"
            onChange={(selectedOption) =>
              setDisplayApplication((prev) => ({
                ...prev,
                status: selectedOption?.value || "",
              }))
            }
            isSearchable
            isDisabled={isStatusDisabled}
          />
          <div className="flex justify-end space-x-2 mt-3">
            {isStatusDisabled ? (
              <Button name="Change" onClick={() => setIsStatusDisabled(false)} styles="bg-primary rounded-md text-white h-10 p-2 self-end" />
            ) : (
              <>
                <Button name="Save" onClick={handleStatusUpdate} loading={loading} styles="bg-primary rounded-md text-white h-10 p-2 self-center" />
                <Button name="Cancel" onClick={() => cancelEditing()} styles="bg-gray-800 rounded-md text-white h-10 p-2 self-center" />
              </>
            )}
          </div>
        </div>

      
        {/* Resume / CV */}
        {displayApplication.resume_url && (
          <div>
            <h3 className="text-lg font-semibold">Resume / CV</h3>
            <FileViewer fileUrl={displayApplication.resume_url} />
          </div>
        )}

          {/* Availability */}
          <div>
          <h3 className="text-lg font-semibold">Availability</h3>
          <p className="text-gray-700">{displayApplication.availability}</p>
        </div>

        {/* Cover Letter */}
        <div>
          <h3 className="text-lg font-semibold">Cover Letter</h3>
          <p className="text-gray-700">{displayApplication.cover_letter}</p>
        </div>

        {/* LinkedIn Profile */}
       
          <div>
            <h3 className="text-lg font-semibold">LinkedIn Profile</h3>
            {displayApplication.linkedin_url && ( <Link href={displayApplication.linkedin_url} target="_blank" rel="noopener noreferrer">
              <Button name="View Profile" styles="bg-blue-600 text-white flex items-center space-x-2">
                <FaArrowRight />
              </Button>
            </Link>)}
          </div>
        

      </div>
    </div>
  );
};

export default SingleApplicationReceivedModal;
