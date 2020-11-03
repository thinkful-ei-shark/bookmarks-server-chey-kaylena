module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'f465be8e-709a-473c-9c33-efda261405d7',
  DB_URL:
    process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/bookmarks',
};
