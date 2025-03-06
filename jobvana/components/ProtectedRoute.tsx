import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Loading from "./common/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("applicant" | "employer")[]; // Optional to allow all users
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return; // Prevent logic while loading
    if (!isAuthenticated() || !user) {
      // If not authenticated, redirect to login
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.push("/login");
      }
    } else {
      const userRole = user.role as "applicant" | "employer";
      // ✅ Allow access if no roles are specified (public protected routes)
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        if (!isRedirecting) {
          setIsRedirecting(true);
          router.push(
            userRole === "applicant" ? "/dashboard/applicant" : "/dashboard/employer"
          );
        }
      }
    }
  }, [loading, isAuthenticated, user, allowedRoles, router, isRedirecting]);

  // Render loading spinner while checking auth status
  if (loading || isRedirecting) return <Loading styles="h-[400px" />;

  return (
    isAuthenticated() &&
    user &&
    (!allowedRoles || allowedRoles.includes(user.role.toLowerCase() as "applicant" | "employer"))
  ) ? (
    children
  ) : null;
};

export default ProtectedRoute;
