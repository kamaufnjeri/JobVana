import Button from "@/components/common/Button";
import PDFInputField from "@/components/common/PDFInputField";
import Select from "react-select";
import { AVAILABILITY_OPTIONS } from "@/constants";
import { JobApplicationProps } from "@/interfaces";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { capitalizeWords } from "@/utils";
import FileViewer from "@/components/common/FileViewer";

interface ApplicationModalProps {
  application: JobApplicationProps;
  closeModal: () => void;
}

const SingleJobApplicationModal: React.FC<ApplicationModalProps> = ({
  application,
  closeModal,
}) => {
  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    availability: true,
    resume: true,
    cover_letter: true,
    linkedin_url: true,
  });

  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
  };

  const handleResumeChange = (resumeUrl: string) => {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-4 lg:w-2/3 md:w-2/3 w-full flex flex-col gap-2 relative h-auto max-h-[95vh] overflow-y-auto">
        <FaTimes
          className="cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute"
          onClick={closeModal}
        />

        <div className=" flex flex-col w-full gap-4 p-4">
          <div className="flex lg:flex-row flex-col justify-between items-start pr-5">
            <h2 className="text-h2">
              Application for - {application.job_name}
            </h2>
            <Link
              href="jobs/1"
              className="self-end"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                name="View Job"
                styles="bg-background rounded-md text-h6 border-text border-2 h-10 p-1 w-[150px]  group-hover:bg-text group-hover:text-background"
                children={<FaArrowRight />}
              />
            </Link>
          </div>
          <div className="flex gap-2 flex-wrap justify-between">
            <span className="flex flex-col gap-2 items-start">
              <label
                htmlFor="status"
                className="text-h6 font-medium flex flex-row gap-2"
              >
                <h6>Application Status:</h6>
              </label>
              <p>{capitalizeWords(application.status)}</p>
            </span>
            <span className="flex flex-col gap-2 items-start">
              <label
                htmlFor="available"
                className="text-h6 font-medium flex flex-row gap-2"
              >
                <h6>Application Date:</h6>
              </label>
              <p className="text-p">{application.date_applied}</p>
            </span>
            <Button
              name="Delete"
              styles="bg-red-500 rounded-md text-h6 border-text text-white h-10 p-1 w-[150px]  hover:bg-red-600"
            />
          </div>

          <span className="flex flex-col gap-2 items-start">
            <label
              htmlFor="available"
              className="text-h6 font-medium flex flex-row gap-2"
            >
              <h6>When can you start?</h6>
              <h6 className="text-red-500">*</h6>
            </label>
            <Select
              className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
              options={AVAILABILITY_OPTIONS}
              value={AVAILABILITY_OPTIONS.find(
                (option) => option.value === application.availability
              )}
              placeholder={"Select when can you start"}
              isSearchable
              isDisabled={isDisabled.availability}
            />

            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.availability === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("availability")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("availability")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>

          <span className="flex flex-col gap-2 items-start">
            <label
              htmlFor="cover_letter"
              className="text-h6 font-medium flex flex-row gap-2"
            >
              <h6>Cover Letter</h6>
              <h6 className="text-red-500">*</h6>
            </label>
            <textarea
              name="cover_letter"
              id="cover_letter"
              required
              disabled={isDisabled.cover_letter}
              value={application.cover_letter}
              placeholder="Start typing cover letter"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 min-h-[100px] bg-white"
            ></textarea>
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.cover_letter === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("cover_letter")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("cover_letter")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="linkedin_url" className="text-h6 font-medium">
              LinkedIn Profile URL
            </label>
            <input
              type="text"
              name="linkedin_url"
              id="linkedin_url"
              required
              disabled={isDisabled.linkedin_url}
              value={application.linkedin_url}
              placeholder="Enter linkedin profile url"
              className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.linkedin_url === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("linkedin_url")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("linkedin_url")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>

          <span className="flex flex-col gap-2 items-start">
            <label
              htmlFor="resume"
              className="text-h6 font-medium flex flex-row gap-2"
            >
              <h6>Resume/CV (pdf, doc)</h6>
              <h6 className="text-red-500">*</h6>
            </label>
            {isDisabled.resume ? (
              <FileViewer fileUrl={application.resume} />
            ) : (
              <PDFInputField
                resume={application.resume}
                handleResumeChange={handleResumeChange}
              />
            )}

            <div className="self-end flex flex-row gap-2 items-end">
              {isDisabled.resume === false ? (
                <>
                  <Button
                    name="Save"
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing("resume")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <Button
                  name="Edit"
                  onClick={() => enableEditing("resume")}
                  styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                />
              )}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleJobApplicationModal;
