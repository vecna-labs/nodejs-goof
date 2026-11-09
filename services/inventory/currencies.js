// Currencies service: CRUD and reporting for currencies.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const CurrenciesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Currencies = mongoose.model('Currencies', CurrenciesSchema);

async function listCurrencies(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Currencies.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getCurrencies(req, res) {
  const row = await Currencies.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createCurrencies(req, res) {
  const row = new Currencies(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportCurrencies(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/currencies', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readCurrenciesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeCurrenciesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeCurrenciesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeCurrenciesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeCurrenciesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeCurrenciesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeCurrenciesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listCurrencies, getCurrencies, createCurrencies, exportCurrencies, readCurrenciesTemplate,
  computeCurrenciesMetric0,
  computeCurrenciesMetric1,
  computeCurrenciesMetric2,
  computeCurrenciesMetric3,
  computeCurrenciesMetric4,
  computeCurrenciesMetric5,
};
