const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

//Set Default For LowDB
db.defaults({ user: [] })
  .write();

module.exports = db;
