import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LoginProps, UserProps } from "@/interfaces";
import { SAMPLE_USER_APPLICANT, SAMPLE_USER_EMPLOYER } from "@/constants";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import api from "@/utils/api";
import { toast } from "react-toastify";
import { setCookies } from "@/utils/authUtils";
import { handleApiError } from "@/utils/errorHandlerUtils";

// interface for the context

interface AuthContextType {
  user: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
  loading: boolean;
  login: (loginData: LoginProps, setLoginData: React.Dispatch<React.SetStateAction<LoginProps>>) => Promise<void>; // <-- Accepts userData
  logout: () => void;
  isAuthenticated: () => boolean;
}


// default user if a user is not logged in or logouts
const defaultUser: UserProps = {
  first_name: '',
  last_name: '',
  role: 'guest',
  email: '',
  id: ''
};

// creating auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// auth context provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProps>(defaultUser);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      
        const accessToken = Cookies.get('accessToken');

        if (accessToken) {
          if (accessToken) {
            // if access token get user data
            try {
           const response = await api.get('users/me/');

           if (response.status === 200) {
            setUser((prev) => ({
              ...prev,
              ...response.data, // Spread all response data
              role: response.data.role.name, // Ensure role is set explicitly
            }));           }  else {
            throw new Error();
          }

        }  catch (error) {
          console.error("Error fetching user");
          handleApiError(error)
          logout(); 
        } finally {
          setLoading(false);
          }
      } 
    };
  }
        
    fetchUser();
  }, []);

  const logout = async () => {
   
    
      Cookies.remove("access");
      Cookies.remove("refresh");
      Cookies.remove("user");
      setUser(defaultUser);
      toast.success("Logout successful!");
      router.push("/");

  };
  const login = async (loginData: LoginProps, setLoginData: React.Dispatch<React.SetStateAction<LoginProps>> ) => {
    try {
      const response = await api.post('auth/login/', loginData);
      if (response.status === 200) {
        const { access, refresh, user} = response.data;
        setUser(user);
        setCookies(refresh, access);
        toast.success('Login Successful!')
        router.push(`/dashboard/${user.role.toLocaleLowerCase()}`);

      }
    } catch (error) {
      console.error("Login failed:", error);
      handleApiError(error)
      setLoginData((prev) => ({...prev, password: ''}))
    }
 
  };

  const isAuthenticated = () => {
    return user !== null;
};

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    isAuthenticated,
    
};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
