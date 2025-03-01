import React from "react";
import Button from "../common/Button";
import Select from "react-select";
import { AVAILABILITY_OPTIONS } from "@/constants";
import PDFInputField from "../common/PDFInputField";

const ApplyJobForm: React.FC = () => {
  return (
    <form className=" flex flex-col w-full gap-2 p-4">
      <h2 className="text-h2">Apply for Your Next Opportunity</h2>
      <h5 className="text-h5">
        Apply now and take the next step in your career. Fill out the form below
        to get started!
      </h5>
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
          placeholder={"Select when can you start"}
          isSearchable
        />
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
          placeholder="Start typing cover letter"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 min-h-[100px]"
        ></textarea>
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
          placeholder="Enter linkedin profile url"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>

      <span className="flex flex-col gap-2 items-start">
        <label
          htmlFor="resume"
          className="text-h6 font-medium flex flex-row gap-2"
        >
          <h6>Resume/CV (pdf, doc)</h6>
          <h6 className="text-red-500">*</h6>
        </label>

        <PDFInputField />
      </span>
      <div className="self-center lg:w-1/2 w-full md:w-2/3">
      
        
      <Button
        type="submit"
        name="Apply"
        styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
      />
       </div> 
    </form>
  );
};

export default ApplyJobForm;
