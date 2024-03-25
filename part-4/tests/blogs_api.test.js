const { beforeEach, describe, test, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

const api = supertest(app);

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

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blogObject) => blogObject.save());
    await Promise.all(promiseArray);
});

describe("blog api tests", () => {
    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("blog ID field is defined 'id' instead of '_id'", async () => {
        const response = await api.get("/api/blogs");
        assert(response.body.every((blog) => Object.hasOwn(blog, "id")));
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
