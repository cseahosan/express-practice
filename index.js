const express = require('express');

const app = express();

const myMiddleware = (req, res, next) => {
    console.log('I am logging');
    next();
}

app.use(myMiddleware);

app.get('/', (req, res) => {
    res.send('this is home page');
})

app.listen(3000, () => {
    console.log('app listening on port 3000')
})