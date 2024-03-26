const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response, next) => {
    try {
        const users = User.find({});
        response.json(users);
    } catch (exception) {
        next(exception);
    }
});

usersRouter.post("/", async (request, response, next) => {
    try {
        const { username, name, password } = request.body;

        const saltRounds = 10;
        const passwordHash = bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await newUser.save();
        response.send(201).json(savedUser);
    } catch (exception) {
        next(exception);
    }
});

module.exports = usersRouter;
