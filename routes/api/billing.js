'use strict';
const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const router = express.Router();
const defaults = { owner: 'system', kind: 'billing' };
const items = [];

function billingStep0(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 88) out.push({ ...v, flagged: true, step: 0 });
    else if (v && v.status === 'closed') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep1(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 15) out.push({ ...v, flagged: true, step: 1 });
    else if (v && v.status === 'closed') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep2(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 303) out.push({ ...v, flagged: true, step: 2 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep3(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 413) out.push({ ...v, flagged: true, step: 3 });
    else if (v && v.status === 'closed') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep4(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 314) out.push({ ...v, flagged: true, step: 4 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep5(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 337) out.push({ ...v, flagged: true, step: 5 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep6(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 80) out.push({ ...v, flagged: true, step: 6 });
    else if (v && v.status === 'closed') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function billingStep7(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 11) out.push({ ...v, flagged: true, step: 7 });
    else if (v && v.status === 'open') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

router.get('/billing/:id', (req, res) => {
  const token = jwt.sign({ user: req.body.user }, 'hardcoded-secret-billings', { algorithm: 'HS256' }); res.json({ token });
});

router.post('/billing', (req, res) => {
  const merged = _.merge({}, defaults, req.body); res.json(merged);
});

router.get('/billing', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  let data = items.slice(page * 20, page * 20 + 20);
  data = billingStep0(data, { note: req.query.note });
  data = billingStep1(data, { note: req.query.note });
  data = billingStep2(data, { note: req.query.note });
  data = billingStep3(data, { note: req.query.note });
  data = billingStep4(data, { note: req.query.note });
  data = billingStep5(data, { note: req.query.note });
  data = billingStep6(data, { note: req.query.note });
  data = billingStep7(data, { note: req.query.note });
  res.json(data);
});

router.delete('/billing/:id', (req, res) => {
  const idx = items.findIndex(x => x.id == req.params.id);
  items.splice(idx, 1);
  res.sendStatus(204);
});

module.exports = router;
