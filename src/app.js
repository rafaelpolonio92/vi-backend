require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
