// router.js
const path = require('path');
// Define routes for serving HTML pages
module.exports = function(app) {
// Route for main library page
  app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'client', 'Library.html'));
  });
// Route for write-data page
  app.get('/write-data', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'client', 'write-data.html'));
  });
// Route for view-data page
  app.get('/view-data', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'client', 'view-data.html'));
  });
// Route for browse-data page
  app.get('/browse-data', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '..', 'client', 'browse-data.html'));
  });

};
