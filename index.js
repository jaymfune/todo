// Importing necessary modules and libraries
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

// Importing the routes defined for todos
const todosRoutes = require("./routes/todos");

// Connecting to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/todo-app");

// Handling database connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Creating an instance of the Express application
const app = express();

// Configuring the view engine and setting the views directory
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuring middleware to parse form data and override HTTP methods
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Mounting the "todos" routes under the "/todos" URL path
app.use("/todos", todosRoutes);

// Handling a GET request to the root URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Starting the server and listening on port 3000
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
