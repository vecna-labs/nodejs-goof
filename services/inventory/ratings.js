// Ratings service: CRUD and reporting for ratings.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const RatingsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Ratings = mongoose.model('Ratings', RatingsSchema);

async function listRatings(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Ratings.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getRatings(req, res) {
  const row = await Ratings.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createRatings(req, res) {
  const row = new Ratings(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportRatings(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/ratings', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readRatingsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeRatingsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeRatingsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeRatingsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeRatingsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeRatingsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeRatingsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listRatings, getRatings, createRatings, exportRatings, readRatingsTemplate,
  computeRatingsMetric0,
  computeRatingsMetric1,
  computeRatingsMetric2,
  computeRatingsMetric3,
  computeRatingsMetric4,
  computeRatingsMetric5,
};
