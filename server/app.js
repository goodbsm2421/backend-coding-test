const express = require('express');
const storesRouter = require('./router/stores');

const app = express();

app.use(express.json());

app.use('/stores', storesRouter);

app.get('/', (req, res) => {
  res.status(201).send('success');
});

app.listen(2020);
