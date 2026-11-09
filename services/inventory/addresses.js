// Addresses service: CRUD and reporting for addresses.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const AddressesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Addresses = mongoose.model('Addresses', AddressesSchema);

async function listAddresses(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Addresses.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getAddresses(req, res) {
  const row = await Addresses.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createAddresses(req, res) {
  const row = new Addresses(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportAddresses(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/addresses', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readAddressesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeAddressesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeAddressesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeAddressesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeAddressesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeAddressesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeAddressesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listAddresses, getAddresses, createAddresses, exportAddresses, readAddressesTemplate,
  computeAddressesMetric0,
  computeAddressesMetric1,
  computeAddressesMetric2,
  computeAddressesMetric3,
  computeAddressesMetric4,
  computeAddressesMetric5,
};
