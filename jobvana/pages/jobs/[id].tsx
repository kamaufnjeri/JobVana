import LoginForm from "@/components/forms/LoginForm";
import ApplyJobModal from "@/components/jobs/ApplyJobModal";
import ApplyJobSection from "@/components/jobs/ApplyJobSection";
import JobDetailSection from "@/components/jobs/JobDetailSection";
import { SAMPLE_JOB } from "@/constants";
import React, { useState } from "react";

const Job = () => {
    const [loggedin, setLoggedin] = useState<boolean>(true);
    const [openApplyModal, setOpenApplyJobModal] = useState<boolean>(false);
 

  return (
    <div className="flex flex-col lg:flex-row  gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      {openApplyModal && <ApplyJobModal closeModal={() => setOpenApplyJobModal(false)} job={SAMPLE_JOB}/>}
      <div className="w-full lg:w-2/3">
       <JobDetailSection job={SAMPLE_JOB}/>
      </div>
      <div className="w-full lg:w-1/3">
        {loggedin ? 
        <ApplyJobSection openModal={() => setOpenApplyJobModal(true)} jobId="1"/>
        :
                <LoginForm description={`Login to apply for ${SAMPLE_JOB.job_name}`}/>

    }
      </div>
    </div>
  );
};

export default Job;
