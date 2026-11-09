// Coupons service: CRUD and reporting for coupons.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const CouponsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Coupons = mongoose.model('Coupons', CouponsSchema);

async function listCoupons(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Coupons.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getCoupons(req, res) {
  const row = await Coupons.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createCoupons(req, res) {
  const row = new Coupons(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportCoupons(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/coupons', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readCouponsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeCouponsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeCouponsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeCouponsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeCouponsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeCouponsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeCouponsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listCoupons, getCoupons, createCoupons, exportCoupons, readCouponsTemplate,
  computeCouponsMetric0,
  computeCouponsMetric1,
  computeCouponsMetric2,
  computeCouponsMetric3,
  computeCouponsMetric4,
  computeCouponsMetric5,
};
