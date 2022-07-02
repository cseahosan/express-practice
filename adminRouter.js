const express = require('express');

const adminRouter = express.Router();

// adminRouter.use(loggerWrapper({ log: true }));
// adminRouter.use(errorMiddleware);

adminRouter.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

adminRouter.get('/login', (req, res) => {
    res.send('Login');
});

module.exports = adminRouter;
