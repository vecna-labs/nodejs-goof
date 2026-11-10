const mysql = require('mysql');
const db = mysql.createConnection({host:'localhost'});
module.exports = (req, res) => {
  db.query("UPDATE users SET email='" + req.body.email + "' WHERE id=" + req.body.id, () => res.sendStatus(200));
};
