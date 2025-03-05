import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import SavedJobsSection from "@/components/dashboard/applicant/SavedJobsSection";
import React from "react";

const SavedJobs: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["applicant"]}>
      <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
        <Sidebar />
        <div className="col-span-3">
          <SavedJobsSection />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SavedJobs;
