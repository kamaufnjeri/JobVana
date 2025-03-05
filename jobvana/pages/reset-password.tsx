import ResetPasswordSection from "@/components/forms/ResetPasswordSection";
import React from "react";

const ResetPassword: React.FC = () => {
  return (
    <div className="flex gap-2 lg:px-10 md:px-5 px-2 py-2 min-w-screen min-h-[calc(100vh-150px)] items-center justify-center">
      <ResetPasswordSection />
    </div>
  );
};

export default ResetPassword;
