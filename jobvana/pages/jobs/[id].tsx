import Loading from "@/components/common/Loading";
import LoginForm from "@/components/forms/LoginForm";
import ApplyJobModal from "@/components/jobs/ApplyJobModal";
import ApplyJobSection from "@/components/jobs/ApplyJobSection";
import JobDetailSection from "@/components/jobs/JobDetailSection";
import { SAMPLE_JOB } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { JobProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface JobPropsPage {
  job: JobProps | null;
}

const Job = ({ job }: JobPropsPage) => {
  const { isAuthenticated, user } = useAuth();
  const [openApplyModal, setOpenApplyJobModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      {job ? (
        <>
          {openApplyModal && (
            <ApplyJobModal
              closeModal={() => setOpenApplyJobModal(false)}
              job={job}
            />
          )}
          <div className="w-full lg:w-2/3 flex flex-col">
            <JobDetailSection job={job} />
          </div>
          <div className="w-full lg:w-1/3">
            {(user || isAuthenticated()) &&
            user?.role.toLowerCase() === "applicant" ? (
              <ApplyJobSection
                openModal={() => setOpenApplyJobModal(true)}
                job={job}
              />
            ) : (
              <LoginForm
                description={`Login to apply for ${job.title}`}
                toDashboard={false}
              />
            )}
          </div>
        </>
      ) : (
        <h3 className="text-h3 place-self-center col-span-1 md:col-span-2 lg:col-span-3">
          Job not found
        </h3>
      )}
    </div>
  );
};

export default Job;

// Move the fetchJob logic to getServerSideProps
export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const response = await api.get(`jobs/${id}/`);
    if (response.status === 200) {
      const job = response.data;

      return {
        props: {
          job, // Pass the fetched job as a prop
        },
      };
    }
  } catch (error) {
    const errorMessage = handleApiError(error);
    console.log("Error fetching job: ", errorMessage);

    return {
      props: {
        job: null, // Handle the case where job data is not found
      },
    };
  }
}
