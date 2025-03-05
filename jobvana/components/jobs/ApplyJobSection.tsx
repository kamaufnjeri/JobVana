import React, { useState } from "react";
import Button from "../common/Button";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";

interface ApplyJobSectionProps {
  openModal: () => void;
  jobId: string;
}
const ApplyJobSection: React.FC<ApplyJobSectionProps> = ({
  openModal,
  jobId = "",
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveJob = async () => {
    setLoading(true);

    try {
      const response = await api.post(`jobs/${jobId}/save_job/`);

      if (response.status === 200) {
        toast.success("Job saved successfully!");
      }
    } catch (error) {
      console.error("Application submission failed:", error);
      handleApiError(error);
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

        <h3 className="text-h3">About JobVana</h3>
        <p className="text-stylish text-p">
          JobVana is a leading platform connecting job seekers with top
          employers. Our mission is to make job searching easy, efficient, and
          accessible for everyone. Whether you're looking for your next
          opportunity or the perfect candidate, JobVana is here to help.
        </p>
      </div>
    </div>
  );
};

export default ApplyJobSection;
