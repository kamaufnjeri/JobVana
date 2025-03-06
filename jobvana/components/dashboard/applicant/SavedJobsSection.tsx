import React, { useEffect, useState, useCallback } from "react";
import SavedJobCard from "./SavedJobCard";
import Loading from "@/components/common/Loading";
import { JobProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { toast } from "react-toastify";

const SavedJobsSection: React.FC = () => {
  const [jobs, setJobs] = useState<JobProps[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("jobs/saved_jobs"); // Replace with your actual API endpoint

      if (response.status === 200) {
        let jobs = [];
        if (Array.isArray(response.data.data.message)) {
          jobs = response.data.data.message;
        } else {
          jobs = response.data.data;
        }
        setJobs(jobs);
      } else {
        throw new Error("Failed to fetch jobs");
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">Saved Jobs</h2>
          <h5 className="text-h5">
            Keep all your favorite job opportunities in one place. Revisit,
            apply, and take the next step in your career with JobVana!
          </h5>
        </div>
        <section
          className={
            "w-full grid gap-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1"
          }
        >
          {loading ? (
            <Loading styles="h-[400px]" />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : jobs && jobs.length > 0 ? (
            jobs.map((job, index) => <SavedJobCard job={job} key={index} setJobs={setJobs}/>)
          ) : (
            <h3 className="text-h3">No saved jobs found</h3>
          )}
        </section>
      </div>
    </div>
  );
};

export default SavedJobsSection;
