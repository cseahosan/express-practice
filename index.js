const express = require('express');
const mongoose = require("mongoose");

const adminRouter = require('./adminRouter');
const publicRouter = require('./publicRouter');
const todoHandler = require("./routeHandler/todoHandler")

const app = express();
app.use(express.json())

//database connection with mongoose
mongoose
    .connect('mongodb://localhost:27017/todos')
    .then(() => console.log('Connection Successfull'))
    .catch(err => console.log(err))

app.use('/admin', adminRouter);
// app.use('/', publicRouter)
app.use('/todo', todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('app listening on port 3000')
})