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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}