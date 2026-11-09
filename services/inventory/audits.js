// Audits service: CRUD and reporting for audits.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const AuditsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Audits = mongoose.model('Audits', AuditsSchema);

async function listAudits(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Audits.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getAudits(req, res) {
  const row = await Audits.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createAudits(req, res) {
  const row = new Audits(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportAudits(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/audits', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readAuditsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeAuditsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeAuditsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeAuditsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeAuditsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeAuditsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeAuditsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listAudits, getAudits, createAudits, exportAudits, readAuditsTemplate,
  computeAuditsMetric0,
  computeAuditsMetric1,
  computeAuditsMetric2,
  computeAuditsMetric3,
  computeAuditsMetric4,
  computeAuditsMetric5,
};
