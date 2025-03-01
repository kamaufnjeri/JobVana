import { JobDetailsProps } from '@/interfaces'
import React from 'react'
import PostJobForm from '../forms/PostJobForm';
import { FaTimes } from 'react-icons/fa';

interface PostJobModalProps {
  closeModal: () => void;

}
const PostJobModal: React.FC<PostJobModalProps> = ({ closeModal}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-background rounded-lg p-4 lg:w-3/4 md:w-2/3 w-full flex flex-col gap-2 relative h-auto max-h-[95vh] overflow-y-auto'>
        <PostJobForm/>
        <FaTimes className='cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute' onClick={closeModal}/>

      </div>
    </div>
  )
}

export default PostJobModal
