import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import JobApplicationsSection from "@/components/dashboard/applicant/JobApplicationsSection";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["applicant"]}>
      <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
        <Sidebar />
        <div className="col-span-3">
          <JobApplicationsSection />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
