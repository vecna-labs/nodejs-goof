// Brands service: CRUD and reporting for brands.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const BrandsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Brands = mongoose.model('Brands', BrandsSchema);

async function listBrands(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Brands.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getBrands(req, res) {
  const row = await Brands.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createBrands(req, res) {
  const row = new Brands(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportBrands(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/brands', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readBrandsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeBrandsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeBrandsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeBrandsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeBrandsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeBrandsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeBrandsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listBrands, getBrands, createBrands, exportBrands, readBrandsTemplate,
  computeBrandsMetric0,
  computeBrandsMetric1,
  computeBrandsMetric2,
  computeBrandsMetric3,
  computeBrandsMetric4,
  computeBrandsMetric5,
};
