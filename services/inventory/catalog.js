// Catalog service: CRUD and reporting for catalog.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Catalog = mongoose.model('Catalog', CatalogSchema);

async function listCatalog(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Catalog.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getCatalog(req, res) {
  const row = await Catalog.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createCatalog(req, res) {
  const row = new Catalog(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportCatalog(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/catalog', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readCatalogTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeCatalogMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeCatalogMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeCatalogMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeCatalogMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeCatalogMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeCatalogMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listCatalog, getCatalog, createCatalog, exportCatalog, readCatalogTemplate,
  computeCatalogMetric0,
  computeCatalogMetric1,
  computeCatalogMetric2,
  computeCatalogMetric3,
  computeCatalogMetric4,
  computeCatalogMetric5,
};
