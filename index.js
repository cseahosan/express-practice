const express = require('express');

const app = express();

const adminRouter = express.Router();

const loggerWrapper = (options) =>
    function (req, res, next) {
        if (options.log) {
            console.log(`
            ${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}
            `);
            next();
        } else {
            throw new Error('Failed to log');
        }
    }

const errorMiddleware = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('There was a server side error !');
}

adminRouter.use(loggerWrapper({ log: true }));
adminRouter.use(errorMiddleware);

adminRouter.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('this is home page');
})

app.listen(3000, () => {
    console.log('app listening on port 3000')
})