import Button from "@/components/common/Button";
import { JobFilterProps, JobProps, ManyJobsProps } from "@/interfaces";
import { capitalizeWords, formatDate } from "@/utils";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";


interface SavedJobProps {
  id: string;
  job_details: JobProps;
}

interface SavedJobCardProps {
  savedJob: SavedJobProps;
  fetchJobs: (params?: JobFilterProps) => void;


}

const SavedJobCard: React.FC<SavedJobCardProps> = ({ savedJob, fetchJobs }) => {
  const [job, setJob] = useState<JobProps>(savedJob.job_details);
  const [loading, setLoading] = useState<boolean>(false);

  const removeSavedJob = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.delete(`jobs/saved-jobs/${savedJob.id}/`);

      if (response.status === 204) {
        toast.success("Saved job removed successfully!");
        fetchJobs()
      } else if (response.data.error) {
        toast.error(response.data.error || "Unknown Error ");
      } else {
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error("Saved job removal failed:", error);
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group w-full p-4 border border-borderColor hover:border-gray-400 transition-all ease-in duration-300 cursor-pointer rounded-md shadow flex flex-col gap-2 items-start justify-start">
      <Link
        prefetch={true}
        href={`/jobs/${job.id}`}
        rel="noopener noreferrer"
        target="_blank"
        className="w-full flex flex-col gap-2"
      >
        <div className="flex flex-wrap gap-2 items-start justify-between w-full">
          <div className="flex flex-wrap gap-2 w-full">
            <Image
              src={
               
                `https://ui-avatars.com/api/?name=${job.company_details.name}&size=150`
              }
              alt={job.company_details.name}
              width={50}
              height={50}
            />

            <div className="w-full flex flex-col gap-2">
              <h4 className="text-h4">{job.company_details.name}</h4>
              <h6 className="text-h6 opacity-80">Posted - {formatDate(job.created_at)}</h6>
            </div>
          </div>

          <div className="flex flex-wrap w-full items-start justify-start  gap-2">
            <Button
              name="View"
              styles="bg-background w-[90px] rounded-md text-h6 border-text border-2 h-10 p-1 group-hover:bg-text group-hover:text-background"
              children={<FaArrowRight />}
            />
            <Button
              name="Remove"
              loading={loading}
              onClick={removeSavedJob}
              styles="bg-red-500 w-[90px] rounded-md text-white text-h6 h-10 p-1 hover:bg-red-600"
            />
          </div>
        </div>
      </Link>

      <h3 className="text-h3">{job.title}</h3>
      {job.deadline && <h6 className="text-h6 opacity-80 text-secondary">
        Deadline - {job.deadline}
      </h6>}

      {job.categories && <ul className="text-p readable opacity-90 flex flex-wrap gap-2 text-primary">
        {job.categories?.map((category, index) => (
          <li key={index} className="p-1 rounded-sm">
            {category}
          </li>
        ))}
      </ul>}

      <span className="flex flex-col gap-2 opacity-80 w-full">
        <div className="flex flex-row gap-2 justify-between">
          {job.experience_level && (
            <p className="p-1 rounded-sm">{job.experience_level}</p>
          )}
          <p className="p-1 rounded-sm">{job.job_type}</p>
        </div>
        <div className="flex flex-row justify-between gap-2">
        <span className="p-1 rounded-sm flex flex-row gap-2 items-center">
            <FaMoneyBillWave />
            <p>${job.min_salary} - {job.max_salary}</p>
          </span>
          
          <span className="p-1 rounded-sm flex flex-row gap-2 items-center">
            <FaLocationDot />
            <p>{job.location}</p>
          </span>
        </div>
      </span>
    </div>
  );
};

export default SavedJobCard;
