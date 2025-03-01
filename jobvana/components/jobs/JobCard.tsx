import { ManyJobsProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import Button from "../common/Button";

interface JobCardProps {
  job: ManyJobsProps;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Link
      href={"/jobs/1"}
      target="_blank" rel="noopener noreferrer"
      className="group w-full p-4 border-borderColor border hover:border-gray-400 transitio-all ease-in duration-300 cursor-pointer rounded-md shadow flex flex-col gap-2 items-start justify-start"
    >
      <div className="flex flex-row gap-2 items-start justify-between w-full">
        <div className="flex flex-wrap gap-2 w-3/4">
          <Image
            src={
              job.logo
                ? job.logo
                : `https://ui-avatars.com/api/?name=${job.company_name}&size=150`
            }
            alt={job.company_name}
            width={50}
            height={50}
          />

          <div className="w-full flex flex-col gap-2">
            <h4 className="text-h4">{job.company_name}</h4>

            <h6 className="text-h6 opacity-80">Posted - {job.date_posted}</h6>
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
      <h3 className="text-h3">{job.job_name}</h3>
      <h6 className="text-h6 opacity-80 text-secondary">Deadline - {job.date_posted}</h6>

      <ul className="text-p readable opacity-90 flex flex-row gap-2 text-primary">
        {job.categories &&
          job.categories.map((category, index) => (
            <li key={index} className="p-1  rounded-sm">
              {formatName(category)}
            </li>
          ))}
      </ul>
      <span className="flex flex-row gap-2 opacity-80 justify-between w-full">
        <p className="p-1 rounded-sm">{formatName(job.level)}</p>
        <p className="p-1 rounded-sm">{formatName(job.type)}</p>

        <span className="p-1 rounded-sm flex flex-row gap-2 items-center">
          <FaLocationDot />
          <p>{job.location}</p>
        </span>
      </span>
    </Link>
  );
};

export default JobCard;
