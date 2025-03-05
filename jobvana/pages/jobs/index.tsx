import PrevNextSection from '@/components/common/PrevNextSection'
import JobsFiltersSection from '@/components/jobs/JobsFiltersSection'
import JobsSection from '@/components/jobs/JobsSection'
import { SAMPLE_JOBS } from '@/constants'
import { useJob } from '@/context/JobsContext'
import api from '@/utils/api'
import { handleApiError } from '@/utils/errorHandlerUtils'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Jobs: React.FC = () => {
  const { jobsData, setJobsData} = useJob();
  const [loading, setLoading] = useState<boolean>(false);

  const nextPrevFunc = async (url: string | null) => {
    setLoading(true);
    if (url) {
      try {
        const response = await api.get(url);
        if (response.status === 200) {
          setJobsData(response.data.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(jobsData)
  
  const hasPrev = () => jobsData.previous !== null;
  const hasNext = () => jobsData.next !== null;
  
  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      <div className='w-full md:w-1/3 lg:w-1/4'>
        <JobsFiltersSection/>
      </div>
      <div className='w-full md:w-2/3 lg:w-3/4 flex flex-col gap-2 items-center '>
        <PrevNextSection 
          hasNext={hasNext()} 
          hasPrev={hasPrev()} 
          next={() => nextPrevFunc(jobsData.next)} 
          prev={() => nextPrevFunc(jobsData.previous)} 
        />
        <JobsSection jobs={jobsData.results} styles='grid-cols-1 lg:grid-cols-2'/>
      </div>
    </div>
  );
}

export default Jobs