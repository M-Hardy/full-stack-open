const { beforeEach, describe, test, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

const Blog = require("../models/blog");
const testHelper = require("./test_helper");

describe("when there is initially some blogs saved", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});

        const blogObjects = testHelper.initialBlogs.map(
            (blog) => new Blog(blog)
        );
        const promiseArray = blogObjects.map((blogObject) => blogObject.save());
        await Promise.all(promiseArray);
    });

    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs");
        assert.strictEqual(
            response.body.length,
            testHelper.initialBlogs.length
        );
    });

    test("blog ID field is defined 'id' instead of '_id'", async () => {
        const response = await api.get("/api/blogs");
        assert(response.body.every((blog) => Object.hasOwn(blog, "id")));
    });

    describe("addition of a new blog", () => {
        test("a valid blog can be added", async () => {
            const newNum = testHelper.initialBlogs.length + 1;
            const newBlog = {
                title: `blog${newNum}`,
                author: `author${newNum}`,
                url: `url${newNum}`,
                likes: newNum,
            };

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const blogsAtEnd = await testHelper.blogsInDb();
            assert.strictEqual(blogsAtEnd.length, newNum);

            const contents = blogsAtEnd.map((blog) => blog.title);
            assert(contents.includes(`blog${newNum}`));
        });

        test("if missing 'likes' field, assign default value of 0", async () => {
            const newNum = testHelper.initialBlogs.length + 1;
            const missingLikes = {
                title: `blog${newNum}`,
                author: `author${newNum}`,
                url: `url${newNum}`,
            };

            await api
                .post("/api/blogs")
                .send(missingLikes)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const blogsAtEnd = await testHelper.blogsInDb();
            assert.strictEqual(blogsAtEnd.length, newNum);

            const contents = blogsAtEnd.map((blog) => blog.title);
            assert(contents.includes(`blog${newNum}`));

            const newBlog = blogsAtEnd.find(
                (blog) => blog.title === `blog${newNum}`
            );
            assert(Object.hasOwn(newBlog, "likes") && newBlog.likes === 0);
        });

        test("If missing 'title' or 'url' properties return 400 status code", async () => {
            const newNum = testHelper.initialBlogs.length + 1;
            const missingFields = {
                author: `author${newNum}`,
                likes: 0,
            };

            await api.post("/api/blogs").send(missingFields).expect(400);

            const blogsAtEnd = await testHelper.blogsInDb();
            assert(blogsAtEnd.length === testHelper.initialBlogs.length);
        });
    });
    describe("deletion of a blog", () => {
        test("succeeds with status code 204 if id is valid", async () => {
            const blogsAtStart = await testHelper.blogsInDb();
            const blogToDelete = blogsAtStart[0];

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

            const blogsAtEnd = await testHelper.blogsInDb();
            const titles = blogsAtEnd.map((blog) => blog.title);
            assert(!titles.includes(blogToDelete.title));
            assert.strictEqual(
                blogsAtEnd.length,
                testHelper.initialBlogs.length - 1
            );
        });
    });
    after(async () => {
        await mongoose.connection.close();
    });
});
