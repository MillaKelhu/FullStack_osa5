import { useState, useEffect } from 'react'

const Blog = ({blog, likeBlog}) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const handleLike = async () => {
    console.log(`${blog.title} like pressed`)

    const blogLiked = await likeBlog(blog)
  }

  const hideWhenVisible = {display: blogInfoVisible ? 'none' : ''}
  const showWhenVisible = {display: blogInfoVisible ? '' : 'none'}

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogInfoVisible(true)}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setBlogInfoVisible(false)}>
            hide
          </button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>
            like
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog