import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("applicant" | "employer")[]; // Optional to allow all users
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated() || !user) {
      fetchUser();
    } else {
      const userRole = user.role.toLowerCase() as "applicant" | "employer";

      // ✅ Allow access if no roles are specified (public protected routes)
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        router.push(
          userRole === "applicant"
            ? "/dashboard/applicant"
            : "/dashboard/employer"
        );
      }
    }
  }, [isAuthenticated, user, router]);

  return isAuthenticated() &&
    user &&
    (!allowedRoles ||
      allowedRoles.includes(
        user.role.toLowerCase() as "applicant" | "employer"
      ))
    ? children
    : null;
};

export default ProtectedRoute;
