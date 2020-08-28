/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogFrom from './components/BlogForm'
import './index.css'



// eslint-disable-next-line react/prop-types
const Button = ({ clicked, text }) => (
  <button onClick={clicked}>
    {text}
  </button>
)

const App = () => {
  //no  idea if theres should be so many of these D:
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser( user )
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setSuccessMessage('Login successful')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id = 'username'
              type="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id = 'password'
              type= "password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id = 'login-button'>login</button>
        </form>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => {
    return (
      <div>
        <p>{user.name} logged in <Button clicked = {() => logOut()} text = "Logout"/></p>
        <Togglable buttonLabel = 'create blog' ref={blogFormRef}>
          <BlogFrom createBlog = {handleCreate}/>
        </Togglable>
        <p>{''}</p>
        {blogs.filter(blog => blog.user.username === user.username).map(blog => {
          return <Blog key={blog.id} blog={blog} updateLikes = {updateLikes} removeBlog = {removeBlog}/>
        })
        }
      </div>
    )
  }

  const removeBlog = async (blogObject) => {
    try {
      console.log(blogObject)
      await blogService.remove(blogObject)
      blogService.getAll().then(blogs =>
        setBlogs( blogs ),
      )
    } catch(exception) {
      setErrorMessage('removing blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }}

  //used by Blog.js
  const updateLikes = async (blogObject) => {
    try {
      await blogService.update(blogObject.id,blogObject)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch(exception) {
      setErrorMessage('removing blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }}

  //used by BlogFrom.js
  const handleCreate = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create({ title, author, url })
      setSuccessMessage(`A new blog ${title} by ${author} has been added`)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('Adding blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //sorts the blogs in real time
  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })
  //main app func
  return (
    <div>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App