// Import required packages
import express from "express";
import mongoose from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import handlebars from "handlebars";
import { readFileSync } from "fs";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Server Configuration
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todoDB";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Express app
const app = express();

// MongoDB Connection Setup
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define MongoDB Schema and Model
const todoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// Handlebars Setup
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true, // Enable access to Mongoose model properties
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", [`${__dirname}/views`]);

// Middleware Setup
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.static(`${__dirname}/public`)); // Serve static files

// Register Handlebars Helper
handlebars.registerHelper("ifEqual", function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

// Compile Handlebars Templates
const todoInput = handlebars.compile(
  readFileSync(`${__dirname}/views/partials/todo-input.handlebars`, "utf-8")
);
const todoItem = handlebars.compile(
  readFileSync(`${__dirname}/views/partials/todo-item.handlebars`, "utf-8")
);
const filterBtns = handlebars.compile(
  readFileSync(`${__dirname}/views/partials/filter-buttons.handlebars`, "utf-8")
);
const noTodo = handlebars.compile(
  readFileSync(`${__dirname}/views/partials/no-todo.handlebars`, "utf-8")
);

// Filter Configuration
const FILTER_MAP = {
  All: () => true, // Show all todos
  Active: (todo) => !todo.completed, // Show only uncompleted todos
  Completed: (todo) => todo.completed, // Show only completed todos
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

// Route Handlers

// GET / - Main page
app.get("/", async (req, res) => {
  const selectedFilter = req.query.filter ?? "All";
  const todos = await Todo.find().lean(); // Get all todos as plain objects
  const filteredTodos = todos.filter(FILTER_MAP[selectedFilter]);

  res.render("index", {
    partials: { todoInput, todoItem, filterBtns, noTodo },
    todos: filteredTodos,
    filters: FILTER_NAMES.map((filterName) => ({
      filterName,
      count: todos.filter(FILTER_MAP[filterName]).length,
    })),
    selectedFilter,
    noTodos: filteredTodos.length,
  });
});

// POST /todos - Create new todo
app.post("/todos", async (req, res) => {
  const { todo, selectedFilter = "All" } = req.body;

  try {
    const newTodo = new Todo({ name: todo });
    await newTodo.save();

    const todos = await Todo.find();
    const filteredTodos = todos.filter(FILTER_MAP[selectedFilter]);

    // Simulate delay for loading state demo
    setTimeout(() => {
      res.render("index", {
        layouts: false,
        partials: { todoInput, todoItem, filterBtns, noTodo },
        todos: filteredTodos,
        filters: FILTER_NAMES.map((filterName) => ({
          filterName,
          count: todos.filter(FILTER_MAP[filterName]).length,
        })),
        selectedFilter,
        noTodos: filteredTodos.length,
      });
    }, 2000);
  } catch (error) {
    // Handle duplicate todo error
    if (error.code === 11000) {
      return res
        .status(400)
        .send("This todo already exists. Please enter a new one.");
    }
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PATCH /todo/:_id - Toggle todo completion
app.patch("/todo/:_id", async (req, res) => {
  const { _id } = req.params;
  const selectedFilter = req.query.filter ?? "All";
  const { completed } = req.body;

  try {
    const todo = await Todo.findById(_id);
    if (!todo) return res.status(404).send("Todo not found");

    todo.completed = !!completed;
    await todo.save();

    // Re-render page with updated data
    const todos = await Todo.find();
    const filteredTodos = todos.filter(FILTER_MAP[selectedFilter]);

    res.render("index", {
      /* ... render options ... */
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /todos/:_id - Delete todo
app.delete("/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  const selectedFilter = req.query.filter ?? "All";

  try {
    await Todo.findByIdAndDelete(_id);
    const todos = await Todo.find();

    // Re-render only the filter buttons with updated counts
    res.render("partials/filter-buttons", {
      /* ... render options ... */
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /todos/:_id/edit - Get todo edit form
app.get("/todos/:_id/edit", async (req, res) => {
  const { _id } = req.params;
  const selectedFilter = req.query.filter ?? "All";

  try {
    const todo = await Todo.findById(_id).lean();
    if (!todo) return res.status(404).send("Todo not found");

    res.render("partials/todo-item-edit", {
      /* ... render options ... */
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /todos/:_id - Get single todo
app.get("/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  const selectedFilter = req.query.filter ?? "All";

  try {
    const todo = await Todo.findById(_id).lean();
    if (!todo) return res.status(404).send("Todo not found");

    res.render("partials/todo-item", {
      /* ... render options ... */
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /todos/:_id - Update todo
app.put("/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  try {
    const todo = await Todo.findById(_id);
    if (!todo) return res.status(404).send("Todo not found");

    todo.name = name;
    await todo.save();

    res.render("partials/todo-item", {
      /* ... render options ... */
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
