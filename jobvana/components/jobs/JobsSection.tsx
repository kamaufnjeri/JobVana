import { ManyJobsProps } from "@/interfaces";
import JobCard from "./JobCard"; // Ensure this component is imported

interface JobsSectionProps {
    jobs: ManyJobsProps[];
}

const JobsSection: React.FC<JobsSectionProps> = ({ jobs }) => {
    return (
        <section className="w-full grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <JobCard job={job} key={index} />
                ))
            ) : (
                <h3>No jobs found</h3>
            )}
        </section>
    );
};

export default JobsSection;
