import Button from "@/components/common/Button";
import { ManyJobsProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

interface SavedJobCardProps {
  job: ManyJobsProps;
}

const SavedJobCard: React.FC<SavedJobCardProps> = ({ job }) => {
  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const [loading, setLoading] = useState<boolean>(false);

  const removeSavedJob = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post(`jobs/${job.job_name}/remove_saved_job/`);
      
      if (response.status === 200) {
        toast.success("Saved job removed successfully!");
      }
    } catch (error) {
      console.error("Saved job removal failed:", error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group w-full p-4 border border-borderColor hover:border-gray-400 transition-all ease-in duration-300 cursor-pointer rounded-md shadow flex flex-col gap-2 items-start justify-start">
      <Link href={`/jobs/${job.job_name}`} className="w-full flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-start justify-between w-full">
          <div className="flex flex-wrap gap-2 w-full">
            <Image
              src={job.logo || `https://ui-avatars.com/api/?name=${job.company_name}&size=150`}
              alt={job.company_name}
              width={50}
              height={50}
            />

            <div className="w-full flex flex-col gap-2">
              <h4 className="text-h4">{job.company_name}</h4>
              <h6 className="text-h6 opacity-80">Posted - {job.date_posted}</h6>
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

      <h3 className="text-h3">{job.job_name}</h3>
      <h6 className="text-h6 opacity-80 text-secondary">Deadline - {job.date_posted}</h6>

      <ul className="text-p readable opacity-90 flex flex-wrap gap-2 text-primary">
        {job.categories?.map((category, index) => (
          <li key={index} className="p-1 rounded-sm">{formatName(category)}</li>
        ))}
      </ul>
      
      <span className="flex flex-wrap gap-2 opacity-80 justify-between w-full">
        <p className="p-1 rounded-sm">{formatName(job.level)}</p>
        <p className="p-1 rounded-sm">{formatName(job.type)}</p>
        <span className="p-1 rounded-sm flex flex-row gap-2 items-center">
          <FaLocationDot />
          <p>{job.location}</p>
        </span>
      </span>
    </div>
  );
};

export default SavedJobCard;
