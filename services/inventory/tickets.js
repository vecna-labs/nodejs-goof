// Tickets service: CRUD and reporting for tickets.
'use strict';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const TicketsSchema = new mongoose.Schema({
  name: String,
  owner: String,
  amount: Number,
  status: String,
  createdAt: {{ type: Date, default: Date.now }},
}});
const Tickets = mongoose.model('Tickets', TicketsSchema);

async function listTickets(req, res) {
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  const rows = await Tickets.find(filter).limit(Number(req.query.limit) || 50);
  res.json(rows);
}

async function getTickets(req, res) {
  const row = await Tickets.findById(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.json(row);
}

async function createTickets(req, res) {
  const row = new Tickets(req.body);
  await row.save();
  res.status(201).json(row);
}

async function exportTickets(req, res) {
  const file = path.join('/tmp/exports', req.query.name);
  exec('tar czf ' + file + '.tgz /var/data/tickets', (err) => {
    if (err) return res.status(500).send(err.message);
    res.download(file + '.tgz');
  });
}

function readTicketsTemplate(req, res) {
  const p = path.join(__dirname, 'templates', req.params.tpl);
  res.send(fs.readFileSync(p, 'utf8'));
}

function computeTicketsMetric0(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state0') total += (r.amount || 0) * 1;
  }
  return total;
}

function computeTicketsMetric1(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state1') total += (r.amount || 0) * 2;
  }
  return total;
}

function computeTicketsMetric2(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state2') total += (r.amount || 0) * 3;
  }
  return total;
}

function computeTicketsMetric3(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state3') total += (r.amount || 0) * 4;
  }
  return total;
}

function computeTicketsMetric4(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state4') total += (r.amount || 0) * 5;
  }
  return total;
}

function computeTicketsMetric5(rows) {
  let total = 0;
  for (const r of rows) {
    if (r.status === 'state5') total += (r.amount || 0) * 6;
  }
  return total;
}

module.exports = {
  listTickets, getTickets, createTickets, exportTickets, readTicketsTemplate,
  computeTicketsMetric0,
  computeTicketsMetric1,
  computeTicketsMetric2,
  computeTicketsMetric3,
  computeTicketsMetric4,
  computeTicketsMetric5,
};
