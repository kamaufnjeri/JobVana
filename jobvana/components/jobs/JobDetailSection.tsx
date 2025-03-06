import { JobDetailsProps, JobProps } from "@/interfaces";
import Image from "next/image";
import { FaLocationDot, FaMoneyBillWave } from "react-icons/fa6";
import { capitalizeWords, formatDate } from "@/utils";
import JobDetails from "../common/JobDetails";

interface JobDetailSectionProps {
  job: JobProps ;
}

const JobDetailSection: React.FC<JobDetailSectionProps> = ({ job }) => {
  

  return (
    <div className="p-4 border-borderColor border rounded-md shadow flex flex-col gap-4 items-start justify-start">
      <div className="flex flex-row gap-2 items-center justify-center">
        
          <Image
            src={
          `https://ui-avatars.com/api/?name=${job.company_details.name}&size=150`
            }
            alt={job.company_details.name}
            width={50}
            height={50}
          />
       
        <span className="flex flex-col gap-2">
          <h4 className="text-h4">{job.company_details.name}</h4>
          {job.created_at && <h6 className="text-h6 opacity-80">Posted - {formatDate(job.created_at)}</h6>}
        </span>
      </div>
      <h3 className="text-h3">{job.title}</h3>
      {job?.deadline &&<h6 className="text-h6 opacity-80 text-secondary">
        Deadline - {formatDate(job.deadline)}
      </h6>}

      <ul className="text-p readable opacity-90 flex flex-row gap-2 text-primary">
        {job.categories &&
          job.categories.map((category, index) => (
            <li key={index} className="p-1  rounded-sm">
              {category}
            </li>
          ))}
      </ul>
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
      {job.description && (
        <div className="w-full flex items-start justify-start gap-2 flex-col">
          <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

          <h4 className="text-h4 font-semibold">Job Overview</h4>
          <p className="text-p">{job.description}</p>
        </div>
      )}
      {
        job.details &&
        <JobDetails detailsList={job.details}/>
      }
     
    </div>
  );
};

export default JobDetailSection;
