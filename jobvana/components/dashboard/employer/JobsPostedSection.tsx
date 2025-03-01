import Button from "@/components/common/Button";
import { SAMPLE_JOBS, SORT_BY_OPTIONS } from "@/constants";
import Link from "next/link";
import React from "react";
import Select from "react-select";

const JobsPostedSection: React.FC = () => {
  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      <div className="w-full flex lg:flex-row flex-col gap-2 justify-between">
        <div className="lg:w-2/3 w-full flex flex-col gap-2">
          <h2 className="text-h2">Jobs Posted</h2>
        </div>

        <span className="flex flex-row gap-2 self-end items-center justify-between lg:w-1/3 w-full">
          <label htmlFor="type" className="text-h6 font-medium">
            Filter by
          </label>
          <Select
            className="rounded-md text-gray-800 outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            options={SORT_BY_OPTIONS}
            placeholder={"Sort by"}
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
              <th className="p-3 border-b border-borderColor min-w-[200px]">
                Job Title
              </th>
              <th className="p-3 border-b border-borderColor min-w-[180px]">
                Date Applied
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
            {SAMPLE_JOBS.map((job) => (
              <tr
                key={job.job_name}
                className="border-b border-borderColor hover:opacity-100 opacity-80"
              >
                <td className="p-3">{job.job_name}</td>
                <td className="p-3">{job.date_posted}</td>
                <td className="p-3">{job.date_posted}</td>
                <td className="p-3">
                  <Link href='/dashboard/jobs/1'>
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
    </div>
  );
};

export default JobsPostedSection;
