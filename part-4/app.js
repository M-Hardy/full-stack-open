const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB blog list app database");
mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info("Connected to MongoDB"))
    .catch((error) => {
        logger.error("Error connecting to MongoDB: ", error.message);
    });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

// Specify base URL for blogsRouter express router object
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
