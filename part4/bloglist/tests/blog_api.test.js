const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const blog_app = require('../app')
const Blog = require('../models/blog')
const supertest = require('supertest')


blog_api = supertest(blog_app)

const initialBlogs = [
    {
        title: "ABC",
        author: "Author of ABC",
        url: "abc.com",
        likes: 51,
    },
    {
        title: "BCD",
        author: "Author of BCD",
        url: "bcd.com",
        likes: 96,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(initialBlogs[0])
    await blog.save()
    blog = new Blog(initialBlogs[1])
    await blog.save()

})

test('check get uri returns json', async () => {
    await blog_api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
})

test('check get uri returns 2 blogs', async () => {
    let response = await blog_api.get('/api/blogs')

    const content = response._body

    assert.strictEqual(content.length, initialBlogs.length)
})

test('check get uri returns the correct authors', async () => {
    let response = await blog_api.get('/api/blogs')

    const content = response._body.map(body => body.author)

    assert(content.includes('Author of ABC'))
    assert(content.includes('Author of BCD'))
})

after( async () => {
    await mongoose.connection.close()
})
