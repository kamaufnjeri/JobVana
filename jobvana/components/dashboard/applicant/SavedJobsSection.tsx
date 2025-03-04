import JobsSection from '@/components/jobs/JobsSection'
import { SAMPLE_JOBS } from '@/constants'
import React from 'react'
import SavedJobCard from './SavedJobCard'

const jobs = SAMPLE_JOBS.slice(0, 6);

const SavedJobsSection: React.FC = () => {
  console.log(jobs)

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
             <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">Saved Jobs</h2>
          <h5 className="text-h5">
          Keep all your favorite job opportunities in one place. Revisit, apply, and take the next step in your career with JobVana! 
          </h5>
        </div>
        <section
        className={"w-full grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"}
    >
      {jobs.length > 0 ? (
        jobs.map((job, index) => <SavedJobCard job={job} key={index} />)
      ) : (
        <h3 className="text-h3">No jobs found</h3>
      )}
    </section>

        </div>
    </div>
  )
}

export default SavedJobsSection
