// Returns service: CRUD and reporting for returns.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const ReturnsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Returns = mongoose.model('Returns', ReturnsSchema);

async function listReturns(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Returns.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getReturns(req, res) {
  const row = await Returns.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createReturns(req, res) {
  const row = new Returns(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportReturns(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/returns', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readReturnsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeReturnsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeReturnsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeReturnsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeReturnsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeReturnsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeReturnsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listReturns, getReturns, createReturns, exportReturns, readReturnsTemplate,
  computeReturnsMetric0,
  computeReturnsMetric1,
  computeReturnsMetric2,
  computeReturnsMetric3,
  computeReturnsMetric4,
  computeReturnsMetric5,
};
