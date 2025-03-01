import ProfileSection from "@/components/dashboard/ProfileSection";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
      <Sidebar />
      <div className="col-span-3">
        <ProfileSection />
      </div>
    </div>
  );
};

export default Profile;
