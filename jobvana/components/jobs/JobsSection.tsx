import { JobProps } from "@/interfaces";
import JobCard from "./JobCard"; // Ensure this component is imported

//  interface for jobssection components
interface JobsSectionProps {
  jobs: JobProps[]; // array of jobs
  styles?: string; // styles to be used on component
}

const JobsSection: React.FC<JobsSectionProps> = ({ jobs, styles }) => {
  return (
    <section
      className={`w-full grid gap-4 ${
        styles ? styles : "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
      }`}
    >
      {jobs && jobs.length > 0 ? (
        jobs.map((job, index) => <JobCard job={job} key={index} />)
      ) : (
        <h3 className="text-h3 place-self-center col-span-1 md:col-span-2 lg:col-span-3">
          No jobs found
        </h3>
      )}
    </section>
  );
};

export default JobsSection;
