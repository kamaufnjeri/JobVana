import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CompanyProps, LoginProps, UserProps } from "@/interfaces";
import { SAMPLE_USER_APPLICANT, SAMPLE_USER_EMPLOYER } from "@/constants";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { clearCookiesAndRedirect, setCookies } from "@/utils/authUtils";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
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

  const isAuthenticated = () => {
    return user !== null;
  };

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

  useEffect(() => {
    if (!user || isAuthenticated()) {
      fetchUser();
    }
  }, []);

  const logout = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      try {
        const response = await api.post("auth/logout/", {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          router.push("/");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          setUser(null);
          toast.success("Logout successful!");
        } else {
          throw new Error("Logout failed");
        }
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      }
    }
  };

  const login = async (
    loginData: LoginProps,
    setLoginData: React.Dispatch<React.SetStateAction<LoginProps>>,
    toDashboard: boolean
  ) => {
    try {
      const response = await api.post("/auth/login/", loginData);

      if (response.status === 200) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        const { access, refresh, user: loggedinUser } = response.data;

        const dashboardUrl = loggedinUser.role;

        if (toDashboard) {
          router.push(`/dashboard/${dashboardUrl}`);
        }

        setUser(loggedinUser);
        if (loggedinUser.role === "employer" && loggedinUser.company) {
          setCompany(loggedinUser.company);
        }

        setCookies(refresh, access);
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
