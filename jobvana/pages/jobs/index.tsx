import JobsFiltersSection from '@/components/jobs/JobsFiltersSection'
import JobsSection from '@/components/jobs/JobsSection'
import { SAMPLE_JOBS } from '@/constants'
import React from 'react'

const Jobs: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      <div className='w-full md:w-1/3 lg:w-1/4'>
        <JobsFiltersSection/>
      </div>
      <div className='w-full md:w-2/3 lg:w-3/4'>
        <JobsSection jobs={SAMPLE_JOBS} styles='grid-cols-1 lg:grid-cols-2'/>
      </div>
    </div>
  )
}

export default Jobs
