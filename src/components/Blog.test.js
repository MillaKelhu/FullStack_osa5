import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Component testing',
    author: 'Guess Who',
    url: 'nowherethisisjustfortesting.com',
    likes: 10,
    user: 111111
  }

  const user = {
    username: 'tester',
    name: 'Component tester',
    id: 101010
  }

  const likeBlog = () => {}
  const deleteBlog = () => {}

  beforeEach(() => {
    container = render(<Blog
      blog={blog}
      likeBlog={likeBlog}
      loggedUser={user}
      deleteBlog={deleteBlog}/>).container
  })

  test('component is rendered', () => {
    const element = screen.getAllByText(`${blog.title} ${blog.author}`)
  })

  test('shows only title and author by default', () => {
    const div = container.querySelector('.optionalContent')
    expect(div).toHaveStyle('display:none')
  })
})
