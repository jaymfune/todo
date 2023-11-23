const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Todo = require("./models/todo");

mongoose.connect("mongodb://127.0.0.1:27017/todo-app");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

// Set view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // To parse the data from a form
app.use(methodOverride("_method"));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.render("todo/index", { todos });
});

// Route to submit new todo to
app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body.todo);
  await todo.save();
  const todos = await Todo.find({});
  res.redirect(302, "/todos");
});

// Route for put request to update todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, { category: "completed" });
  res.redirect(`/todos`);
});

// Route to delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
