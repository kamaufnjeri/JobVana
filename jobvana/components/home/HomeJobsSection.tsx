import { SAMPLE_JOBS } from "@/constants";
import Link from "next/link";
import React from "react";
import JobsSection from "../jobs/JobsSection";

const latestJobs = SAMPLE_JOBS.slice(0, 6);
const HomeJobsSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col gap-2 items-start justify-start">
      <h2 className="text-h2">Latest Jobs Opening</h2>
      <span className="w-full flex flex-row justify-between gap-4">
        <p className="readable text-h5">
          Discover the newest job opportunities from top companies.
        </p>
        <Link
          href="/jobs"
          className="bg-primary p-2 rounded-sm text-center text-h5 hover:opacity-80 opacity-100 text-white"
        >
          See All jobs
        </Link>
      </span>
      <JobsSection jobs={latestJobs} />
    </section>
  );
};

export default HomeJobsSection;
