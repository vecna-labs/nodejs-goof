// Exports service: CRUD and reporting for exports.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const ExportsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Exports = mongoose.model('Exports', ExportsSchema);

async function listExports(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Exports.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getExports(req, res) {
  const row = await Exports.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createExports(req, res) {
  const row = new Exports(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportExports(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/exports', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readExportsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeExportsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeExportsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeExportsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeExportsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeExportsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeExportsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listExports, getExports, createExports, exportExports, readExportsTemplate,
  computeExportsMetric0,
  computeExportsMetric1,
  computeExportsMetric2,
  computeExportsMetric3,
  computeExportsMetric4,
  computeExportsMetric5,
};
