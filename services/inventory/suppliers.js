// Suppliers service: CRUD and reporting for suppliers.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const SuppliersSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Suppliers = mongoose.model('Suppliers', SuppliersSchema);

async function listSuppliers(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Suppliers.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getSuppliers(req, res) {
  const row = await Suppliers.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createSuppliers(req, res) {
  const row = new Suppliers(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportSuppliers(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/suppliers', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readSuppliersTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeSuppliersMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeSuppliersMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeSuppliersMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeSuppliersMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeSuppliersMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeSuppliersMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listSuppliers, getSuppliers, createSuppliers, exportSuppliers, readSuppliersTemplate,
  computeSuppliersMetric0,
  computeSuppliersMetric1,
  computeSuppliersMetric2,
  computeSuppliersMetric3,
  computeSuppliersMetric4,
  computeSuppliersMetric5,
};
