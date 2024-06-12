const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const users = await User.find({})
    const user = users[0]

    const newBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user.id
    }

    const blog = new Blog(newBlog)

    try {
        const result = await blog.save()

        console.log(result)

        user.blogs = user.blogs.concat(result._id)
        await user.save()

        response.status(201).json(result)
    } catch(exception) {
        response.status(400).send({error: exception.message})
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    try{
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        response.status(404).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        response.status(404).end()
        return
    }

    const blog = request.body

    try{
        let result = await Blog.findByIdAndUpdate(id, blog, {new: true})
        if (result) {
            response.status(200).json(result)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        response.status(400).send({error: error.message})
    }
})

module.exports = blogRouter