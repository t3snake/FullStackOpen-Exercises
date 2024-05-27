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

module.exports = {
    dummy,
    totalLikes
}