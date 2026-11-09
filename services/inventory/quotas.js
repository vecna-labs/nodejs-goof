// Quotas service: CRUD and reporting for quotas.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const QuotasSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Quotas = mongoose.model('Quotas', QuotasSchema);

async function listQuotas(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Quotas.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getQuotas(req, res) {
  const row = await Quotas.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createQuotas(req, res) {
  const row = new Quotas(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportQuotas(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/quotas', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readQuotasTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeQuotasMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeQuotasMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeQuotasMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeQuotasMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeQuotasMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeQuotasMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listQuotas, getQuotas, createQuotas, exportQuotas, readQuotasTemplate,
  computeQuotasMetric0,
  computeQuotasMetric1,
  computeQuotasMetric2,
  computeQuotasMetric3,
  computeQuotasMetric4,
  computeQuotasMetric5,
};
