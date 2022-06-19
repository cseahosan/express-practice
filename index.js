const express = require('express');
const adminRouter = require('./adminRouter');
const publicRouter = require('./publicRouter');

const app = express();

app.use('/admin', adminRouter);
app.get('/', publicRouter)

app.listen(3000, () => {
    console.log('app listening on port 3000')
})