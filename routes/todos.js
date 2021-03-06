const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const userSchema = require("../schemas/userSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../middlewares/checkLogin");

// get all the todos
router.get('/', checkLogin, (req, res) => {
    Todo.find({ status: "active" })
        // .populate("user")
        .populate("user", "name username -_id")
        .select({
            _id: 0,
            date: 0
        })
        // .limit(2)
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error !"
                });
            } else {
                res.status(200).json({
                    result: data,
                    message: "Todo retrieved successfully !"
                })
            }
        })
});

// get active todos
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive().select({
        _id: 0,
        date: 0
    })
    res.status(200).json({
        data
    })
});

// get active todos using callback
router.get('/active-callback', (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        res.status(200).json({
            data
        })
    })
});

// get filtered by js todos
router.get('/js', async (req, res) => {
    const data = await Todo.findByJS().select({
        _id: 0,
        date: 0
    })
    res.status(200).json({
        data
    })
});

// get todos by language
router.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage("js");
    res.status(200).json({
        data
    })
});


// GET A TODO by ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id });
        res.status(200).json({
            result: data,
            message: "Success",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// POST A TODO
router.post("/", checkLogin, async (req, res) => {
    try {
        const newTodo = new Todo({
            ...req.body,
            user: req.userId
        });

        const todo = await newTodo.save();
        await User.updateOne({
            _id: req.userId
        }, {
            $push: {
                todos: todo._id
            }
        })
        res.status(200).json({
            message: "Todo was inserted successfully!",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
});

// POST MULTIPLE TODO
router.post("/all", (req, res) => {
    Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Todos were inserted successfully!",
            });
        }
    });
});

// PUT TODO
router.put("/:id", (req, res) => {
    const result = Todo.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                status: "active",
            },
        },
        {
            new: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Todo was updated successfully!",
                });
            }
        }
    );
    console.log(result);
});

// DELETE TODO
router.delete("/:id", (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Todo was deleted successfully!",
            });
        }
    });
});

module.exports = router;