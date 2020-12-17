/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

import { Container, TableContainer, Paper, TableBody,
  TableRow, TableCell, Table, TextField, Button, AppBar, Toolbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'


import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'




// eslint-disable-next-line react/prop-types
const LogOutButton = ({ clicked, text }) => (
  <Button variant="outlined" color="secondary" size = 'small' onClick={clicked}>
    {text}
  </Button>
)

const Menu = () => {
  return (
    <div>
      <AppBar position='static' color = 'primary'>
        <Toolbar>
          <Button color="inherit" component={Link} to="/blogs">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField placeholder="username"
              id = 'username'
              type="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField placeholder="password"
              id = 'password'
              type= "password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <p>{''}</p>
          <Button variant="contained" color="primary" type="submit" id = 'login-button'>login</Button>
        </form>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const singleblogForm = () => {
    //I completely forgot that I had /users as backend, so this and usersForm could have been done a lot cleaner
    //this screwup was because this excercise and the previous one had 6 months in between them
    const foundBlog = blogmatch
      ? blogs.find(blog => blog.id === blogmatch.params.id)
      : null
    if (foundBlog) {
      return (
        <div>
          <p>{user.name} logged in <LogOutButton clicked = {() => logOut()} text = "Logout"/></p>
          <h1> {foundBlog.title} by {foundBlog.author}</h1>
          {<Blog key={foundBlog.id} blog={foundBlog} updateLikes = {updateLikes} removeBlog = {removeBlog} view = {1}/>}
        </div>
      )
    }
  }

  const blogForm = () => {
    //If blogs should show only users blog use: blogs.filter(blog => blog.user.username === user.username).map(blog =>
    return (
      <div>
        <p>{user.name} logged in <LogOutButton clicked = {() => logOut()} text = "Logout"/></p>
        <Togglable buttonLabel = 'create blog' ref={blogFormRef}>
          <BlogForm createBlog = {handleCreate}/>
        </Togglable>
        <p>{''}</p>
        <TableContainer component={Paper}>
          <Table size = 'large'>
            <TableBody>
              <TableRow>
                {blogs.map(blog => {
                  return  <Blog key={blog.id} blog={blog} updateLikes = {updateLikes} removeBlog = {removeBlog} view = {0}/>
                })
                }
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }



  //shows the /users:id view
  const singleuserForm = () => {
  //I completely forgot that I had /users as backend, so this and usersForm could have been done a lot cleaner
  //this screwup was because this excercise and the previous one had 6 months in between them
    const foundUser = usermatch
      ? blogs.find(blog => blog.user.id === usermatch.params.id)
      : null
    if (foundUser) {
      return (
        <div>
          <p>{user.name} logged in <LogOutButton clicked = {() => logOut()} text = "Logout"/></p>
          <h1> {foundUser.user.name} </h1>
          <h2> Added Blogs</h2>
          {blogs.filter(blog => blog.user.username === foundUser.user.username).map(blog => {
            return <li key = {blog.id}>{blog.title}</li>
          })
          }
        </div>
      )
    }
  }

  //shows the /users view
  const usersForm = () => {
    //finds the how many blogs a user has and adds them to /users view
    const userArray = () => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      var userDict = []
      blogs.map(blogorig => {
        let count = 0
        if (!userDict.some(e => e.user.id === blogorig.user.id)) {
          blogs.map(blog => {
            if (blog.user.id === blogorig.user.id) {
              count++
            }
            return null
          })
          userDict.push({ user: blogorig.user, blogamount: count })
        }
        return null
      })
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow><TableCell></TableCell><TableCell><h4>blogs created</h4></TableCell></TableRow>
              {userDict.map(user => <TableRow key = {user.user.id}><TableCell align='left'><Link to={`/users/${user.user.id}`}>{user.user.name}</Link></TableCell><TableCell align='left'>{user.blogamount}</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
    //could have been easy to add the logged in as a headedr instead of seperate for every page
    return (
      <div>
        <p>{user.name} logged in <LogOutButton clicked = {() => logOut()} text = "Logout"/></p>
        <h2>Users</h2>
        {userArray()}
      </div>
    )
  }

  const removeBlog = async (blogObject) => {
    try {
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

  const usermatch = useRouteMatch('/users/:id')
  const blogmatch = useRouteMatch('/blogs/:id')

  //sorts the blogs in real time
  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })
  //main app func
  //note that we could have used redict to login page, but now loads the
  //login form to each page, and keeps the user there after logged in, being much more realistic IMO
  return (
    <Container>
      <div>
        <div>
          <Menu />
          <SuccessNotification message={successMessage}/>
          <ErrorNotification message={errorMessage}/>
          <h1>Blogs app</h1>
        </div>
        <Switch>
          <Route path = "/users/:id">
            {user === null ? loginForm() : singleuserForm()}
          </Route>
          <Route path = "/users">
            {user === null ? loginForm() : usersForm()}
          </Route>
          <Route path = "/blogs/:id">
            {user === null ? loginForm() : singleblogForm()}
          </Route>
          <Route path = "/">
            {user === null ? loginForm() : blogForm()}
          </Route>
        </Switch>
      </div>
    </Container>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <Alert severity = 'success'>
      {message}
    </Alert>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <Alert severity = 'error'>
      {message}
    </Alert>
  )
}

export default App