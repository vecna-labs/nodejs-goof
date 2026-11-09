// Taxes service: CRUD and reporting for taxes.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const TaxesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Taxes = mongoose.model('Taxes', TaxesSchema);

async function listTaxes(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Taxes.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getTaxes(req, res) {
  const row = await Taxes.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createTaxes(req, res) {
  const row = new Taxes(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportTaxes(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/taxes', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readTaxesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeTaxesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeTaxesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeTaxesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeTaxesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeTaxesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeTaxesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listTaxes, getTaxes, createTaxes, exportTaxes, readTaxesTemplate,
  computeTaxesMetric0,
  computeTaxesMetric1,
  computeTaxesMetric2,
  computeTaxesMetric3,
  computeTaxesMetric4,
  computeTaxesMetric5,
};
