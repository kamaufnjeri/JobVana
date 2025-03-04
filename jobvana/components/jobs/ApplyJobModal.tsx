import { JobDetailsProps } from '@/interfaces'
import React from 'react'
import ApplyJobForm from '../forms/ApplyJobForm';
import { FaTimes } from 'react-icons/fa';

interface ApplyJobModalProps {

  job: JobDetailsProps;
  closeModal: () => void;

}
const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ job, closeModal}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-background rounded-lg p-4 lg:w-2/3 md:w-2/3 w-full flex flex-col gap-2 relative h-auto max-h-[95vh] overflow-y-auto'>
        <ApplyJobForm jobId='1'/>
        <FaTimes className='cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute' onClick={closeModal}/>

      </div>
    </div>
  )
}

export default ApplyJobModal
