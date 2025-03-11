import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import PostJobForm from "@/components/forms/PostJobForm";
import React from "react";

const PostAJob: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
        <Sidebar />
        <div className="col-span-3 flex flex-col gap-3">
          <PostJobForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostAJob;
