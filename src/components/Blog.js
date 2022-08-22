import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef((props, ref) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  const [blog, likeBlog, loggedUser, deleteBlog] = [props.blog, props.likeBlog, props.loggedUser, props.deleteBlog]

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
          <button className='deletebutton' onClick={handleDelete}>
              remove
          </button>
        </div>
      )
    }
    return
  }

  const hideInfoWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showInfoWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button style={hideInfoWhenVisible} className='button' onClick={() => setBlogInfoVisible(true)}>
        view
      </button>
      <button style={showInfoWhenVisible} className='button' onClick={() => setBlogInfoVisible(false)}>
          hide
      </button>
      <div style={showInfoWhenVisible} className='optionalContent'>
        <div>
          {blog.url}
        </div>
        <div>
            likes {blog.likes}
          <button className='button' onClick={handleLike}>
              like
          </button>
        </div>
        {createDeleteButton()}
      </div>
    </div>
  )
})

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog