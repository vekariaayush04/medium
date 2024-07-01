import React from 'react'
import { Link } from 'react-router-dom'

interface blogProps {
    id :string
    authorName :string,
    title : string,
    content:string,
    publishedDate :string
}


const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: blogProps) => {

  return (
    <div className='flex justify-center mb-8'>
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md w-2/3  ">
        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <Avatar size='small' letter={authorName.split('')[0].toUpperCase()}/>
            <span className="font-medium ">
                {authorName}
            </span>
        </div>
        <Link to={`/blog/${id}`} className="inline-flex items-center font-medium text-primary-600 hover:underline" >
            Read more
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Link>
    </div>

    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900"><a href="#">{title}</a></h2>
    <p className="mb-5 font-light text-gray-500">{content}</p>

    <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
            Tutorial
        </span>
        <span className="text-sm">{publishedDate}</span>
    </div>
    
</article>
</div> 
  )
}

interface AvatarProps{
    'size':string,
    'letter' : string
  }
  
export  const Avatar = ({
    size,
    letter
  }:AvatarProps) => {
    return (
      <div className={` rounded-full bg-gray-500 flex justify-center items-center text-white
      ${size === 'big' ? 'h-10 w-10 text-lg' : 'h-6 w-6 text-md' }
      `}>{letter}</div>
    )
  }
  

export default BlogCard
