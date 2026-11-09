// Schedules service: CRUD and reporting for schedules.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const SchedulesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Schedules = mongoose.model('Schedules', SchedulesSchema);

async function listSchedules(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Schedules.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getSchedules(req, res) {
  const row = await Schedules.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createSchedules(req, res) {
  const row = new Schedules(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportSchedules(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/schedules', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readSchedulesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeSchedulesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeSchedulesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeSchedulesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeSchedulesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeSchedulesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeSchedulesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listSchedules, getSchedules, createSchedules, exportSchedules, readSchedulesTemplate,
  computeSchedulesMetric0,
  computeSchedulesMetric1,
  computeSchedulesMetric2,
  computeSchedulesMetric3,
  computeSchedulesMetric4,
  computeSchedulesMetric5,
};
