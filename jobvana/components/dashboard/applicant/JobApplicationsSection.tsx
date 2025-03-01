import Select from "react-select";
import { APPLICATIONS_STATUS_OPTIONS, SAMPLE_JOB_APPLICATIONS } from "@/constants";
import React, { useState } from "react";
import Button from "@/components/common/Button";
import { JobApplicationProps } from "@/interfaces";
import SingleJobApplicationModal from "./SingleJobApplicationModal";
import { capitalizeWords } from "@/utils";


const defaultApplication: JobApplicationProps = {
  job_name: "",
  status: "Pending",
  availability: "Full-time",
  linkedin_url: "",
  cover_letter: "",
  date_applied: "",
  resume: ""
}; 

const JobApplicationsSection: React.FC = () => {
  const [openApplicationModal, setOpenApplicationModal] = useState<boolean>(false);
  const [applicationInModal, setApplicationInModal] = useState<JobApplicationProps>(defaultApplication);


  const openModal = (application: JobApplicationProps) => {
    setOpenApplicationModal(true);
    setApplicationInModal(application);
  }

  const closeModal = () => {
    setOpenApplicationModal(false);
    setApplicationInModal(defaultApplication);
  }


  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      {openApplicationModal && applicationInModal && (<SingleJobApplicationModal application={applicationInModal } closeModal={closeModal}/>)}
      <div className="w-full flex lg:flex-row flex-col gap-2 justify-between">
        <div className="lg:w-2/3 w-full flex flex-col gap-2">
          <h2 className="text-h2">Applied Jobs</h2>
          <h5 className="text-h5">
            Keep track of all the jobs you’ve applied for in one place. Stay updated
            on your application status and take the next step in your career journey.
          </h5>
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

      {/* 🚀 SCROLLABLE TABLE CONTAINER */}
      <div className="w-full overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-[700px] w-full border border-borderColor rounded-lg">
          <thead>
            <tr className="bg-primary text-left text-white">
              <th className="p-3 border-b border-borderColor min-w-[200px]">Job Title</th>
              <th className="p-3 border-b border-borderColor min-w-[180px]">Date Applied</th>
              <th className="p-3 border-b border-borderColor min-w-[160px]">Status</th>
              <th className="p-3 border-b border-borderColor min-w-[140px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_JOB_APPLICATIONS.map((application) => (
              <tr key={application.job_name} className="border-b border-borderColor hover:opacity-100 opacity-80">
                <td className="p-3">{application.job_name}</td>
                <td className="p-3">{application.date_applied}</td>
                <td className="p-3">{capitalizeWords(application.status)}</td>
                <td className="p-3">
                  <Button styles="bg-gray-800 rounded-md text-white h-10 px-4" name="View" onClick={() => openModal(application)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplicationsSection;
