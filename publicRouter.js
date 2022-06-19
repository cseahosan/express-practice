const express = require('express');

const publicRouter = express.Router();

const log = (req, res, next) => {
    console.log('I am logging something');
    next();
};

publicRouter.all('*', log)


publicRouter.get('/:user', (req, res) => {
    res.send(`this is home page. Dynamic parameter is ${req.params.user}`);
})

// publicRouter.get('/about', (req, res) => {
//     res.send(`this is about page`);
// })


module.exports = publicRouter