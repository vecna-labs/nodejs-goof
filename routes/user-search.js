const mysql = require('mysql');
const db = mysql.createConnection({host:'localhost'});
module.exports = (req, res) => {
  db.query("SELECT * FROM users WHERE name = '" + req.query.name + "'", (e, r) => res.json(r));
};
