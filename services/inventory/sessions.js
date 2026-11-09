// Sessions service: CRUD and reporting for sessions.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const SessionsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Sessions = mongoose.model('Sessions', SessionsSchema);

async function listSessions(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Sessions.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getSessions(req, res) {
  const row = await Sessions.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createSessions(req, res) {
  const row = new Sessions(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportSessions(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/sessions', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readSessionsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeSessionsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeSessionsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeSessionsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeSessionsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeSessionsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeSessionsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listSessions, getSessions, createSessions, exportSessions, readSessionsTemplate,
  computeSessionsMetric0,
  computeSessionsMetric1,
  computeSessionsMetric2,
  computeSessionsMetric3,
  computeSessionsMetric4,
  computeSessionsMetric5,
};
