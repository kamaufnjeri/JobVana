import Select from "react-select";
import {
  APPLICATIONS_STATUS_OPTIONS,
  AVAILABILITY_OPTIONS,
} from "@/constants";
import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import {
  ApplicationProps,
  JobFilterProps,
  JobProps,
  PaginatedResponse,
} from "@/interfaces";
import SingleApplicationReceivedModal from "./SingleApplicationReceivedModal";
import api from "@/utils/api";
import { formatDate } from "@/utils";
import Link from "next/link";
import { FaArrowRight, FaSync } from "react-icons/fa";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Loading from "@/components/common/Loading";
import PagesSection from "@/components/common/PagesSection";


interface SingleJobPostedSectionProps {
  job: JobProps | null;
  error?: string;
}

const SingleJobPostedSection: React.FC<SingleJobPostedSectionProps> = ({
  job,
  error,
}) => {
  const [openApplicationModal, setOpenApplicationModal] = useState(false);
  const [applicationInModal, setApplicationInModal] = useState<ApplicationProps | null>(null);
  const [applicationsData, setApplicationsData] =
    useState<PaginatedResponse<ApplicationProps> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<JobFilterProps>({
    status: "",
    availability: "",
    page: 1,
  });

  const openApplicationModalFunc = (application: ApplicationProps) => {
    setOpenApplicationModal(true);
    setApplicationInModal(application);
  };

  const closeApplicationModal = () => {
    setOpenApplicationModal(false);
    setApplicationInModal(null);
  };

  

  const fetchApplications = async (filters?: {
    [key: string]: string | number;
  }) => {
    setLoading(true);
    if (job) {
      try {
        const response = await api.get(`applications/job/${job.id}/`, {
          params: filters ? filters : {},
        });

        if (response.status === 200) {
          setApplicationsData(response.data);
        } else if (response.data.error) {
          toast.error(response.data.error || "Unknown Error ");
        } else {
          throw new Error("Unknown error");
        }
      } catch (error) {
        console.error("Appplication fetching failed:", error);
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const prevNext = async (url: string | null) => {
    setLoading(true);

    if (url) {
      try {
        const response = await api.get(url);
        if (response.status == 200) {
          setApplicationsData(response.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error(`Error': Error fetching applicationss`);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      {error ? (
        <h3 className="text-h3 text-red-500">{error}</h3>
      ) : job ? (
        <>
          {(openApplicationModal && applicationInModal) && (
            <SingleApplicationReceivedModal
              closeModal={closeApplicationModal}
              fetchApplications={fetchApplications}
              application={applicationInModal}
            />
          )}

          <div className="w-full flex flex-col gap-2 justify-between">
            <div className="w-full flex flex-wrap justify-between gap-2">
              <h2 className="text-h2">Applications for {job.title} job</h2>
              <Link
                href={`/dashboard/jobs/${job.id}/details`}
                prefetch={true}
                className="bg-gray-800 rounded-md h-10 px-2 text-white flex flex-row gap-2 items-center "
              >
                <p>Details</p>
                <FaArrowRight />
              </Link>
            </div>

            <span className="flex lg:flex-row md:flex-row flex-col gap-2 self-end items-center justify-between w-full">
              <span className="flex flex-col gap-2 self-end items-start">
                <label htmlFor="type" className="text-h6 font-medium">
                  Availability
                </label>
                <Select
                className="rounded-md min-w-[200px] text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
                  options={AVAILABILITY_OPTIONS}
                  placeholder={"Availability"}
                  value={
                    AVAILABILITY_OPTIONS.find(
                      (level) => level.value === filters.availability
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    const newFilters = {
                      ...filters,
                      availability: selectedOption?.value || "",
                    };
                    fetchApplications(newFilters);
                    setFilters({ ...newFilters });
                  }}
                  isSearchable
                  menuPlacement="bottom"
                />
              </span>
              <span className="flex flex-col gap-2 self-end items-start">
                <label htmlFor="type" className="text-h6 font-medium">
                  Status
                </label>
                <Select
                  className="rounded-md min-w-[200px] text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
                  options={APPLICATIONS_STATUS_OPTIONS}
                  placeholder={"Status"}
                  value={
                    APPLICATIONS_STATUS_OPTIONS.find(
                      (level) => level.value === filters.status
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    const newFilters = {
                      ...filters,
                      status: selectedOption?.value || "",
                    };
                    fetchApplications(newFilters);
                    setFilters({ ...newFilters });
                  }}
                  isSearchable
                  menuPlacement="bottom"
                />
              </span>
              <button onClick={() => {
            fetchApplications();
            setFilters({
              availability: "",
              status: "",
              page: 1
            })
            }}>
            <FaSync className="hover:text-primary text-xl" />
          </button>
            </span>
          </div>
          {loading ? (
        <Loading styles="w-[400px" />
      ) : applicationsData ? (
      <div className="w-full">
          <div className="w-full overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-[700px] w-full border border-borderColor rounded-lg">
              <thead>
                <tr className="bg-primary text-left text-white">
                  <th className="p-3 border-b border-borderColor min-w-[140px]">
                    Name
                  </th>

                  <th className="p-3 border-b border-borderColor min-w-[140px]">
                    Date Applied
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[140px]">
                    Status
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[140px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applicationsData?.results && applicationsData.results.map((application) => (
                  <tr
                    key={`${application.id}`}
                    className="border-b border-borderColor hover:opacity-100 opacity-80"
                  >
                    <td className="p-3">{application?.applicant_details.name}</td>
                    <td className="p-3">{formatDate(application.created_at)}</td>

                    <td className="p-3">
                      {application.status}
                    </td>
                    <td className="p-3">
                      <Button
                        styles="bg-gray-800 rounded-md text-white h-10 px-4"
                        name="View"
                        onClick={() => openApplicationModalFunc(application)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex items-center justify-center">
          <PagesSection
            noOfPages={applicationsData.total_pages}
            currentPage={applicationsData.current_page}
            data={applicationsData}
            prevNext={prevNext}
            getItems={fetchApplications}
            searchItems={filters}
          />
          </div>
        </div>

      ) : (
        <h3 className="text-h3">No applications found</h3>
      )}
          
        </>
      ) : (
        <h3 className="text-h3">Job not found</h3>
      )}
    </div>
  );
};

export default SingleJobPostedSection;
