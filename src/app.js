//  Imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bearerToken = require('./validateBearerToken');
const errorHandler = require('./errorHandler');
const BookmarksRouter = require('./bookmarks/BookmarksRouter');
const app = express();

app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
  })
);

// USE
app.use(cors());
app.use(helmet());
app.use(bearerToken);
app.use(BookmarksRouter);

app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
  })
);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);

module.exports = app;
