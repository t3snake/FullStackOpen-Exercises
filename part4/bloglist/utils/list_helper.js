const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    var likes = 0

    blogs.forEach(element => {
        if (element.likes) {
            likes += element.likes
        }
    });

    return likes
}

const favoriteBlog = (blogs) => {
    var maxLikes = 0 
    var maxLikeBlog = 0

    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            maxLikeBlog = blog
        }
    })

    if (maxLikeBlog == 0) return {}

    return {
        title: maxLikeBlog.title,
        author: maxLikeBlog.author,
        likes: maxLikeBlog.likes 
    }
}

const mostBlogs = (blogs) => {
    const map = new Map()

    blogs.forEach( blog => {
        if (map.has(blog.author)) {
            map.set(blog.author, map.get(blog.author) + 1)
        } else {
            map.set(blog.author, 1)
        }
    })

    var maxNoOfBlogs = 0
    var authorWithMaxBlogs = 0

    map.forEach( (value, key) => {
        if (value > maxNoOfBlogs) {
            maxNoOfBlogs = value
            authorWithMaxBlogs = key
        }
    })

    if (authorWithMaxBlogs == 0) return {}

    return {
        author: authorWithMaxBlogs,
        blogs: maxNoOfBlogs
    }
}

const mostLikes = (blogs) => {
    const map = new Map()

    blogs.forEach( blog => {
        if (map.has(blog.author)) {
            map.set(blog.author, map.get(blog.author) + blog.likes)
        } else {
            map.set(blog.author, blog.likes)
        }
    })

    var maxNoOfLikes = 0
    var authorWithMaxLikes = 0

    map.forEach( (value, key) => {
        if (value > maxNoOfLikes) {
            maxNoOfLikes = value
            authorWithMaxLikes = key
        }
    })

    if (authorWithMaxLikes == 0) return {}

    return {
        author: authorWithMaxLikes,
        likes: maxNoOfLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}