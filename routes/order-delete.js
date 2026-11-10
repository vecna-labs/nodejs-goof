const mysql = require('mysql');
const db = mysql.createConnection({host:'localhost'});
module.exports = (req, res) => {
  db.query('DELETE FROM orders WHERE id = ' + req.params.id, () => res.sendStatus(204));
};
