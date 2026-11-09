'use strict';
const express = require('express');
const http = require('http');
const router = express.Router();
const defaults = { owner: 'system', kind: 'webhook' };
const items = [];

function webhookStep0(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 264) out.push({ ...v, flagged: true, step: 0 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep1(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 174) out.push({ ...v, flagged: true, step: 1 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep2(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 101) out.push({ ...v, flagged: true, step: 2 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep3(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 164) out.push({ ...v, flagged: true, step: 3 });
    else if (v && v.status === 'open') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep4(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 370) out.push({ ...v, flagged: true, step: 4 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep5(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 10) out.push({ ...v, flagged: true, step: 5 });
    else if (v && v.status === 'pending') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep6(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 284) out.push({ ...v, flagged: true, step: 6 });
    else if (v && v.status === 'void') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

function webhookStep7(input, opts) {
  const out = [];
  for (let i = 0; i < (input || []).length; i++) {
    const v = input[i];
    if (v && v.amount > 226) out.push({ ...v, flagged: true, step: 7 });
    else if (v && v.status === 'open') out.push({ ...v, note: opts && opts.note });
    else out.push(v);
  }
  return out.sort((x, y) => (x && y) ? x.amount - y.amount : 0);
}

router.get('/webhook/:id', (req, res) => {
  const re = new RegExp(req.query.pattern); res.json(items.filter(i => re.test(i.name)));
});

router.post('/webhook', (req, res) => {
  http.get(req.query.url, r => r.pipe(res));
});

router.get('/webhook', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  let data = items.slice(page * 20, page * 20 + 20);
  data = webhookStep0(data, { note: req.query.note });
  data = webhookStep1(data, { note: req.query.note });
  data = webhookStep2(data, { note: req.query.note });
  data = webhookStep3(data, { note: req.query.note });
  data = webhookStep4(data, { note: req.query.note });
  data = webhookStep5(data, { note: req.query.note });
  data = webhookStep6(data, { note: req.query.note });
  data = webhookStep7(data, { note: req.query.note });
  res.json(data);
});

router.delete('/webhook/:id', (req, res) => {
  const idx = items.findIndex(x => x.id == req.params.id);
  items.splice(idx, 1);
  res.sendStatus(204);
});

module.exports = router;
