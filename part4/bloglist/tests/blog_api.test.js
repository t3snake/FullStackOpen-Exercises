const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const blog_app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')

const blog_api = supertest(blog_app)

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

const initialUser = {
    username: "def23",
    name: "Def",
    password: "password@def"
}

let token = ''

beforeEach(async () => {
    await User.deleteMany({})
    const userResponse = await blog_api
        .post('/api/users')
        .send(initialUser)

    let tokenResponse = await blog_api
        .post('/api/login')
        .send({
            username: initialUser.username,
            password: initialUser.password
        })
    
    token = tokenResponse.body.token

    await Blog.deleteMany({})
    let blog = new Blog(initialBlogs[0])
    blog.user = userResponse.body.id
    await blog.save()
    blog = new Blog(initialBlogs[1])
    blog.user = userResponse.body.id
    await blog.save()

})

describe('Test GET for blogs api', () => {
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
    
    test('check if the parameter id exists in response object', async () => {
        let response = await blog_api.get('/api/blogs')
    
        const object = response._body[0]
    
        assert("id" in object)
    })
})


describe('Test POST for blogs api', () => {

    test('check if post works with a valid entry with auth', async () => {
        const blog = {
            title: "DEF",
            author: "Author of DEF",
            url: "def.com",
            likes: 15,
        }
    
        await blog_api
            .post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        let response = await blog_api.get('/api/blogs')
    
        let content = response._body.map(e => e.title)
    
        assert.strictEqual(content.length, initialBlogs.length + 1)
    
        assert(content.includes('DEF'))
    
    })

    test('check post with invalid auth', async () => {
        const blog = {
            title: "DEF",
            author: "Author of DEF",
            url: "def.com",
            likes: 15,
        }
    
        await blog_api
            .post('/api/blogs')
            .send(blog)
            .expect(401)
    })
    
    test('check post with missing likes parameter', async () => {
        const blog = {
            title: "DEF",
            author: "Author of DEF",
            url: "def.com",
        }
    
        let response = await blog_api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            
        assert.strictEqual(response._body.likes, 0)
    })
    
    test('check post with missing title parameter', async () => {
        const blog = {
            author: "Author of HGR",
            url: "hgr.com",
            likes: 50
        }
    
        await blog_api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(400)
    
    })
    
    test('check post with missing url parameter', async () => {
        const blog = {
            title: "GHY",
            author: "Author of GHY",
            likes: 50
        }

        await blog_api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(400)
    })
})

describe('Test DELETE for blogs api', () => {
    test('check delete', async () => {
        let response = await blog_api.get('/api/blogs')
    
        const content = response._body.map(body => body.id)
    
        await blog_api
            .delete(`/api/blogs/${content[0]}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
        response = await blog_api.get('/api/blogs')

        assert.strictEqual(response._body.length, initialBlogs.length-1)

        await blog_api
            .delete(`/api/blogs/${content[1]}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
        response = await blog_api.get('/api/blogs')

        assert.strictEqual(response._body.length, initialBlogs.length-2)

    })

    test('check delete with invalid auth', async () => {
        let response = await blog_api.get('/api/blogs')
    
        const content = response._body.map(body => body.id)
    
        await blog_api
            .delete(`/api/blogs/${content[0]}`)
            .set('Authorization', `Bearer abc@1`)
            .expect(401)
    })
})

describe('Test PUT for blogs api', () => {
    test('check put with valid id', async () => {
        let response = await blog_api.get('/api/blogs')
    
        const abcBlog = response._body.filter(body => body.title === 'ABC')

        assert.strictEqual(abcBlog[0].likes, 51)

        const object = {
            title: "ABC",
            author: "Author of ABC",
            url: "abc.com",
            likes: 57,
        }
    
        response = await blog_api
            .put(`/api/blogs/${abcBlog[0].id}`)
            .send(object)
            .expect(200)

        assert.strictEqual(response._body.likes, 57)
    })

    test('check put with non existing id', async () => {

        const object = {
            title: "ABC",
            author: "Author of ABC",
            url: "abc.com",
            likes: 57,
        }
    
        response = await blog_api
            .put(`/api/blogs/1`)
            .send(object)
            .expect(404)
    })
})


after( async () => {
    await mongoose.connection.close()
})
