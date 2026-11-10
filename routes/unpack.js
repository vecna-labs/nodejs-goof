const { exec } = require('child_process');
module.exports = (req, res) => {
  exec('tar -xzf /uploads/' + req.query.archive, (e, out) => res.send(out));
};
