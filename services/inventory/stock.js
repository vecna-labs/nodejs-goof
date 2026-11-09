// Stock service: CRUD and reporting for stock.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Stock = mongoose.model('Stock', StockSchema);

async function listStock(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Stock.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getStock(req, res) {
  const row = await Stock.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createStock(req, res) {
  const row = new Stock(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportStock(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/stock', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readStockTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeStockMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeStockMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeStockMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeStockMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeStockMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeStockMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listStock, getStock, createStock, exportStock, readStockTemplate,
  computeStockMetric0,
  computeStockMetric1,
  computeStockMetric2,
  computeStockMetric3,
  computeStockMetric4,
  computeStockMetric5,
};
