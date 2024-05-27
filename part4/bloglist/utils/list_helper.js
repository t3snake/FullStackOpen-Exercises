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

    console.log(map)

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}