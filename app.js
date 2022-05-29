require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

app.use(express.json({ extended: false }));
app.use('/api/v1/tasks', tasks);
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(` Listening on ${process.env.PORT}`);
});
