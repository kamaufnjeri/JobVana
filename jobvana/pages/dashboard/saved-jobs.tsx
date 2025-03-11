import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import SavedJobsSection from "@/components/dashboard/applicant/SavedJobsSection";
import { JobFilterProps, JobProps, PaginatedResponse } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { toast } from "react-toastify";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import PagesSection from "@/components/common/PagesSection";
import { FaSync } from "react-icons/fa";

interface SavedJobProps {
  id: string;
  job_details: JobProps;
}

type SavedJobsDataProps = PaginatedResponse<SavedJobProps>;

const SavedJobs: React.FC = () => {
  
  const [filters, setFilters] = useState<JobFilterProps>({ page: 1 }); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  const [savedJobs, setSavedJobs] = useState<SavedJobsDataProps | null>(null);

  const prevNext = async (url: string | null) => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await api.get(url);
      if (response.status === 200) {
        setSavedJobs(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async (filters?: JobFilterProps) => {
    setLoading(true);
    try {
      const response = await api.get("jobs/saved-jobs/mine/", { params: filters || {} });

      if (response.status === 200) {
        setSavedJobs(response.data);
      } else {
        toast.error(response.data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Job fetching failed:", error);
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["applicant"]}>
      <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
        <Sidebar />

        <div className="col-span-3 p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
          <div className="w-full flex-col gap justify-between">
            <div className="w-full flex gap-2 flex-col">
              <div className="flex flex-row justify-between items-start gap-2">
              <h2 className="text-h2">Saved Jobs</h2>
              <button onClick={() => fetchJobs()}><FaSync className="text-2xl hover:text-primary"/></button>
              </div>
              <h5 className="text-h5">
                Keep all your favorite job opportunities in one place. Revisit, apply, and take the next step in your career with JobVana!
              </h5>
            </div>

            {loading ? (
              <Loading styles="min-h-[400px]" />
            ) : (
              savedJobs && savedJobs.results.length > 0 ? (
                <SavedJobsSection savedJobs={savedJobs.results} fetchJobs={fetchJobs} />
              ) : (
                <p className="text-center text-gray-500">No saved jobs found.</p>
              )
            )}

            {savedJobs && (
              <div className="w-full flex items-center justify-center">
                <PagesSection
                  noOfPages={savedJobs.total_pages}
                  currentPage={savedJobs.current_page}
                  data={savedJobs}
                  prevNext={prevNext}
                  getItems={fetchJobs}
                  searchItems={filters}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SavedJobs;
