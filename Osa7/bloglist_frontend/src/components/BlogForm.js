import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className = 'formBlog'>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div> <TextField placeholder="title" id = 'title' value ={title} onChange={({ target }) => setTitle(target.value)}/></div>
        <div> <TextField placeholder="author" id = 'author' value = {author} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div> <TextField placeholder="url" id = 'url' value = {url} onChange={({ target }) => setUrl(target.value)}/></div>
        <p>{''}</p>
        <Button variant="contained" color="primary" size = 'small' id = 'create-blog' type="submit">create</Button>
        <p>{''}</p>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm