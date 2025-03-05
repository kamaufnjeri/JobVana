import { JobDetailsProps } from "@/interfaces";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import ListTextContainer from "../common/ListTextContainer";

interface JobDetailSectionProps {
  job: JobDetailsProps;
}

const JobDetailSection: React.FC<JobDetailSectionProps> = ({ job }) => {
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="p-4 border-borderColor border rounded-md shadow flex flex-col gap-4 items-start justify-start">
      <div className="flex flex-row gap-2 items-center justify-center">
        {job.logo && (
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
        )}
        <span className="flex flex-col gap-2">
          <h4 className="text-h4">{job.company_name}</h4>
          <h6 className="text-h6 opacity-80">Posted - {job.date_posted}</h6>
        </span>
      </div>
      <h3 className="text-h3">{job.job_name}</h3>
      <h6 className="text-h6 opacity-80 text-secondary">
        Deadline - {job.date_posted}
      </h6>

      <ul className="text-p readable opacity-90 flex flex-row gap-2 text-primary">
        {job.categories &&
          job.categories.map((category, index) => (
            <li key={index} className="p-1  rounded-sm">
              {formatName(category)}
            </li>
          ))}
      </ul>
      <span className="flex flex-row gap-2 opacity-80 justify-between w-full">
        <p className="p-1 rounded-sm ">{formatName(job.level)}</p>
        <p className="p-1 rounded-sm">{formatName(job.type)}</p>

        <span className="p-1 rounded-sm flex flex-row gap-2 items-center">
          <FaLocationDot />
          <p>{job.location}</p>
        </span>
      </span>
      {job.description && (
        <div className="w-full flex items-start justify-start gap-2 flex-col">
          <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

          <h4 className="text-h4 font-semibold">Job Overview</h4>
          <p className="text-p">{job.description}</p>
        </div>
      )}
      {job.benefits && (
        <div className="w-full flex items-start justify-start gap-2 flex-col">
          <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

          <h4 className="text-h4 font-semibold">What's in It for You</h4>
          <ListTextContainer listItems={job.benefits} />
        </div>
      )}
      {job.requirements && (
        <div className="w-full flex items-start justify-start gap-2 flex-col">
          <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

          <h4 className="text-h4 font-semibold">What We're Looking For</h4>
          <ListTextContainer listItems={job.requirements} />
        </div>
      )}
      {job.responsibilities && (
        <div className="w-full flex items-start justify-start gap-2 flex-col">
          <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

          <h4 className="text-h4 font-semibold">What You'll Do</h4>
          <ListTextContainer listItems={job.responsibilities} />
        </div>
      )}
    </div>
  );
};

export default JobDetailSection;
