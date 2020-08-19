const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title : 'Goblorin Elamaa 2',
    author : 'Ronja',
    url : 'www.goblorinelamaa.fi',
    likes: 102,
  },
  {
    title : 'Cooking Blog ver 40',
    author : 'Kerttu',
    url : 'www.blogcookingfree.fi',
    likes: 35,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(initialBlogs)
})

describe('from the test mongo', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  //4.9
  test('check that blogs have field called id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })

  test('a blog can be added', async () => {
    const newBlog = {
      title : 'Cooking Blog ver 12',
      author : 'Jani',
      url : 'www.blogcookingfree51.fi',
      likes: 2,
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    blogsAtEnd.map(blog => blog.toJSON())
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'Cooking Blog ver 12'
    )
  })

  //4.11
  test('a blog with undefined likes gets 0 likes', async () => {
    const newBlog = {
      title : 'Dog Whisperers',
      author : 'Hertta',
      url : 'www.dogwhispererblogspot.fi',
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    blogsAtEnd.map(blog => blog.toJSON())
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes[likes.length-1]).toBe(0)
  })

  //4.12 works, but gives an error in the console using logger, but I think
  //that is the idea so did not do anything about it.
  test('a blog with no title and url rnesults in 400', async () => {
    const newBlog = {
      author : 'Jeepperi',
      likes : 51,
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    blogsAtEnd.map(blog => blog.toJSON())
    expect(blogsAtEnd.length).toBe(initialBlogs.length)
  })
})

//npm run test -- -t 'calling id of a blog'
describe('calling id of a blog', () => {

  test('so the specific blog can be viewed', async () => {
    const blogsAtStart = await Blog.find({})
    blogsAtStart.map(blog => blog.toJSON())

    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body.title).toEqual(blogToView.title)
  })

  test('to delete a blog', async () => {
    const blogsAtStart = await Blog.find({})
    blogsAtStart.map(blog => blog.toJSON())
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    //Could have been placed in a seperate js since called so often
    const blogsAtEnd = await Blog.find({})
    blogsAtEnd.map(blog => blog.toJSON())
    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  //npm run test -- -t 'to change the number of likes'
  //tested with both postman and this
  //4.14
  test('to change the number of likes', async () => {
    const blogsAtStart = await Blog.find({})
    blogsAtStart.map(blog => blog.toJSON())
    const blogToChange = blogsAtStart[0]
    const blogChanged =
      {
        title : blogToChange.title,
        author : blogToChange.author,
        url : blogToChange.url,
        likes: 300,
      }
    await api.put(`/api/blogs/${blogToChange.id}`)
      .send(blogChanged)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await Blog.find({})
    blogsAtEnd.map(blog => blog.toJSON())
    expect(blogsAtEnd[0].title).toEqual(blogChanged.title)
    expect(blogsAtEnd[0].likes).toEqual(300)
  })
})

describe('user test', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('works when using a new username', async () => {
    const usersAtStart = await User.find({})
    usersAtStart.map(user => user.toJSON())

    const newUser = {
      username: 'larppa',
      name: 'Lari Haapaniemi',
      password: 'hepokatti',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails when using a username already in use', async () => {
    const usersAtStart = await User.find({})
    usersAtStart.map(user => user.toJSON())

    const newUser = {
      username: 'root',
      name: 'Big Chonk',
      password: 'salasana123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await User.find({})
    usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails when trying to create account without password', async () => {
    const usersAtStart = await User.find({})
    usersAtStart.map(user => user.toJSON())

    const newUser = {
      username: 'Sevas',
      name: 'Big Chonk Diego',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await User.find({})
    usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails when trying to create account with short username', async () => {
    const usersAtStart = await User.find({})
    usersAtStart.map(user => user.toJSON())

    const newUser = {
      username: 'Se',
      name: 'Tommy',
      password: 'keijo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await User.find({})
    usersAtEnd.map(user => user.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
//npm run test -- -t 'user test'
})

afterAll(() => {
  mongoose.connection.close()
})