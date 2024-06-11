const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name required']
    },
    passwordHash: {
        type: String,
        required: [true, 'password required']
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()

        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)