// Reviews service: CRUD and reporting for reviews.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Reviews = mongoose.model('Reviews', ReviewsSchema);

async function listReviews(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Reviews.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getReviews(req, res) {
  const row = await Reviews.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createReviews(req, res) {
  const row = new Reviews(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportReviews(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/reviews', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readReviewsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeReviewsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeReviewsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeReviewsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeReviewsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeReviewsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeReviewsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listReviews, getReviews, createReviews, exportReviews, readReviewsTemplate,
  computeReviewsMetric0,
  computeReviewsMetric1,
  computeReviewsMetric2,
  computeReviewsMetric3,
  computeReviewsMetric4,
  computeReviewsMetric5,
};
