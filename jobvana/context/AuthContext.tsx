import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LoginProps, UserProps } from "@/interfaces";
import { SAMPLE_USER_APPLICANT, SAMPLE_USER_EMPLOYER } from "@/constants";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setCookies } from "@/utils/authUtils";
import api from "@/utils/api";
import axios from "axios";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Loading from "@/components/common/Loading"
// interface for the context

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  loading: boolean;
  login: (
    loginData: LoginProps,
    setLoginData: React.Dispatch<React.SetStateAction<LoginProps>>
  ) => Promise<void>;
  fetchUser: () => void;
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
            const response = await api.get("users/me/");

            if (response.status === 200) {
              const user = response.data.data;

              setUser((prev) => ({
                ...prev,
                ...user, // Spread all response data
                role: user?.role?.name, // Ensure role is set explicitly
              }));
            } else {
              throw new Error();
            }
          } catch (error) {
            console.error("Error fetching user");
            toast.error(handleApiError(error));
            logout();
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
    },[])
  
  const logout = async () => {
    router.push("/");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    toast.success("Logout successful!");
  };
  const login = async (
    loginData: LoginProps,
    setLoginData: React.Dispatch<React.SetStateAction<LoginProps>>
  ) => {
    try {
      const response = await api.post("/auth/login/", loginData);

      if (response.status === 200) {

        const { access, refresh, user: loggedinUser } = response.data.data;
        console.log(loggedinUser)
        router.push(`/dashboard/${loggedinUser.role.toLowerCase()}`);

        setUser(loggedinUser);
        setCookies(refresh, access);
        toast.success("Login Successful!");

      } else {
        throw new Error("Login Failed");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error?.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      }
      // Clear the password field
      setLoginData((prev) => ({ ...prev, password: "" }));
    }
  };

  

  const value = {
    user,
    setUser,
    loading,
    login,
    fetchUser,
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
