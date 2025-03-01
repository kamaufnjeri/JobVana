import Sidebar from '@/components/dashboard/Sidebar'
import SingleJobPostedSection from '@/components/dashboard/employer/SingleJobPostedSection'
import React from 'react'

const SingleJobPosted: React.FC = () => {
    
  return (
    <div className="grid grid-cols-4 gap-2 lg:px-10 md:px-5 px-2 py-2 w-full">
   
        <Sidebar/>
  <div className='col-span-3 flex flex-col gap-3'>
  <SingleJobPostedSection/>
  </div>

  
  </div>
  )
}

export default SingleJobPosted
