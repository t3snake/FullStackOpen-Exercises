import { useState } from 'react'

const BlogForm = ({ blogs, setBlogs, setMessage, setMessageType, blogService }) => {

    // State for create form inputs
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const createNewBlog = async (event) => {
        event.preventDefault()

        try{
            const newBlog = await blogService.addBlog(title, url, author)
            const newBlogs = blogs.concat(newBlog)
            setBlogs(newBlogs)

            setMessage(`${title} successfully added`)
            setMessageType('success')

            setTitle('')
            setAuthor('')
            setUrl('')
        } catch(error) {
            setMessage(`Blog add failed due to ${error.message}`)
            setMessageType('error')
        }
    }

    return (
        <div>
            <h2> Add new blog </h2>
            <form onSubmit={createNewBlog}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        data-testid="title-field"
                    />
                </div>

                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        data-testid="author-field"
                    />
                </div>

                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                        data-testid="url-field"
                    />
                </div>

                <button type='submit'> Add </button>
            </form>
        </div>
    )
}

export default BlogForm