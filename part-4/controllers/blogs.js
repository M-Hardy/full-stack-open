const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.get("/:id", (request, response, next) => {
    Blog.findById(request.params.id)
        .then((blog) => {
            if (blog) {
                response.json(blog);
            } else {
                response.send(404).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

blogsRouter.post("/", async (request, response, next) => {
    const blog = new Blog(request.body);
    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id);
        response.sendStatus(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", (request, response, next) => {
    const blog = request.body;
    Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })
        .then((updatedBlog) => {
            response.json(updatedBlog);
        })
        .catch((error) => next(error));
});

module.exports = blogsRouter;
