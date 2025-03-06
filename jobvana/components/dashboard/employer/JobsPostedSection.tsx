import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import PagesSection from "@/components/common/PagesSection";
import { SAMPLE_JOBS, SORT_BY_OPTIONS } from "@/constants";
import { JobProps, PaginatedResponse } from "@/interfaces";
import { formatDate } from "@/utils";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSync } from "react-icons/fa";
import Select from "react-select";
import { toast } from "react-toastify";

const JobsPostedSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobsData, setJobsData] = useState<PaginatedResponse<JobProps> | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<{ [key: string]: string | number }>({
    search: "",
    page: 1,
  });

  const fetchJobs = async (search?: { [key: string]: string | number }) => {
    setLoading(true);
    try {
      const response = await api.get("jobs/mine/", {
        params: search ? search : {},
      });

      if (response.status === 200) {
        setJobsData(response.data);
      } else if (response.data.error) {
        toast.error(response.data.error || "Unknown Error ");
      } else {
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error("Job posting failed:", error);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const prevNext = async (url: string | null) => {
    setLoading(true);

    if (url) {
      try {
        const response = await api.get(url);
        if (response.status == 200) {
          setJobsData(response.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error(`Error': Error fetching ministries`);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      <div className="w-full flex lg:flex-row flex-col gap-2 justify-between">
        <div className="lg:w-1/2 w-full flex flex-col gap-2">
          <h2 className="text-h2">Jobs Posted</h2>
        </div>

        <span className="flex flex-row gap-2 items-center justify-between lg:w-1/2 w-full border-borderColor border-b p-2">
          <input
            type="text"
            name="search"
            id="search"
            required
            value={search.search}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search..."
            className="rounded-md text-gray-800 outline-none w-1/2 border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => fetchJobs(search)}>
            <FaSearch className="hover:text-primary text-xl" />
          </button>
          <button onClick={() => {
            fetchJobs();
            setSearch({
              search: "",
              page: 1
            })
            }}>
            <FaSync className="hover:text-primary text-xl" />
          </button>
        </span>
      </div>

      {/* 🚀 SCROLLABLE TABLE CONTAINER */}
      {loading ? (
        <Loading styles="w-[400px" />
      ) : error ? (
        <h3 className="text-h3 text-red-500">{error}</h3>
      ) : jobsData ? (
        <>
          <div className="w-full overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-[700px] w-full border border-borderColor rounded-lg">
              <thead>
                <tr className="bg-primary text-left text-white">
                  <th className="p-3 border-b border-borderColor min-w-[200px]">
                    Job Title
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[180px]">
                    Date Posted
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[160px]">
                    Deadline
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[140px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobsData?.results &&
                  jobsData.results.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-borderColor hover:opacity-100 opacity-80"
                    >
                      <td className="p-3">{job.title}</td>
                      <td className="p-3">{formatDate(job.created_at)}</td>
                      {job.deadline && (
                        <td className="p-3">{formatDate(job.deadline)}</td>
                      )}
                      <td className="p-3">
                        <Link
                          prefetch={true}
                          target='_blank'
                          rel="noopener noreferrer"
                          href={`/dashboard/jobs/${job.id}`}
                        >
                          <Button
                            styles="bg-gray-800 rounded-md text-white h-10 px-4"
                            name="View"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex items-center justify-center">
          <PagesSection
            noOfPages={jobsData.total_pages}
            currentPage={jobsData.current_page}
            data={jobsData}
            prevNext={prevNext}
            getItems={fetchJobs}
            searchItems={search}
          />
          </div>
        </>

      ) : (
        <h3 className="text-h3">No jobs found</h3>
      )}
    </div>
  );
};

export default JobsPostedSection;
