// Refunds service: CRUD and reporting for refunds.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const RefundsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Refunds = mongoose.model('Refunds', RefundsSchema);

async function listRefunds(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Refunds.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getRefunds(req, res) {
  const row = await Refunds.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createRefunds(req, res) {
  const row = new Refunds(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportRefunds(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/refunds', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readRefundsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeRefundsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeRefundsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeRefundsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeRefundsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeRefundsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeRefundsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listRefunds, getRefunds, createRefunds, exportRefunds, readRefundsTemplate,
  computeRefundsMetric0,
  computeRefundsMetric1,
  computeRefundsMetric2,
  computeRefundsMetric3,
  computeRefundsMetric4,
  computeRefundsMetric5,
};
