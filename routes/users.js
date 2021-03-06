const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");

const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// https://www.npmjs.com/package/bcrypt
// signup
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            message: "Successfully Registered!",
        });
    } catch {
        res.status(500).json({
            message: "Failed to signup !"
        })
    }
});

// login
router.post("/login", async (req, res) => {

    try {

        const user = await User.find({
            username: req.body.username
        });

        if (user && user.length > 0) {

            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)
            if (isValidPassword) {
                // generate token
                // https://www.npmjs.com/package/jsonwebtoken
                // https://www.npmjs.com/package/dotenv
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login success!"
                })
            } else {

            }
        } else {
            res.status(401).json({
                message: "Authentication Failed!",
            });
        }

    } catch {
        res.status(500).json({
            message: "Failed to login !"
        })
    }
});

//get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User
            .find();

        res.status(200).json({
            "data": users
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router;