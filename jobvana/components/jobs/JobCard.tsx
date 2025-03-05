import { JobProps, ManyJobsProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import Button from "../common/Button";
import { capitalizeWords, formatDate } from "@/utils";
import { FaMoneyBillWave } from "react-icons/fa";

interface JobCardProps {
  job: JobProps;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  

  return (
    <Link
      prefetch={true}
      href={`jobs/${job.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-full p-4 border-borderColor border hover:border-gray-400 transitio-all ease-in duration-300 cursor-pointer rounded-md shadow flex flex-col gap-2 items-start justify-start"
    >
      <div className="flex flex-row gap-2 items-start justify-between w-full">
        <div className="flex flex-wrap gap-2 w-3/4">
          <Image
            src={`https://ui-avatars.com/api/?name=${job.company.name}&size=50`}
            alt={job.company.name}
            width={50}
            height={50}
          />

          <div className="w-full flex flex-col gap-2">
            <h4 className="text-h4">{job.company.name}</h4>

            <h6 className="text-h6 opacity-80">
              Posted - {formatDate(job.created_at)}
            </h6>
          </div>
        </div>

        <div className="flex items-end justify-end w-1/4">
          <Button
            name="View"
            styles="bg-background rounded-md text-h6 border-text border-2 h-10 p-1 w-full  group-hover:bg-text group-hover:text-background"
            children={<FaArrowRight />}
          />
        </div>
        <div></div>
      </div>
      <h3 className="text-h3">{job.title}</h3>
      {job.deadline && (
        <h6 className="text-h6 opacity-80 text-secondary">
          Deadline - {formatDate(job.deadline)}
        </h6>
      )}

      <ul className="text-p readable opacity-90 flex flex-row gap-2 text-primary">
        {job.category &&
          job.category.map((category, index) => (
            <li key={index} className="p-1  rounded-sm">
              {capitalizeWords(category)}
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
    </Link>
  );
};

export default JobCard;
