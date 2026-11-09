// Orders service: CRUD and reporting for orders.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Orders = mongoose.model('Orders', OrdersSchema);

async function listOrders(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Orders.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getOrders(req, res) {
  const row = await Orders.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createOrders(req, res) {
  const row = new Orders(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportOrders(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/orders', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readOrdersTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeOrdersMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeOrdersMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeOrdersMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeOrdersMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeOrdersMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeOrdersMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listOrders, getOrders, createOrders, exportOrders, readOrdersTemplate,
  computeOrdersMetric0,
  computeOrdersMetric1,
  computeOrdersMetric2,
  computeOrdersMetric3,
  computeOrdersMetric4,
  computeOrdersMetric5,
};
