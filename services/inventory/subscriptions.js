// Subscriptions service: CRUD and reporting for subscriptions.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const SubscriptionsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Subscriptions = mongoose.model('Subscriptions', SubscriptionsSchema);

async function listSubscriptions(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Subscriptions.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getSubscriptions(req, res) {
  const row = await Subscriptions.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createSubscriptions(req, res) {
  const row = new Subscriptions(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportSubscriptions(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/subscriptions', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readSubscriptionsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeSubscriptionsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeSubscriptionsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeSubscriptionsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeSubscriptionsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeSubscriptionsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeSubscriptionsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listSubscriptions, getSubscriptions, createSubscriptions, exportSubscriptions, readSubscriptionsTemplate,
  computeSubscriptionsMetric0,
  computeSubscriptionsMetric1,
  computeSubscriptionsMetric2,
  computeSubscriptionsMetric3,
  computeSubscriptionsMetric4,
  computeSubscriptionsMetric5,
};
