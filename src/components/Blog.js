import { useState, useEffect } from 'react'

const Blog = ({blog, likeBlog, loggedUser, deleteBlog}) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const handleLike = async () => {
    console.log(`${blog.title} like pressed`)

    await likeBlog(blog)
  }

  const handleDelete = async () => {
    console.log(`${blog.title} delete pressed`)
    await deleteBlog(blog)
  }

  const createDeleteButton = () => {
    if (blog.user.id === loggedUser.id) {
      return (
        <div>
          <button class='deletebutton' onClick={handleDelete}>
            remove
          </button>
        </div>
      )
    }
    return
  }

  const hideInfoWhenVisible = {display: blogInfoVisible ? 'none' : ''}
  const showInfoWhenVisible = {display: blogInfoVisible ? '' : 'none'}

  return (
    <div className='blog'>
      <div style={hideInfoWhenVisible}>
        {blog.title} {blog.author}
        <button class='button' onClick={() => setBlogInfoVisible(true)}>
          view
        </button>
      </div>
      <div style={showInfoWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button class='button' onClick={() => setBlogInfoVisible(false)}>
            hide
          </button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button class='button' onClick={handleLike}>
            like
          </button>
        </div>
        {createDeleteButton()}
      </div>
    </div>
  )
}

export default Blog