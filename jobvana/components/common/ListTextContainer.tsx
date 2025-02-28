import React from 'react'
import { FaArrowRight } from 'react-icons/fa6';


interface ListTextContainerProps {
    listItems: string[];
}


const ListTextContainer: React.FC<ListTextContainerProps> = ({ listItems }) => {
  return (
    <ul className='flex w-full items-start gap-2 justify-start flex-col p-4'>
      {listItems && listItems.map((item, index) => (
        <li key={index} className='flex flex-row gap-2  items-start justify-start'>
          <FaArrowRight className='text-xl text-primary'/>
          <span className='text-p stylish'>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default ListTextContainer
