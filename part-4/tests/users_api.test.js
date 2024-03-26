const { beforeEach, describe, test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is one user already in db", () => {
    beforeEach(async () => {
        const user = new User({
            username: "root",
            name: "Superuser",
            password: "admin_pasword",
        });

        await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: "M-man",
            name: "Myir, the Last Man",
            password: "password",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map((user) => user.username);
        assert(usernames.includes(newUser.username));
    });

    test("creation fails with proper statuscode and message if duplicate username in db", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "root",
            name: "NOTSuperUserHAHA",
            password: "password",
        };

        const result = await api
            .post("api/users")
            .send(newUser)
            .expect(400)
            .expect("content-type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtStart.length, usersAtEnd.length);
        assert(result.body.error.includes("expected `username` to be unique"));
    });

    test("creation fails if ");
});
