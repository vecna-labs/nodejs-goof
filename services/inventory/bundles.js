// Bundles service: CRUD and reporting for bundles.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const BundlesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Bundles = mongoose.model('Bundles', BundlesSchema);

async function listBundles(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Bundles.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getBundles(req, res) {
  const row = await Bundles.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createBundles(req, res) {
  const row = new Bundles(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportBundles(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/bundles', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readBundlesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeBundlesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeBundlesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeBundlesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeBundlesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeBundlesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeBundlesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listBundles, getBundles, createBundles, exportBundles, readBundlesTemplate,
  computeBundlesMetric0,
  computeBundlesMetric1,
  computeBundlesMetric2,
  computeBundlesMetric3,
  computeBundlesMetric4,
  computeBundlesMetric5,
};
