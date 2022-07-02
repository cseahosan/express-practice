const express = require('express');
const adminRouter = require('./adminRouter');
const publicRouter = require('./publicRouter');

const app = express();

app.use('/admin', adminRouter);
app.use('/', publicRouter)

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