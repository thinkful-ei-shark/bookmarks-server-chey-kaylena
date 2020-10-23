const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('./logger');
const bookmarks = require('./dataStore');
// const testUrl = require('./testUrl');
const { PORT } = require('./config');

const bodyParser = express.json();
const bookmarksRouter = express.Router();

bookmarksRouter 
  .route('/bookmarks')
  .get((req,res) => {
    res.status(200).json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const {title, rating, description, url} = req.body;
    //  using declared vars
    console.log(title, rating, description, url);

    if(!title) {
      logger.error('A title is required');
      return res.status(400).send('A title is required');
    }
    if(!rating) {
      logger.error('A rating is required');
      return res.status(400).send('A rating is required');
    }
    if(!description) {
      logger.error('A description is required');
      return res.status(400).send('A description is required');
    }
    if(!url) {
      logger.error('A url is required');
      return res.status(400).send('A url is required');
    }

    // pushing new bookmark to store
    const newBookmark = { id: uuid(), title, rating, url, description };
    bookmarks.push(newBookmark);

    logger.info(`Bookmark with id ${newBookmark.id} created`);
    res
      .status(201)
      .location(`http://localhost:${PORT}/bookmarks/${newBookmark.id}`)
      .json(newBookmark);

  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req,res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(bookmark => bookmark.id === id);

    if (!bookmark){
      logger.error(`Bookmark with the id ${id} cannot be found`);
      return res 
        .status(404)
        .send('The bookmark cannot be found');
    }
    res.json(bookmark);
  })
  .delete((req,res) => {
    const {id} = req.params;

    const bookmarkInd = bookmarks.findIndex((bookmark) => bookmark.id === id);
    console.log(bookmarkInd, id, bookmarks[2]);

    if (bookmarkInd === -1) {
      logger.error(`Bookmark with the id ${id} cannot be found`);
      return res.staus(404).send('Bookmark not found');
    }
    bookmarks.splice(bookmarkInd, 1);
    
    logger.info(`Bookmark with id: ${id} has been deleted`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;



