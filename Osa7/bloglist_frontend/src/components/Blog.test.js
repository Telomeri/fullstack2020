import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {

  let component
  let updateLikes
  let removeBlog

  //the user like is needed for updateLikes
  beforeEach(() => {
    const blog = {
      title : 'Iltarusko Blogi',
      author : 'Heikki Mattila',
      url : 'www.iltarusko.gov',
      likes: 10,
      user: 'afdasdas'
    }
    updateLikes = jest.fn()
    removeBlog = jest.fn()

    component = render(
      <Blog blog={blog} updateLikes = {updateLikes} removeBlog = {removeBlog}/>
    )
  })

  test('renders the right content without pressing view', () => {

    expect(component.container).toHaveTextContent(
      'Iltarusko Blogi'
    )
    expect(component.container).toHaveTextContent(
      'Heikki Mattila'
    )
    expect(component.container).not.toHaveTextContent(
      'www.iltarusko.gov'
    )
    expect(component.container).not.toHaveTextContent(
      'likes 10'
    )
  })

  test('renders the right content when view is pressed', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Iltarusko Blogi'
    )
    expect(component.container).toHaveTextContent(
      'Heikki Mattila'
    )
    expect(component.container).toHaveTextContent(
      'www.iltarusko.gov'
    )
    expect(component.container).toHaveTextContent(
      'likes 10'
    )
  })

  test('when like is pressed twice Blog calls to update likes twice', () => {

    const view = component.getByText('view')
    fireEvent.click(view)
    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(updateLikes.mock.calls).toHaveLength(2)
    //i would check if the likes equal 12, but
    //using console.log I can see it does, the problem is
    //that the updateLikes.mock.calls statement is weird array which I could
    //check against, but that doesnt really make sense and
    //expect(updateLikes.mock.calls).toContain('"likes": 12')
    //does not work
  })
})