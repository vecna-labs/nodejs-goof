// Referrals service: CRUD and reporting for referrals.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const ReferralsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Referrals = mongoose.model('Referrals', ReferralsSchema);

async function listReferrals(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Referrals.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getReferrals(req, res) {
  const row = await Referrals.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createReferrals(req, res) {
  const row = new Referrals(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportReferrals(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/referrals', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readReferralsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeReferralsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeReferralsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeReferralsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeReferralsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeReferralsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeReferralsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listReferrals, getReferrals, createReferrals, exportReferrals, readReferralsTemplate,
  computeReferralsMetric0,
  computeReferralsMetric1,
  computeReferralsMetric2,
  computeReferralsMetric3,
  computeReferralsMetric4,
  computeReferralsMetric5,
};
