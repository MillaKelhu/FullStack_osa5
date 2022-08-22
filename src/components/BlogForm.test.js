import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  const mockCreateHandler = jest.fn()

  beforeEach(() => {
    mockCreateHandler.mockReset()

    container = render(<BlogForm
      createBlog={mockCreateHandler}/>).container
  })

  test('component is rendered correctly', () => {
    const titleInput = container.querySelector('input[name="Title"]')
    expect(titleInput).toBeDefined()
    const authorInput = container.querySelector('input[name="Author"]')
    expect(authorInput).toBeDefined()
    const urlInput = container.querySelector('input[name="Url"]')
    expect(urlInput).toBeDefined()
  })

  test('callback function is called with right info when blog is created', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('button[type="submit"]')
    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    await user.type(titleInput, 'Component testing')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'testurl.com')
    await user.click(button)

    expect(mockCreateHandler.mock.calls).toHaveLength(1)
    expect(mockCreateHandler.mock.calls[0][0]).toBe('Component testing')
    expect(mockCreateHandler.mock.calls[0][1]).toBe('Test Author')
    expect(mockCreateHandler.mock.calls[0][2]).toBe('testurl.com')
  })
})