/** @format */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const database = require("./database");
var createError = require("http-errors");
const Authentication = require("./server/middleware/Authentication");
const fileUpload = require("express-fileupload");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

const port = 7001;

// *** Public routes
app.use("/api", require("./server/routes/publicRoutes/publicRoute"));

// *** Item routes
app.use(
  "/api/user",
  Authentication,
  require("./server/routes/userRoute/userRoute")
);

// *** Item routes
app.use(
  "/api/item",
  Authentication,
  require("./server/routes/itemRoute/itemRoute")
);

// If route not found
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});

// Error message
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
