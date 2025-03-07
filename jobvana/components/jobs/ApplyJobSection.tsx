import React, { useState } from "react";
import Button from "../common/Button";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { JobProps } from "@/interfaces";

interface ApplyJobSectionProps {
  openModal: () => void;
  job: JobProps;
}
const ApplyJobSection: React.FC<ApplyJobSectionProps> = ({
  openModal,
  job,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveJob = async () => {
    setLoading(true);

    try {
      const response = await api.post(`jobs/${job.id}/save-job/`);

      if (response.status === 201) {
        toast.success(response.data.message);
      }
      else if (response.data.error) {
        toast.error(response.data.error || 'Job saving failed');
    } else {
        throw new Error('Job saving failed');
    }
    } catch (error) {
      console.error("Application submission failed:", error);
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 border-borderColor border rounded-md shadow flex flex-col gap-4 items-start justify-start">
      <div className="w-full shadow-md rounded-md p-3 flex gap-2 flex-col">
        <Button
          type="button"
          onClick={openModal}
          name="Apply"
          styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
        />
        <Button
          type="button"
          loading={loading}
          onClick={handleSaveJob}
          name="Save Job for Later"
          styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-center"
        />
      </div>
      <div className="flex flex-col gap-2 items-start justify-start shadow-md rounded-md p-3">
        {/* Section about the company*/}
        <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

        <h3 className="text-h3">About {job.company_details.name}</h3>
        <p className="text-stylish text-p">
          {job.company_details.description}
        </p>
      </div>
    </div>
  );
};

export default ApplyJobSection;
