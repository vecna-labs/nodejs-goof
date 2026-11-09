// Categories service: CRUD and reporting for categories.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Categories = mongoose.model('Categories', CategoriesSchema);

async function listCategories(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Categories.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getCategories(req, res) {
  const row = await Categories.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createCategories(req, res) {
  const row = new Categories(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportCategories(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/categories', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readCategoriesTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeCategoriesMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeCategoriesMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeCategoriesMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeCategoriesMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeCategoriesMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeCategoriesMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listCategories, getCategories, createCategories, exportCategories, readCategoriesTemplate,
  computeCategoriesMetric0,
  computeCategoriesMetric1,
  computeCategoriesMetric2,
  computeCategoriesMetric3,
  computeCategoriesMetric4,
  computeCategoriesMetric5,
};
