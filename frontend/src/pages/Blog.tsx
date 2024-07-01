import React from 'react'
import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import useBlog from '../hooks'

export const Blog = () => {
  const {loding,blog} = useBlog();

  if(loding){
    return(
      <div>loading ...</div>
    )
  }
  return (
    <div>
      <AppBar author='A'/>
      {blog.map((b)=><BlogCard id={b.id} authorName={b.author.name === null ? 'unknown' : b.author.name} title={b.title} content={b.content} publishedDate='12/12/12'/>)}
      
    </div>
  )
}
