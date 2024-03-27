const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate("user", {
            username: 1,
            name: 1,
        });
        response.json(blogs);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.json(blog);
        } else {
            response.send(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;
        const user = request.user;

        const blog = new Blog({
            title: body.title,
            url: body.url,
            likes: body.likes,
            author: body.author,
            user: user._id,
        });

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(blog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        const user = request.user;
        console.log(user);

        if (blog.user.toString() !== user._id.toString()) {
            return response
                .status(400)
                .json({ error: "token user id and blog user id do not match" });
        }

        await Blog.findByIdAndDelete(blog.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const blog = request.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            {
                new: true,
            }
        );
        response.json(updatedBlog);
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogsRouter;
