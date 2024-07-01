import React from 'react'
import { Avatar } from './BlogCard'

const AppBar = ({author}:{author :string}) => {
  return (
    <div className='h-13 bg-gray-100 flex py-4 px-10 justify-between'>
        <div className='text-xl font-semibold flex items-center'>Medium</div>
        <Avatar size='big' letter={author}/>
    </div>
  )
}

export default AppBar
