import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProps } from "@/interfaces";
import { SAMPLE_USER_APPLICANT, SAMPLE_USER_EMPLOYER } from "@/constants";

interface AuthContextType {
  user: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
  error: string | null;
  loading: boolean;
}

const defaultUser: UserProps = {
  first_name: '',
  last_name: '',
  role: 'guest',
  email: ''
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProps>(defaultUser);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        setUser(SAMPLE_USER_EMPLOYER);
      } catch (error) {
        setError("Failed to load auths");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, error, loading }}>
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
