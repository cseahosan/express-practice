const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//express app initialization
const app = express();
dotenv.config();
app.use(express.json());

const adminRouter = require('./adminRouter');
// const publicRouter = require('./publicRouter');
const todoHandler = require("./routes/todos");
const userHandler = require("./routes/users");
const vehicleHandler = require("./routes/vehicles");

//database connection with mongoose
mongoose
    .connect('mongodb://0.0.0.0:27017/todos')
    .then(() => console.log('Connection Successfull'))
    .catch(err => console.log(err))

app.use(cors())


app.use('/admin', adminRouter);
// app.use('/', publicRouter)
app.use('/vehicles', vehicleHandler);
app.use('/todo', todoHandler);
app.use('/users', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler)

app.listen(8081, () => {
    console.log('app listening on port 8081')
})