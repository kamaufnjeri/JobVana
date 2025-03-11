import React from "react";
import SavedJobCard from "./SavedJobCard";
import { JobFilterProps, JobProps } from "@/interfaces";

interface SavedJobProps {
  id: string;
  job_details: JobProps;
}

interface SavedJobsSectionProps {
  savedJobs: SavedJobProps[];
  fetchJobs: (params?: JobFilterProps) => void;
}

const SavedJobsSection: React.FC<SavedJobsSectionProps> = ({
  savedJobs,
  fetchJobs,
}) => {
  return (
    <section
      className={"w-full grid gap-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1"}
    >
      {savedJobs && savedJobs.length > 0 ? (
        savedJobs.map((savedJob, index) => (
          <SavedJobCard savedJob={savedJob} key={index} fetchJobs={fetchJobs} />
        ))
      ) : (
        <h3 className="text-h3">No saved savedJobs found</h3>
      )}
    </section>
  );
};

export default SavedJobsSection;
