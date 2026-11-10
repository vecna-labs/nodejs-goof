const fs = require('fs');
module.exports = (req, res) => {
  res.send(fs.readFileSync('/var/app/uploads/' + req.query.file));
};
