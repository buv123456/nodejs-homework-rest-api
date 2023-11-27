const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const handleNotFoundPath = require("./middleware/handleNotFoundPath");
const handleError = require("./middleware/handleError");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use(handleNotFoundPath);

app.use(handleError);

module.exports = app;
