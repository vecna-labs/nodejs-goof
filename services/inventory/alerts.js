// Alerts service: CRUD and reporting for alerts.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const AlertsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Alerts = mongoose.model('Alerts', AlertsSchema);

async function listAlerts(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Alerts.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getAlerts(req, res) {
  const row = await Alerts.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createAlerts(req, res) {
  const row = new Alerts(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportAlerts(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/alerts', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readAlertsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeAlertsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeAlertsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeAlertsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeAlertsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeAlertsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeAlertsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listAlerts, getAlerts, createAlerts, exportAlerts, readAlertsTemplate,
  computeAlertsMetric0,
  computeAlertsMetric1,
  computeAlertsMetric2,
  computeAlertsMetric3,
  computeAlertsMetric4,
  computeAlertsMetric5,
};
