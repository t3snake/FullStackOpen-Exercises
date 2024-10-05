import axios from "axios";

const baseUrl = "/api/blogs";

let token = "";

const setToken = (tokenString) => {
    token = `Bearer ${tokenString}`;
};

const getBlogs = async () => {
    const response = await axios.get(baseUrl);
    const blogs = response.data.toSorted((blog1, blog2) => {
        return blog2.likes - blog1.likes;
    });
    return blogs;
};

const addBlog = async (title, url, author) => {
    const response = await axios.post(
        baseUrl,
        {
            title,
            url,
            author,
        },
        {
            headers: { Authorization: token },
        },
    );
    return response.data;
};

const addCommentOnBlog = async (id, comment) => {
    const response = await axios.post(
        `${baseUrl}/${id}/comments`,
        {
            comment,
        }
    );
    return response.data;

}

const addLikeOnBlog = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1,
        user: blog.user.id,
    });

    return response.data;
};

const deleteBlog = async (id) => {
    return await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: token },
    });
};

export default { setToken, getBlogs, addBlog, addLikeOnBlog, deleteBlog, addCommentOnBlog };
