import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogHook = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  useEffect(blogHook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error in login')
      setErrorMessage('wrong username or password')
      errorTimeout()
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    console.log('create button pushed')
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      notificationTimeout()
      blogHook()
    } catch (exception) {
      console.log('error in creating a new blog')
      setErrorMessage(`couldn't create a blog ${title} by ${author}`)
      errorTimeout()
    }
  }

  const notificationTimeout = () => {
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const errorTimeout = () => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage}/>
        <ErrorNotification message={errorMessage}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin} autoComplete="off">
          <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage}/>
      <ErrorNotification message={errorMessage}/>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
