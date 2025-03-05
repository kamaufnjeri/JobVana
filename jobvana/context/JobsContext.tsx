import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import axios from "axios";
import { JobResponseProps } from "@/interfaces";
  
  interface Job {
    label: string;
    value: string;
    type: string;
  }
  
  interface JobContextType {
    jobsData: JobResponseProps;
    setJobsData: React.Dispatch<React.SetStateAction<JobResponseProps>>
    fetchJobs: () => void;
    error: string | null;
    loading: boolean;
  }

  const defaultJobsData: JobResponseProps = {
    count: 0,
    results: [],
    previous: null,
    next: null,
  }
  
  const JobContext = createContext<JobContextType | undefined>(
    undefined
  );
  
  export const JobProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [jobsData, setJobsData] = useState<JobResponseProps>(defaultJobsData);
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
   
  
    const fetchJobs = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/api/jobs");
          if (response.status === 200) {
            setJobsData(response.data.jobs)
          }
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
      
  
      fetchJobs();
    }, []);
  
   
    return (
      <JobContext.Provider
        value={{ jobsData, setJobsData, fetchJobs, error, loading }}
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
  