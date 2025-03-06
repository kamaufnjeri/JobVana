import Select from "react-select";
import {
  APPLICATIONS_RECEIVED,
  APPLICATIONS_STATUS_OPTIONS,
  SAMPLE_JOB,
} from "@/constants";
import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import {
  ApplicationReceivedProps,
  JobApplicationProps,
  JobDetailsProps,
  JobProps,
} from "@/interfaces";
import { capitalizeWords } from "@/utils";
import SingleApplicationReceivedModal from "./SingleApplicationReceivedModal";
import SingleJobPostedModal from "./SingleJobPostedModal";
import { useRouter } from "next/router";
import Loading from "@/components/common/Loading";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";

const defaultApplication: ApplicationReceivedProps = {
  first_name: "",
  last_name: "",
  status: "",
  availability: "",
  linkedin_url: "",
  cover_letter: "",
  date_applied: "",
  resume: "",
};

const SingleJobPostedSection: React.FC = () => {
  const [openApplicationModal, setOpenApplicationModal] =
    useState<boolean>(false);
  const [applicationInModal, setApplicationInModal] =
    useState<ApplicationReceivedProps>(defaultApplication);
  const [openJobDetailsModal, setOpenJobDetailsModal] =
    useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [job, setJob] = useState<JobProps | null>(null);
  if (!id) {
    return <Loading styles="min-h-[400px]"/>
  }

  const openApplicationModalFunc = (application: ApplicationReceivedProps) => {
    setOpenApplicationModal(true);
    setApplicationInModal(application);
  };

  const closeApplicationModal = () => {
    setOpenApplicationModal(false);
    setApplicationInModal(defaultApplication);
  };

  const openJobDetailsModalFunc = () => {
    setOpenJobDetailsModal(true);
  };
  const closeJobDetailsModal = () => {
    setOpenJobDetailsModal(false);
  };

  const fetchJob = async () => {
    setLoading(true);
   
    try {
      const response = await api.get(`jobs/${id}`);

      if (response.status === 200) {
        setJob(response.data);
      } else if (response.data.error) {
        throw new Error(response.data.error || "Unknown Error ");
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

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  },[id])

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      
      {loading ? <Loading styles='min-h-[400px]'/> : error ?
     <h3 className="text-h3 text-red-500">{error}</h3>
     : job ?
     <>
      {openApplicationModal && (
        <SingleApplicationReceivedModal
          closeModal={closeApplicationModal}
          application={applicationInModal}
        />
      )}
      {openJobDetailsModal && (
        <SingleJobPostedModal closeModal={closeJobDetailsModal} job={job}/>
      )}
     <div className="w-full flex lg:flex-row flex-col gap-2 justify-between">
        <div className="w-full flex flex-wrap justify-between gap-2">
          <h2 className="text-h2">
            Applications for {SAMPLE_JOB.job_name} job
          </h2>
          <Button
            styles="bg-gray-800 rounded-md text-white h-10 px-4"
            name="Job Details"
            onClick={openJobDetailsModalFunc}
          />
        </div>

        <span className="flex flex-row gap-2 self-end items-center justify-between lg:w-1/3 w-full">
          <label htmlFor="type" className="text-h6 font-medium">
            Filter by
          </label>
          <Select
            className="rounded-md text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            options={APPLICATIONS_STATUS_OPTIONS}
            placeholder={"Status"}
            isSearchable
            menuPlacement="bottom"
          />
        </span>
      </div>

      <div className="w-full overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-[700px] w-full border border-borderColor rounded-lg">
          <thead>
            <tr className="bg-primary text-left text-white">
              <th className="p-3 border-b border-borderColor min-w-[140px]">
                First Name
              </th>
              <th className="p-3 border-b border-borderColor min-w-[140px]">
                Last Name
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
            {APPLICATIONS_RECEIVED.map((application) => (
              <tr
                key={`${application.first_name}-${application.last_name}`}
                className="border-b border-borderColor hover:opacity-100 opacity-80"
              >
                <td className="p-3">{application.first_name}</td>
                <td className="p-3">{application.last_name}</td>
                <td className="p-3">{application.date_applied}</td>

                <td className="p-3">{capitalizeWords(application.status)}</td>
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
      </div></>
      : <h3 className="text-h3">No jobs found</h3>
      }
    </div>
  );
};

export default SingleJobPostedSection;
