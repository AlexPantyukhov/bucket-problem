const express = require('express');
const cors = require('cors');
const { getSolution } = require('./service');

const app = express();
const PORT = 8080;
const PREFIX = '/api';

app.use(cors({ origin: '*' }));

app.get(`${PREFIX}/getSolution`, (req, res) => {
  const steps = getSolution(req.query);
  res.send(steps);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
