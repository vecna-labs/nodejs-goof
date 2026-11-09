// Attachments service: CRUD and reporting for attachments.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const AttachmentsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Attachments = mongoose.model('Attachments', AttachmentsSchema);

async function listAttachments(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Attachments.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getAttachments(req, res) {
  const row = await Attachments.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createAttachments(req, res) {
  const row = new Attachments(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportAttachments(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/attachments', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readAttachmentsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeAttachmentsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeAttachmentsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeAttachmentsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeAttachmentsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeAttachmentsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeAttachmentsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listAttachments, getAttachments, createAttachments, exportAttachments, readAttachmentsTemplate,
  computeAttachmentsMetric0,
  computeAttachmentsMetric1,
  computeAttachmentsMetric2,
  computeAttachmentsMetric3,
  computeAttachmentsMetric4,
  computeAttachmentsMetric5,
};
