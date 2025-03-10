import { GetServerSideProps } from "next";
import { JobFilterProps, JobProps, PaginatedResponse } from "@/interfaces";
import JobsFiltersSection from "@/components/jobs/JobsFiltersSection";
import JobsSection from "@/components/jobs/JobsSection";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { toast } from "react-toastify";
import { useState } from "react";
import PagesSection from "@/components/common/PagesSection";
import Loading from "@/components/common/Loading";
import Pill from "@/components/common/Pill";


interface JobsPageProps {
  jobsData: PaginatedResponse<JobProps>;
}


const JobsPage: React.FC<JobsPageProps> = ({ jobsData }) => {
  const [displayJobsData, setDisplayJobsData] = useState<PaginatedResponse<JobProps>>(jobsData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('')
  const [filters, setFilters] = useState<JobFilterProps>({
    search: '',
    location: '',
    job_type: '',
    experience_level: '',
    categories: '',
    page: 1,
  })

  const prevNext = async (url: string | null) => {
    setLoading(true);

    if (url) {
      try {
        const response = await api.get(url);
        if (response.status == 200) {
          setDisplayJobsData(response.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error(`Error': Error fetching jobs`);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchJobs = async (filters?: JobFilterProps) => {
    setLoading(true);
    try {
      const response = await api.get("jobs/", {
        params: filters ? filters : {},
      });

      if (response.status === 200) {
        setDisplayJobsData(response.data);
      } else if (response.data.error) {
        toast.error(response.data.error || "Unknown Error ");
      } else {
        throw new Error("Unknown error");
      }
    } catch (error) {
      console.error("Job posting failed:", error);
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const onRemove = async (key: string) => {
    const newFilters = { ...filters, [key]: "" }; // Set the selected filter to an empty string
    await fetchJobs(newFilters); // Fetch jobs with updated filters
    setFilters(newFilters); // Update state
  };
  


  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      <div className="w-full md:w-1/3 lg:w-1/4">
        <JobsFiltersSection filters={filters} setFilters={setFilters} fetchJobs={fetchJobs}/>
      </div>
      {displayJobsData && <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-2 items-center">
     
      <div className="flex flex-wrap gap-2 items-center w-full">
  {Object.entries(filters).map(([key, value]) => 
    (value && key !== "page") ? (
      <Pill key={key} name={key} text={value} onRemove={onRemove} />
    ) : null
  )}
</div>

     
       {loading ? <Loading styles="min-h-400px"/> : <JobsSection
          jobs={displayJobsData?.results}
          styles="grid-cols-1 lg:grid-cols-2"
        />}
        
      <div className="w-full flex items-center justify-center">
          <PagesSection
            noOfPages={displayJobsData.total_pages}
            currentPage={displayJobsData.current_page}
            data={displayJobsData}
            prevNext={prevNext}
            getItems={fetchJobs}
            searchItems={filters}
          />
          </div>
      </div>}
      
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await api.get("jobs/"); // Replace with your actual API endpoint
    if (response.status === 200) {
      const jobsData = response.data;

      return {
        props: {
          jobsData, // Pass fetched jobs to the page
        },
      };
    } else {
      throw new Error("Failed to fetch jobs");
    }
  } catch (error) {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return {
      props: {
        jobsData: [], // Return empty data if fetch fails
      },
    };
  }
};

export default JobsPage;
