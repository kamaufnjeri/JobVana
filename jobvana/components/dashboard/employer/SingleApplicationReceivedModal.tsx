import Button from "@/components/common/Button";
import { APPLICATIONS_STATUS_OPTIONS, AVAILABILITY_OPTIONS } from "@/constants";
import { ApplicationReceivedProps } from "@/interfaces";
import { capitalizeWords, getLabelByValue } from "@/utils";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Select from "react-select";

interface ApplicationReceivedModalProps {
  application: ApplicationReceivedProps;
  closeModal: () => void;
}

const SingleApplicationReceivedModal: React.FC<
  ApplicationReceivedModalProps
> = ({ application, closeModal }) => {
  const [isStatusDisabled, setIsStatusDisabled] = useState<boolean>(true);

  const enableEditing = () => {
    setIsStatusDisabled(false);
  };

  const cancelEditing = () => {
    setIsStatusDisabled(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-4 lg:w-2/3 md:w-2/3 w-full flex flex-col gap-2 relative h-auto max-h-[95vh] overflow-y-auto">
        <FaTimes
          className="cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute"
          onClick={closeModal}
        />

        <div className="flex flex-col w-full gap-4 p-4">
          <div className="flex flex-col justify-between items-center pr-5">
            <h2 className="text-h2 gap-2 font-bold">
              Applicant's name - {application.first_name}{" "}
              {application.last_name}
            </h2>

           
              <h6 className="text-h6">Date Applied - {application.date_applied}</h6>
              
           
          </div>

          <span className="flex flex-col gap-2 items-start">
            <h6 className="text-h6 font-bold flex flex-row gap-2">Status</h6>

            <Select
              className="rounded-md text-gray-800 outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
              options={APPLICATIONS_STATUS_OPTIONS}
              value={APPLICATIONS_STATUS_OPTIONS.find(
                (option) => option.value === application.status
              )}
              placeholder="Select when can you start"
              isSearchable
              isDisabled={isStatusDisabled}
            />

            <div className="self-end flex flex-row gap-2 items-end">
              {isStatusDisabled === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing()}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Change"
                  onClick={() => enableEditing()}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>

          <span className="flex flex-col gap-2 items-start">
            <h6 className="text-h6 font-bold flex flex-row gap-2">
              When applicant can start working
            </h6>
            <p className="text-p">
              {getLabelByValue(application.availability, AVAILABILITY_OPTIONS)}
            </p>
          </span>

          <span className="flex flex-col gap-2 items-start">
            <h6 className="text-h6 font-bold flex flex-row gap-2">
              Cover Letter
            </h6>
            <p className="text-p">{application.cover_letter}</p>
          </span>

          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="linkedin_url" className="text-h6 font-bold">
              LinkedIn Profile
            </label>
            <Link
              href="jobs/1"
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                name="View Profile"
                styles="bg-background rounded-md text-h6 border-text border-2 h-10 p-1 w-full group-hover:bg-text group-hover:text-background"
              >
                <FaArrowRight />
              </Button>
            </Link>
          </span>

          <span className="flex flex-col gap-2 items-start">
            <h6 className="text-h6 font-bold flex flex-row gap-2">
              Resume/CV (pdf, doc)
            </h6>
            <div className="w-full h-[600px] border border-borderColor p-2 rounded-md">
              <iframe
                src={application.resume}
                width="100%"
                className="rounded-md h-full"
                title="Resume"
              ></iframe>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleApplicationReceivedModal;
