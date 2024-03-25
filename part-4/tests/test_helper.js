const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "blog1",
        author: "author1",
        url: "url1",
        likes: 1,
    },
    {
        title: "blog2",
        author: "author2",
        url: "url2",
        likes: 2,
    },
    {
        title: "blog3",
        author: "author3",
        url: "url3",
        likes: 3,
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
