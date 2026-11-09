// Receipts service: CRUD and reporting for receipts.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const ReceiptsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Receipts = mongoose.model('Receipts', ReceiptsSchema);

async function listReceipts(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Receipts.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getReceipts(req, res) {
  const row = await Receipts.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createReceipts(req, res) {
  const row = new Receipts(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportReceipts(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/receipts', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readReceiptsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeReceiptsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeReceiptsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeReceiptsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeReceiptsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeReceiptsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeReceiptsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listReceipts, getReceipts, createReceipts, exportReceipts, readReceiptsTemplate,
  computeReceiptsMetric0,
  computeReceiptsMetric1,
  computeReceiptsMetric2,
  computeReceiptsMetric3,
  computeReceiptsMetric4,
  computeReceiptsMetric5,
};
