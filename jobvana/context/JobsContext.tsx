import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios from "axios";
  
  interface Job {
    label: string;
    value: string;
    type: string;
  }
  
  interface JobContextType {
    jobs: Job[];
    searchJobs: (query: string) => void;
    error: string | null;
    loading: boolean;
  }
  
  const JobContext = createContext<JobContextType | undefined>(
    undefined
  );
  
  export const JobProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchJobs = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/files/jobs.json");
          const data = response.data;
          setAllJobs(data);
          setFilteredJobs(data.slice(0, 50));
        } catch (error) {
          setError("Failed to load jobs");
        } finally {
          setLoading(false);
        }
      };
  
      fetchJobs();
    }, []);
  
    const searchJobs = (query: string) => {
      if (!query) {
        setFilteredJobs(allJobs.slice(0, 50));
        return;
      }
      const results = allJobs.filter((loc) =>
        loc.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(results.slice(0, 50));
    };
  
    return (
      <JobContext.Provider
        value={{ jobs: filteredJobs, searchJobs, error, loading }}
      >
        {children}
      </JobContext.Provider>
    );
  };
  
  export const useJob = () => {
    const context = useContext(JobContext);
    if (!context) {
      throw new Error("useJob must be used within a JobProvider");
    }
    return context;
  };
  