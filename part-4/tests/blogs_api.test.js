const { beforeEach, describe, test, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const testHelper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blogObject) => blogObject.save());
    await Promise.all(promiseArray);
});

describe("blog api tests", () => {
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

    after(async () => {
        await mongoose.connection.close();
    });
});
