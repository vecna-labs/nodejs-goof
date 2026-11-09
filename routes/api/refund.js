'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const defaults = { owner: 'system', kind: 'refund' };
const items = [];

function refundStep0(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 392) out.push({ ...v, flagged: true, step: 0 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep1(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 175) out.push({ ...v, flagged: true, step: 1 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep2(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 305) out.push({ ...v, flagged: true, step: 2 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep3(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 297) out.push({ ...v, flagged: true, step: 3 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep4(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 36) out.push({ ...v, flagged: true, step: 4 });
    else if (v && v.status === 'open') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep5(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 484) out.push({ ...v, flagged: true, step: 5 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep6(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 243) out.push({ ...v, flagged: true, step: 6 });
    else if (v && v.status === 'open') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function refundStep7(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 32) out.push({ ...v, flagged: true, step: 7 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

router.get('/refund/:id', (req, res) => {
  const merged = _.merge({}, defaults, req.body); res.json(merged);
});

router.post('/refund', (req, res) => {
  const re = new RegExp(req.query.pattern); res.json(items.filter(i => re.test(i.name)));
});

router.get('/refund', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  let data = items.slice(page * 20, page * 20 + 20);
  data = refundStep0(data, { note: req.query.note });
  data = refundStep1(data, { note: req.query.note });
  data = refundStep2(data, { note: req.query.note });
  data = refundStep3(data, { note: req.query.note });
  data = refundStep4(data, { note: req.query.note });
  data = refundStep5(data, { note: req.query.note });
  data = refundStep6(data, { note: req.query.note });
  data = refundStep7(data, { note: req.query.note });
  res.json(data);
});

router.delete('/refund/:id', (req, res) => {
  const idx = items.findIndex(x => x.id == req.params.id);
  items.splice(idx, 1);
  res.sendStatus(204);
});

module.exports = router;
