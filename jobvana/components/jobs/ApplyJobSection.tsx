import React from "react";
import Button from "../common/Button";

const ApplyJobSection: React.FC = () => {
  return (
    <div className="p-4 border-borderColor border rounded-md shadow flex flex-col gap-4 items-start justify-start">
      <div className="w-full shadow-md rounded-md p-3">
        <Button
          name="Apply"
          styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
        />
      </div>
      <div className="flex flex-col gap-2 items-start justify-start shadow-md rounded-md p-3">
      <span className="w-[60px] h-[6px] rounded-lg bg-primary"></span>

        <h3 className="text-h3">About Us</h3>
        <p className="text-stylish text-p">
          JobVana is a leading platform connecting job seekers with top
          employers. Our mission is to make job searching easy, efficient, and
          accessible for everyone. Whether you're looking for your next
          opportunity or the perfect candidate, JobVana is here to help.
        </p>
      </div>
    </div>
  );
};

export default ApplyJobSection;
