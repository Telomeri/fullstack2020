import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [info, shownInfo] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove the blog ${blog.title}?`)) {
      removeBlog(blog)
    }
  }
  //give the id as extra so the func works in app. The reason why i moved if there was
  //because now i dont need to import usestate from app to here. This thing
  //still does the heavy lifting
  const addLike = async () => {
    await updateLikes({
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      likes: (blog.likes += 1),
      id: blog.id
    })
  }
  //could be the same func but currently under a flu and for some reason did not
  //get it to work, revisit if time === true ;)
  const toggleTrue = () => {
    shownInfo(true)
  }

  const toggleFalse = () => {
    shownInfo(false)
  }

  if (info !== true) {
    return (
      <div style = {blogStyle} id = 'blog-done'>
        {blog.title} {blog.author} <button id = 'view' onClick={toggleTrue}>view</button>
      </div>
    )
  } else {
    return (
      <div style = {blogStyle} id = 'blog-done'>
        <div id = 'title'> {blog.title} <button id = 'hide' onClick={toggleFalse}>hide</button> </div>
        <div> {blog.url} </div>
        <div> likes {blog.likes} <button id = 'like' onClick={addLike}>like</button></div>
        <div> {blog.author} </div>
        <button id = 'remove-blog' onClick={deleteBlog}>remove</button>
      </div>
    )
  }
}

//
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
