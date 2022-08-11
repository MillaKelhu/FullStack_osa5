import { useState, useEffect } from 'react'

const BlogForm = ({
    createBlog,
    blogCreated
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    console.log('create button pushed')
    const newBlog = await createBlog(title, author, url)
    if (newBlog === true) {
      setTitle('')
      setAuthor('')
      setUrl('')
      blogCreated(title, author)
    }
  }

  return (
      <div>
          <h2>create</h2>
          <form onSubmit={handleCreateBlog} autoComplete="off">
              <div>
                title:
                <input
                type="text"
                value={title}
                name="Title"
                onChange={({target}) => setTitle(target.value)}
                />
              </div>
              <div>
                author:
                <input
                type="text"
                value={author}
                name="Author"
                onChange={({target}) => setAuthor(target.value)}
                />
              </div>
              <div>
                url:
                <input
                type="text"
                value={url}
                name="Url"
                onChange={({target}) => setUrl(target.value)}
                />
              </div>
              <button type="submit">
                create
              </button>
          </form>
      </div>
  )
}

export default BlogForm