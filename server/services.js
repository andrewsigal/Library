// services.js
const fs = require('fs');
const path = require('path');
// Path to the JSON file for database
const dbFile = path.join(__dirname, 'files', 'libraryData.json');
// Helper functions to read and write the JSON "database"
function readDB() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
  }
  const raw = fs.readFileSync(dbFile, 'utf8');
  return JSON.parse(raw);
}
// Write the entire data array back to the JSON file
function writeDB(dataArray) {
  fs.writeFileSync(dbFile, JSON.stringify(dataArray, null, 2));
}
// Export service functions
module.exports = function(app) {

  // POST
  app.post('/write-data', function(req, res) {
    try {
      const data = readDB();

      const newRecord = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        isbn: req.body.isbn
      };

      data.push(newRecord);
      writeDB(data);

      res.status(200).json({ msg: "SUCCESS" });
    } catch (err) {
      res.status(500).json({ msg: "ERROR", error: err.toString() });
    }
  });

  // GET 
  app.get('/get-data', function(req, res) {
    try {
      const data = readDB();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ msg: "ERROR", error: err.toString() });
    }
  });

  // DELETE 
  app.delete('/delete-record', function(req, res) {
    try {
      const deleteID = req.body.id;
      const data = readDB();

      for (let i = 0; i < data.length; i++) {
        if (String(data[i].id) === String(deleteID)) {
          data.splice(i, 1);
          writeDB(data);
          res.status(200).json({ msg: "SUCCESS" });
          return;
        }
      }
      // error
      res.status(404).json({ msg: "ERROR", error: "ID not found" });
    } catch (err) {
      res.status(500).json({ msg: "ERROR", error: err.toString() });
    }
  });

};
