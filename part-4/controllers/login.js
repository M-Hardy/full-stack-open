const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response, next) => {
    try {
        const { username, password } = request.body;
        const user = await User.findOne({ username });
        const passwordCorrect =
            user === null
                ? false
                : await bcrypt.compare(password, user.passwordHash);

        if (!(user && passwordCorrect)) {
            return response
                .status(400)
                .json({ error: "invalid username or password" });
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        };

        const token = jwt.sign(userForToken, process.env.JWT_SECRET);

        response
            .status(200)
            .json({ token, username: user.username, name: user.name });
    } catch (exception) {
        next(exception);
    }
});

module.exports = loginRouter;
