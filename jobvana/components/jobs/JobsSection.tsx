import { JobProps, ManyJobsProps } from "@/interfaces";
import JobCard from "./JobCard"; // Ensure this component is imported

interface JobsSectionProps {
  jobs: JobProps[];
  styles?: string;
}

const JobsSection: React.FC<JobsSectionProps> = ({ jobs, styles }) => {
  return (
    <section
      className={`w-full grid gap-4 ${
        styles ? styles : "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
      }`}
    >
      {jobs.length > 0 ? (
        jobs.map((job, index) => <JobCard job={job} key={index} />)
      ) : (
        <h3 className="text-h3 place-self-center col-span-1 md:col-span-2 lg:col-span-3">No jobs found</h3>
      )}
    </section>
  );
};

export default JobsSection;
