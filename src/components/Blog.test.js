import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const blog = {
    title: 'Component testing',
    author: 'Guess Who',
    url: 'nowherethisisjustfortesting.com',
    likes: 10,
    user: 111111
  }

  const loggedUser = {
    username: 'tester',
    name: 'Component tester',
    id: 101010
  }

  beforeEach(() => {
    mockLikeHandler.mockReset()
    mockDeleteHandler.mockReset()

    container = render(<Blog
      blog={blog}
      likeBlog={mockLikeHandler}
      loggedUser={loggedUser}
      deleteBlog={mockDeleteHandler}/>).container
  })

  test('component is rendered', () => {
    const element = screen.getAllByText(`${blog.title} ${blog.author}`)
  })

  test('shows only title and author by default', () => {
    const div = container.querySelector('.optionalContent')
    expect(div).toHaveStyle('display:none')
  })

  test('other info is shown after clicking view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.optionalContent')
    expect(div).not.toHaveStyle('display:none')
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
