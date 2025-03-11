import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import SingleJobPostedDetails from "@/components/dashboard/employer/SingleJobPostedDetails";
import { JobProps } from "@/interfaces";
import api from "@/utils/api";
import { GetServerSideProps } from "next";
import React from "react";



interface Props {
  job: JobProps | null;
  error?: string;
}

const JobDetailsPage: React.FC<Props> = ({ job, error}) => {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
        <Sidebar />
        <div className="col-span-3 flex flex-col gap-3">
          <SingleJobPostedDetails job={job} error={error}/>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const response = await api.get(`jobs/${id}`);
    if (response.status === 200) {
      return { props: { job: response.data } };
    } else {
      return { props: { job: null, error: "Failed to fetch job data" } };
    }
  } catch (error) {
    return { props: { job: null, error: "Error fetching job" } };
  }
};

export default JobDetailsPage;
