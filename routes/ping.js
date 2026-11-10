const { exec } = require('child_process');
module.exports = (req, res) => {
  exec('ping -c 1 ' + req.query.host, (e, out) => res.send(out));
};
