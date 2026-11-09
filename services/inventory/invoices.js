// Invoices service: CRUD and reporting for invoices.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const InvoicesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Invoices = mongoose.model('Invoices', InvoicesSchema);

async function listInvoices(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Invoices.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getInvoices(req, res) {
  const row = await Invoices.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createInvoices(req, res) {
  const row = new Invoices(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportInvoices(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/invoices', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readInvoicesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeInvoicesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeInvoicesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeInvoicesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeInvoicesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeInvoicesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeInvoicesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listInvoices, getInvoices, createInvoices, exportInvoices, readInvoicesTemplate,
  computeInvoicesMetric0,
  computeInvoicesMetric1,
  computeInvoicesMetric2,
  computeInvoicesMetric3,
  computeInvoicesMetric4,
  computeInvoicesMetric5,
};
