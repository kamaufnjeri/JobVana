import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CompanyProps, LoginProps, UserProps } from "@/interfaces";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setCookies } from "@/utils/authUtils";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { useNotifications } from "./NotificationProvider";
import { routeToNextPage } from "@/utils/navigateUtils";

// interface for the context

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  company: CompanyProps | null;
  setCompany: React.Dispatch<React.SetStateAction<CompanyProps | null>>;
  loading: boolean;
  login: (
    loginData: LoginProps,
    setLoginData: React.Dispatch<React.SetStateAction<LoginProps>>,
    toDashboard: boolean
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// default user if a user is not logged in or logouts

// creating auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// auth context provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { fetchNotifications, setNotificationsData } = useNotifications();

  const isAuthenticated = () => {
    return user !== null;
  };

  // fecth user fuction
  const fetchUser = async () => {
    setLoading(true);

    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      if (accessToken) {
        // if access token get user data
        try {
          const response = await api.get("auth/me/");

          if (response.status === 200) {
            const userMe = response.data;
            fetchNotifications();
            setUser(userMe); // If it's already a string, set it directly
            if (userMe.role === "employer" && userMe?.company) {
              setCompany(userMe.company);
            }
          } else {
            throw new Error();
          }
        } catch (error) {
          console.error("Error fetching user");
          toast.error(handleApiError(error));
          // if path is protected redirect to home page
          if (router.pathname.startsWith("/dashboard")) {
            routeToNextPage(router, { pageRoute: "/" });
          }
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        } finally {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  };

  // fetch user if user is null or is not authenticated
  useEffect(() => {
    if (!user || !isAuthenticated()) {
      fetchUser();
    }
  }, []);

  // function to log out user
  const logout = async () => {
    // get refresh token from cookies
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      try {
        const response = await api.post("auth/logout/", {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          // on success and user is in protected rout redirect to homepage
          if (router.pathname.startsWith("/dashboard")) {
            routeToNextPage(router, { pageRoute: "/" });
          }
          // clear cookies
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          setNotificationsData(null);
          setUser(null);
          toast.success("Logout successful!");
        } else {
          throw new Error("Logout failed");
        }
      } catch (error) {
        // incase of error
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
        // on error and user is in protected route redirect to homepage
        if (router.pathname.startsWith("/dashboard")) {
          routeToNextPage(router, { pageRoute: "/" });
        }
        // clear cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    }
  };

  // fuction to login user
  const login = async (
    loginData: LoginProps,
    setLoginData: React.Dispatch<React.SetStateAction<LoginProps>>,
    toDashboard: boolean
  ) => {
    try {
      const response = await api.post("/auth/login/", loginData);

      if (response.status === 200) {
        // on success clear cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        const { access, refresh, user: loggedinUser } = response.data; // fetch tokens and user date

        const dashboardUrl = loggedinUser.role;

        // redirect to dashboard
        if (toDashboard) {
          routeToNextPage(router, { pageRoute: `dashboard/${dashboardUrl}` });
        }
        fetchNotifications(); // fetch notifications
        setLoginData({
          email: "",
          password: "",
        }); // reset for data

        setUser(loggedinUser); // set user data
        if (loggedinUser.role === "employer" && loggedinUser.company) {
          setCompany(loggedinUser.company); // set company data
        }

        setCookies(refresh, access); // set cookies
        toast.success("Login Successful!");
      } else if (response.data.error) {
        toast.error(response.data.error || "Login failed");
      } else {
        throw new Error("Login failed");
      }
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      setLoginData((prev) => ({ ...prev, password: "" }));
    }
  };

  const value = {
    user,
    setUser,
    company,
    setCompany,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
