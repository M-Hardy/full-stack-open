const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response, next) => {
    try {
        const users = await User.find({}).populate("blogs", {
            url: 1,
            title: 1,
            author: 1,
        });
        response.json(users);
    } catch (exception) {
        next(exception);
    }
});

usersRouter.post("/", async (request, response, next) => {
    try {
        const { username, name, password } = request.body;

        if (!password || password.length < 3) {
            return response.status(400).json({
                error: "invalid password: password must be at least 3 characters long",
            });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    } catch (exception) {
        next(exception);
    }
});

usersRouter.delete("/:id", async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

module.exports = usersRouter;
