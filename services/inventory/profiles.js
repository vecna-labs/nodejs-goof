// Profiles service: CRUD and reporting for profiles.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const ProfilesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Profiles = mongoose.model('Profiles', ProfilesSchema);

async function listProfiles(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Profiles.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getProfiles(req, res) {
  const row = await Profiles.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createProfiles(req, res) {
  const row = new Profiles(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportProfiles(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/profiles', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readProfilesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeProfilesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeProfilesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeProfilesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeProfilesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeProfilesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeProfilesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listProfiles, getProfiles, createProfiles, exportProfiles, readProfilesTemplate,
  computeProfilesMetric0,
  computeProfilesMetric1,
  computeProfilesMetric2,
  computeProfilesMetric3,
  computeProfilesMetric4,
  computeProfilesMetric5,
};
