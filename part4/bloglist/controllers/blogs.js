const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
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

module.exports = blogRouter