// Importing the express library and creating a router instance
const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");

// Importing the Todo model from a file (probably a MongoDB schema)
const Todo = require("../models/todo");

// Handling GET requests to the root URL ("/")
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Retrieving all todos from the database
    const todos = await Todo.find({});

    // Rendering the "todo/index" view and passing the todos data to it
    res.render("todo/index", { todos });
  })
);

// Handling POST requests to the root URL ("/")
router.post(
  "/",
  asyncHandler(async (req, res) => {
    // Creating a new Todo instance with data from the request body
    const todo = new Todo(req.body.todo);

    // Saving the new todo to the database
    await todo.save();

    // Retrieving all todos from the database
    const todos = await Todo.find({});

    // Redirecting to the "/todos" route
    res.redirect(302, "/todos");
  })
);

// Handling PUT requests to update a todo by ID
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    // Extracting the todo ID from the request parameters
    const { id } = req.params;

    // Updating the todo with a new category value ("completed")
    const todo = await Todo.findByIdAndUpdate(id, { category: "completed" });

    // Redirecting to the "/todos" route
    res.redirect(`/todos`);
  })
);

// Handling DELETE requests to delete a todo by ID
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    // Extracting the todo ID from the request parameters
    const { id } = req.params;

    // Deleting the todo from the database by ID
    await Todo.findByIdAndDelete(id);

    // Redirecting to the "/todos" route
    res.redirect("/todos");
  })
);

// Exporting the router for use in other parts of the application
module.exports = router;
