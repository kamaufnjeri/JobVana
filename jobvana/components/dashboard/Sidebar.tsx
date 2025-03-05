import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import { FaBookmark, FaUser } from "react-icons/fa6";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-[60px] flex flex-col gap-5 border-borderColor border-2 p-4 h-full rounded-lg shadow-lg">
      {user && (
        <Link
          prefetch={true}
          href={
            user?.role === "applicant"
              ? "/dashboard/applicant"
              : "/dashboard/employer"
          }
          className="group relative flex justify-center"
        >
          <MdSpaceDashboard className="text-2xl hover:text-primary" />
          <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-primary text-white text-h6 w-[130px] px-2 py-1 rounded-md *:transition-opacity duration-200">
            Dashboard
          </span>
        </Link>
      )}

      {user && user?.role.toLowerCase() === "applicant" && (
        <Link
          prefetch={true}
          href="/dashboard/saved-jobs"
          className="group relative flex justify-center"
        >
          <FaBookmark className="text-2xl hover:text-primary" />
          <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-primary text-white text-h6 w-[130px] px-2 py-1 rounded-md transition-opacity duration-200">
            Saved Jobs
          </span>
        </Link>
      )}

      <Link
        prefetch={true}
        href="/dashboard/profile"
        className="group relative flex justify-center"
      >
        <FaUser className="text-2xl hover:text-primary" />

        <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-primary text-white text-h6 w-[130px] px-2 py-1 rounded-md transition-opacity duration-200">
          Profile
        </span>
      </Link>
      <span className="group relative flex justify-center" onClick={logout}>
        <MdLogout className="text-2xl hover:text-primary" />

        <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-primary text-white text-h6 w-[130px] px-2 py-1 rounded-md transition-opacity duration-200">
          Logout
        </span>
      </span>
    </div>
  );
};

export default Sidebar;
