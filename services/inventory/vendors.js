// Vendors service: CRUD and reporting for vendors.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const VendorsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Vendors = mongoose.model('Vendors', VendorsSchema);

async function listVendors(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Vendors.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getVendors(req, res) {
  const row = await Vendors.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createVendors(req, res) {
  const row = new Vendors(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportVendors(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/vendors', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readVendorsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeVendorsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeVendorsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeVendorsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeVendorsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeVendorsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeVendorsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listVendors, getVendors, createVendors, exportVendors, readVendorsTemplate,
  computeVendorsMetric0,
  computeVendorsMetric1,
  computeVendorsMetric2,
  computeVendorsMetric3,
  computeVendorsMetric4,
  computeVendorsMetric5,
};
