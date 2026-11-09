// Regions service: CRUD and reporting for regions.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const RegionsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Regions = mongoose.model('Regions', RegionsSchema);

async function listRegions(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Regions.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getRegions(req, res) {
  const row = await Regions.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createRegions(req, res) {
  const row = new Regions(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportRegions(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/regions', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readRegionsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeRegionsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeRegionsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeRegionsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeRegionsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeRegionsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeRegionsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listRegions, getRegions, createRegions, exportRegions, readRegionsTemplate,
  computeRegionsMetric0,
  computeRegionsMetric1,
  computeRegionsMetric2,
  computeRegionsMetric3,
  computeRegionsMetric4,
  computeRegionsMetric5,
};
