import JobsSection from '@/components/jobs/JobsSection'
import { SAMPLE_JOBS } from '@/constants'
import React from 'react'

const SavedJobsSection: React.FC = () => {
  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
             <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">Saved Jobs</h2>
          <h5 className="text-h5">
          Keep all your favorite job opportunities in one place. Revisit, apply, and take the next step in your career with JobVana! 
          </h5>
        </div>
        <JobsSection jobs={SAMPLE_JOBS.slice(0, 5)} styles='lg:grid-cols-2 '/>

        </div>
    </div>
  )
}

export default SavedJobsSection
