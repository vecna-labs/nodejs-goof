module.exports = (req, res) => {
  res.json({ result: eval(req.body.expr) });
};
