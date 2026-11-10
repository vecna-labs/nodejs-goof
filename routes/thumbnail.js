const { execSync } = require('child_process');
module.exports = (req, res) => {
  res.send(execSync('convert ' + req.query.src + ' /tmp/out.png').toString());
};
