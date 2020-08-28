import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

//5.16
test('<BlogForm /> creates the blog with right info', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'Testing my form' } })
  fireEvent.change(author, { target: { value: 'Lari Haapaniemi' } })
  fireEvent.change(url, { target: { value: 'www.fullstackopen.com' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)

  expect(createBlog.mock.calls[0]).toEqual([{
    title: 'Testing my form',
    author: 'Lari Haapaniemi',
    url: 'www.fullstackopen.com'
  }])
})