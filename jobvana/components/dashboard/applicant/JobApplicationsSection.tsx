import Select from "react-select";
import { APPLICATIONS_STATUS_OPTIONS } from "@/constants";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import {
  ApplicationProps,
  JobFilterProps,
  PaginatedResponse,
} from "@/interfaces";
import SingleJobApplicationModal from "./SingleJobApplicationModal";
import { capitalizeWords, formatDate } from "@/utils";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { FaSync } from "react-icons/fa";
import Loading from "@/components/common/Loading";
import PagesSection from "@/components/common/PagesSection";

const JobApplicationsSection: React.FC = () => {
  const [openApplicationModal, setOpenApplicationModal] =
    useState<boolean>(false); // for closing or opening modal to view single applications details
  const [applicationInModal, setApplicationInModal] =
    useState<ApplicationProps | null>(null); // application to be displayed in modal
  const [applicationsData, setApplicationsData] =
    useState<PaginatedResponse<ApplicationProps> | null>(null); // applications data to be displayed
  const [loading, setLoading] = useState<boolean>(false);
  // filters to be applied when filtering applications
  const [filters, setFilters] = useState<JobFilterProps>({
    job_title: "",
    status: "",
    page: 1,
  });

  // function to open modal and set aplication based on application selected
  const openApplicationModalFunc = (application: ApplicationProps) => {
    setOpenApplicationModal(true);
    setApplicationInModal(application);
  };

  // function to close modal and set application being viewed to null
  const closeApplicationModal = () => {
    setOpenApplicationModal(false);
    setApplicationInModal(null);
  };

  // function to fetch applications from the backend api
  const fetchApplications = useCallback(
    async (filters?: { [key: string]: string | number }) => {
      setLoading(true);
      try {
        const response = await api.get("applications/mine/", {
          params: filters || {}, // Default to empty object if filters is undefined
        });

        if (response.status === 200) {
          // when response status is 200 set applications data with data from backend api
          setApplicationsData(response.data);
        } else {
          toast.error(response.data.error || "Unknown Error");
        }
      } catch (error) {
        // incase of an error
        console.error("Application fetching failed:", error);
        const errorMessage = handleApiError(error); // function to handle errors and returns error as string
        toast.error(errorMessage); // display errors with toastify
      } finally {
        // when fetching is done set loading to falls
        setLoading(false);
      }
    },
    [] // No dependencies, so the function won't be recreated unless necessary
  );

  const prevNext = async (url: string | null) => {
    // fetch next page or previous page applications data
    setLoading(true);
    if (url) {
      try {
        const response = await api.get(url);
        if (response.status === 200) {
          setApplicationsData(response.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error("Error: Error fetching applications");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // on page load fetch applications
    fetchApplications();
  }, [fetchApplications]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle change in input fields on filtering section
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // when Enter key is pressed on input field fetch data based on filters
    if (event.key === "Enter") {
      fetchApplications(filters);
    }
  };

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      {openApplicationModal && applicationInModal && (
        <SingleJobApplicationModal
          application={applicationInModal}
          fetchApplications={fetchApplications}
          closeModal={closeApplicationModal}
        />
      )}
      <div className="w-full flex flex-col gap-2 justify-between">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-h2">Applied Jobs</h2>
          <h5 className="text-h5">
            Keep track of all the jobs you’ve applied for in one place. Stay
            updated on your application status and take the next step in your
            career journey.
          </h5>
        </div>

        <span className="flex lg:flex-row md:flex-row flex-col gap-2 self-end items-center justify-between w-full">
          <span className="flex flex-col gap-2 self-end items-start">
            <label htmlFor="type" className="text-h6 font-medium">
              Job Title
            </label>
            <input
              type="text"
              name="job_title"
              id="job_title"
              required
              value={filters.job_title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a job title and press Enter to search..."
              className="rounded-md min-w-full text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            />
          </span>
          <span className="flex flex-col gap-2 self-end items-start">
            <label htmlFor="type" className="text-h6 font-medium">
              Status
            </label>
            <Select
              className="rounded-md text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
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
                setFilters(newFilters);
              }}
              isSearchable
              menuPlacement="bottom"
            />
          </span>
          <button
            onClick={() => {
              fetchApplications();
              setFilters({
                job_title: "",
                status: "",
                page: 1,
              });
            }}
          >
            <FaSync className="hover:text-primary text-xl" />
          </button>
        </span>
      </div>

      {loading ? (
        <Loading styles="min-h-[400px]" />
      ) : applicationsData ? (
        <div className="w-full">
          <div className="w-full overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-[700px] w-full border border-borderColor rounded-lg">
              <thead>
                <tr className="bg-primary text-left text-white">
                  <th className="p-3 border-b border-borderColor min-w-[200px]">
                    Job Title
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[180px]">
                    Date Applied
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[160px]">
                    Status
                  </th>
                  <th className="p-3 border-b border-borderColor min-w-[140px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applicationsData.results &&
                  applicationsData.results.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-borderColor hover:opacity-100 opacity-80"
                    >
                      <td className="p-3">{application.job_details.title}</td>
                      <td className="p-3">
                        {formatDate(application.created_at)}
                      </td>
                      <td className="p-3">{application.status}</td>
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
    </div>
  );
};

export default JobApplicationsSection;
