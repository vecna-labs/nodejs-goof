// Giftcards service: CRUD and reporting for giftcards.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const GiftcardsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Giftcards = mongoose.model('Giftcards', GiftcardsSchema);

async function listGiftcards(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Giftcards.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getGiftcards(req, res) {
  const row = await Giftcards.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createGiftcards(req, res) {
  const row = new Giftcards(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportGiftcards(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/giftcards', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readGiftcardsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeGiftcardsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeGiftcardsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeGiftcardsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeGiftcardsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeGiftcardsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeGiftcardsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listGiftcards, getGiftcards, createGiftcards, exportGiftcards, readGiftcardsTemplate,
  computeGiftcardsMetric0,
  computeGiftcardsMetric1,
  computeGiftcardsMetric2,
  computeGiftcardsMetric3,
  computeGiftcardsMetric4,
  computeGiftcardsMetric5,
};
