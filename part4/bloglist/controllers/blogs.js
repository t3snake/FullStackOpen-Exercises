const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user 

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    }

    const blog = new Blog(newBlog)

    try {
        const result = await blog.save()

        user.blogs = user.blogs.concat(result._id)
        await user.save()

        response.status(201).json(result)
    } catch(exception) {
        response.status(400).send({error: exception.message})
    }
})

blogRouter.post('/:id/comments', async (request, response) => {
    const id = request.params.id

    // mongo _id format check
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        response.status(404).end()
        return
    }

    try{
        const comment = request.body.comment

        const blog = await Blog.findById(id)

        if ( !blog.comments ) {
            blog.comments = []
        }

        blog.comments.push(comment)

        const result = await blog.save()

        response.status(201).json(result)
    } catch(exception) {
        response.status(400).send({error: exception.message})
    }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const id = request.params.id

    const user = request.user

    try{
        await Blog.findByIdAndDelete(id)
        user.blogs = user.blogs.filter(blogId => blogId.toString() !== id)
        await user.save()
        response.status(204).end()
    } catch (error) {
        response.status(404).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    // mongo _id format check
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