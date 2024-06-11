const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const supertest = require('supertest')

const user_api = supertest(app)

const initialUsers = [
    {
        username: "abc69",
        name: "Abc Xyz",
        passwordHash: "sifsjk67@@",
    },
    {
        username: "mnm71",
        name: "Eminem",
        passwordHash: "pofjn3lk9lo$ms&hd00((13!@",
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let user = new User(initialUsers[0])
    await user.save()
    user = new User(initialUsers[1])
    await user.save()
})

describe('Test GET for users api', () => {
    test('check get uri returns json', async () => {
        await user_api
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })

    test('check get uri returns 2 users', async () => {
        let response = await user_api.get('/api/users')
    
        const content = response._body
    
        assert.strictEqual(content.length, initialUsers.length)
    })
})

describe('Test POST for users api', () => {

    test('check if post works with a valid entry', async () => {
        const user = {
            username: "lop429",
            name: "Lopex Guard",
            password: "jl9y^pp@@",
        }
    
        await user_api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        let response = await user_api.get('/api/users')
    
        let content = response._body.map(e => e.username)
    
        assert.strictEqual(content.length, initialUsers.length + 1)
    
        assert(content.includes('lop429'))
    
    })

    test('check post with invalid username', async () => {
        const user = {
            username: "lo",
            name: "Lopex Guard",
            password: "jl9y^pp@@",
        }
    
        await user_api
            .post('/api/users')
            .send(user)
            .expect(400)
    
    })

    test('check post with missing username', async () => {
        const user = {
            name: "Lopex Guard",
            password: "jl9y^pp@@",
        }
    
        await user_api
            .post('/api/users')
            .send(user)
            .expect(400)
    
    })

    test('check post with invalid password', async () => {
        const user = {
            username: "lo",
            name: "Lopex Guard",
            password: "jl",
        }
    
        await user_api
            .post('/api/users')
            .send(user)
            .expect(400)
    
    })

    test('check post with missing password', async () => {
        const user = {
            username: "Yorro65",
            name: "Lopex Guard",
        }
    
        await user_api
            .post('/api/users')
            .send(user)
            .expect(400)
    
    })
})

after( async () => {
    await mongoose.connection.close()
})