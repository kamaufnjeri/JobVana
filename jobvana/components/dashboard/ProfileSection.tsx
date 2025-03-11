import { useAuth } from "@/context/AuthContext";
import React from "react";
import UserProfile from "./UserProfile";
import CompanyProfile from "./CompanyProfile";

// profile component for company and user
const ProfileSection: React.FC = () => {
  const { company, user } = useAuth();
  return (
    <div className="w-full">
      {user && <UserProfile />}
      {company && <CompanyProfile />}
    </div>
  );
};

export default ProfileSection;
