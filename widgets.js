/* ============ MML Academy interactive widgets ============ */
window.MMLWidgets = window.MMLWidgets || {};
(function () {
  'use strict';

  /* ---------- shared helpers ---------- */
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function colors() {
    return {
      text: cssVar('--text', '#1c2030'),
      muted: cssVar('--muted', '#5b6273'),
      faint: cssVar('--faint', '#8a90a3'),
      border: cssVar('--border', '#e3e6f0'),
      panel: cssVar('--panel', '#fff'),
      panel2: cssVar('--panel-2', '#fafbff'),
      accent: cssVar('--accent', '#4f46e5'),
      accentSoft: cssVar('--accent-soft', '#eef0ff'),
      good: cssVar('--good', '#0e9f6e'),
      hand: cssVar('--hand', '#be123c'),
      intu: cssVar('--intu', '#b45309'),
      ml: cssVar('--ml', '#047857'),
      prac: cssVar('--prac', '#0369a1')
    };
  }
  function setupCanvas(cv) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (cv.width !== 760 * dpr) { cv.width = 760 * dpr; cv.height = 460 * dpr; }
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }
  function slider(controls, label, min, max, step, val, oninput, fmt) {
    var row = document.createElement('div');
    row.className = 'wc-row';
    var lab = document.createElement('div');
    row.appendChild(lab);
    var inp = document.createElement('input');
    inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step; inp.value = val;
    function upd() { lab.innerHTML = label + ' = <span class="wc-val">' + (fmt ? fmt(+inp.value) : inp.value) + '</span>'; }
    inp.addEventListener('input', function () { upd(); oninput(+inp.value); });
    upd();
    row.appendChild(inp);
    controls.appendChild(row);
    return { input: inp, setLabel: upd };
  }
  function button(controls, text, primary, onclick) {
    var b = document.createElement('button');
    b.className = 'pill-btn' + (primary ? ' primary' : '');
    b.textContent = text;
    b.addEventListener('click', onclick);
    controls.appendChild(b);
    return b;
  }
  function statusBox(controls) {
    var s = document.createElement('div');
    s.className = 'wc-status';
    controls.appendChild(s);
    return s;
  }
  function arrow(ctx, x1, y1, x2, y2, color, width) {
    var ang = Math.atan2(y2 - y1, x2 - x1), h = 8 + 3 * (width || 2);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width || 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - h * Math.cos(ang - 0.42), y2 - h * Math.sin(ang - 0.42));
    ctx.lineTo(x2 - h * Math.cos(ang + 0.42), y2 - h * Math.sin(ang + 0.42));
    ctx.closePath(); ctx.fill();
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* =================================================================
     1. GRADIENT DESCENT on f(x,y) = ½(a x² + b y²)
     ================================================================= */
  MMLWidgets.gd = {
    title: 'Gradient descent playground',
    sub: 'Watch gradient descent descend a loss valley. Make one direction steep (a ≫ b) and see the zig-zag; raise the learning rate η past 1/a and watch it explode.',
    hint: '★ marks the minimum. The trail is the optimizer’s path.',
    init: function (cv, controls) {
      var C = colors();
      var a = 8, b = 1.6, eta = 0.24;
      var start = { x: 2.35, y: -2.1 };
      var trail = [];
      var step = 0, diverged = false;
      var R = 3; // window

      function f(x, y) { return 0.5 * (a * x * x + b * y * y); }
      function grad(x, y) { return { x: a * x, y: b * y }; }

      function reset() { trail = [{ x: start.x, y: start.y }]; step = 0; diverged = false; draw(); }
      function doStep() {
        if (diverged) return;
        var p = trail[trail.length - 1];
        var g = grad(p.x, p.y);
        var q = { x: p.x - eta * g.x, y: p.y - eta * g.y };
        trail.push(q); step++;
        if (Math.abs(q.x) > 12 || Math.abs(q.y) > 12) { diverged = true; }
        draw();
      }
      function run(n) { for (var i = 0; i < n; i++) doStep(); }

      function heat(x, y) { // normalized 0..1 of log(1+f)
        return Math.log(1 + f(x, y)) / Math.log(1 + f(R, R));
      }
      function draw() {
        var ctx = setupCanvas(cv); C = colors();
        var W = 760, H = 460, ox = W / 2, oy = H / 2, S = (W / 2 - 30) / R;
        ctx.fillStyle = C.panel2; ctx.fillRect(0, 0, W, H);
        // heatmap
        var cells = 60;
        for (var i = 0; i < cells; i++) {
          for (var j = 0; j < cells; j++) {
            var x0 = -R + 2 * R * i / cells, y0 = R - 2 * R * (j + 1) / cells;
            var t = heat(x0 + R / cells, y0 + R / cells);
            var c1 = hexToRgb(C.accentSoft), c2 = hexToRgb(C.accent);
            ctx.fillStyle = 'rgba(' + (c1.r + (c2.r - c1.r) * t) + ',' + (c1.g + (c2.g - c1.g) * t) + ',' + (c1.b + (c2.b - c1.b) * t) + ',' + (0.18 + 0.5 * t) + ')';
            ctx.fillRect(ox + x0 * S, oy - (y0 + 2 * R / cells) * S, (2 * R / cells) * S + 1, (2 * R / cells) * S + 1);
          }
        }
        // axes
        ctx.strokeStyle = C.border; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ox, 10); ctx.lineTo(ox, H - 10); ctx.moveTo(10, oy); ctx.lineTo(W - 10, oy); ctx.stroke();
        ctx.fillStyle = C.faint; ctx.font = '12px sans-serif';
        ctx.fillText('w₁', ox + 8, oy - 8); ctx.fillText('w₂', ox + 8, 20);
        // minimum star
        drawStar(ctx, ox, oy, 8, C.good);
        // trail
        if (trail.length) {
          ctx.strokeStyle = C.hand; ctx.lineWidth = 2.2;
          ctx.beginPath();
          trail.forEach(function (p, k) {
            var X = ox + p.x * S, Y = oy - p.y * S;
            if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
          });
          ctx.stroke();
          trail.forEach(function (p, k) {
            var X = ox + p.x * S, Y = oy - p.y * S;
            ctx.fillStyle = k === 0 ? C.muted : C.hand;
            ctx.beginPath(); ctx.arc(X, Y, k === 0 ? 4 : 3, 0, 7); ctx.fill();
          });
          var last = trail[trail.length - 1];
          ctx.fillStyle = C.text; ctx.font = 'bold 13px sans-serif';
          ctx.fillText('step ' + step, 14, 22);
          ctx.font = '12px sans-serif';
          ctx.fillText('f = ' + f(last.x, last.y).toFixed(4), 14, 40);
          ctx.fillText('‖∇f‖ = ' + Math.hypot(grad(last.x, last.y).x, grad(last.x, last.y).y).toFixed(4), 14, 58);
          if (diverged) {
            ctx.fillStyle = C.hand; ctx.font = 'bold 14px sans-serif';
            ctx.fillText('💥 Diverged — η ≥ 1/a means the update overshoots the valley. Lower η!', 14, 84);
          }
        }
        // convergence factors
        ctx.fillStyle = C.muted; ctx.font = '11px sans-serif';
        ctx.fillText('per-step shrink factors |1−ηa| = ' + Math.abs(1 - eta * a).toFixed(2) + '   |1−ηb| = ' + Math.abs(1 - eta * b).toFixed(2) +
          '   (both < 1 ⇒ guaranteed convergence)', 14, H - 12);
      }
      status = statusBox(controls);
      slider(controls, 'curvature a (steep dir.)', 1, 12, 0.1, a, function (v) { a = v; reset(); });
      slider(controls, 'curvature b (flat dir.)', 0.5, 12, 0.1, b, function (v) { b = v; reset(); });
      slider(controls, 'learning rate η', 0.01, 1.2, 0.01, eta, function (v) { eta = v; reset(); });
      var btns = document.createElement('div'); btns.className = 'wc-btns';
      controls.appendChild(btns);
      button(btns, '▶ 1 step', true, function () { doStep(); });
      button(btns, '▶▶ 25 steps', false, function () { run(25); });
      button(btns, '↺ reset', false, function () { reset(); });
      status.innerHTML = 'Every step does <span class="wc-val">w ← w − η∇f(w)</span>. Try a = 10, b = 1: the optimizer races across the valley but crawls along it. That tension <i>is</i> the condition number.';
      var status;
      reset();
      this.repaint = draw;
    }
  };

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16);
    if (isNaN(n)) return { r: 79, g: 70, b: 229 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function drawStar(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var ang = -Math.PI / 2 + i * Math.PI / 5;
      var rr = i % 2 === 0 ? r : r * 0.45;
      var X = x + rr * Math.cos(ang), Y = y + rr * Math.sin(ang);
      i === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
    }
    ctx.closePath(); ctx.fill();
  }

  /* =================================================================
     2. LINEAR REGRESSION — click to add points, closed-form fit
     ================================================================= */
  MMLWidgets.linreg = {
    title: 'Least squares, live',
    sub: 'Click to add data points. The line refits instantly via the normal equations (XᵀX+λI)θ = Xᵀy. Add λ to see ridge regularization shrink the slope toward 0.',
    hint: 'Click: add point · drag a point: move it · the red segments are residuals e = y − ŷ',
    init: function (cv, controls) {
      var C = colors();
      var lam = 0;
      var demo = [{ x: 0.5, y: 1.0 }, { x: 1.2, y: 1.7 }, { x: 2.0, y: 2.1 }, { x: 2.8, y: 3.3 }, { x: 3.6, y: 3.2 }, { x: 4.4, y: 4.5 }];
      var pts = demo.map(function (p) { return { x: p.x, y: p.y }; });
      var showRes = true;
      var W = 760, H = 460, m = 42;
      var XR = [0, 5], YR = [0, 5];
      function px(x) { return m + (x - XR[0]) / (XR[1] - XR[0]) * (W - 2 * m); }
      function py(y) { return H - m - (y - YR[0]) / (YR[1] - YR[0]) * (H - 2 * m); }
      function ux(pxx) { return XR[0] + (pxx - m) / (W - 2 * m) * (XR[1] - XR[0]); }
      function uy(pyy) { return YR[0] + (H - m - pyy) / (H - 2 * m) * (YR[1] - YR[0]); }

      function fit() { // returns {t0, t1, sse, r2}
        var n = pts.length;
        if (n < 2) return null;
        var sx = 0, sy = 0, sxx = 0, sxy = 0, syy = 0;
        pts.forEach(function (p) { sx += p.x; sy += p.y; sxx += p.x * p.x; sxy += p.x * p.y; syy += p.y * p.y; });
        // [[n, sx],[sx, sxx+λ]] θ = [sy, sxy]
        var A11 = n, A12 = sx, A21 = sx, A22 = sxx + lam;
        var det = A11 * A22 - A12 * A21;
        if (Math.abs(det) < 1e-9) return null;
        var t0 = (A22 * sy - A12 * sxy) / det;
        var t1 = (-A21 * sy + A11 * sxy) / det;
        var sse = 0, mean = sy / n;
        var ssTot = syy - n * mean * mean;
        pts.forEach(function (p) { var e = p.y - (t0 + t1 * p.x); sse += e * e; });
        return { t0: t0, t1: t1, sse: sse, r2: ssTot > 0 ? 1 - sse / ssTot : 1 };
      }

      function draw() {
        var ctx = setupCanvas(cv); C = colors();
        ctx.fillStyle = C.panel2; ctx.fillRect(0, 0, W, H);
        // grid
        ctx.strokeStyle = C.border; ctx.fillStyle = C.faint; ctx.font = '11px sans-serif'; ctx.lineWidth = 1;
        for (var g = 0; g <= 5; g++) {
          ctx.beginPath(); ctx.moveTo(px(g), py(0)); ctx.lineTo(px(g), py(5)); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px(0), py(g)); ctx.lineTo(px(5), py(g)); ctx.stroke();
          ctx.fillText(String(g), px(g) - 4, H - m + 16);
          ctx.fillText(String(g), m - 16, py(g) + 4);
        }
        // axes
        ctx.strokeStyle = C.faint;
        ctx.beginPath(); ctx.moveTo(px(0), py(0)); ctx.lineTo(px(5), py(0)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px(0), py(0)); ctx.lineTo(px(0), py(5)); ctx.stroke();
        ctx.fillStyle = C.text; ctx.font = 'bold 12px sans-serif';
        ctx.fillText('x', W - 20, py(0) - 8); ctx.fillText('y', px(0) + 8, 20);

        var ft = fit();
        if (ft) {
          // residuals
          if (showRes) {
            ctx.strokeStyle = C.hand; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]);
            pts.forEach(function (p) {
              ctx.beginPath(); ctx.moveTo(px(p.x), py(p.y)); ctx.lineTo(px(p.x), py(ft.t0 + ft.t1 * p.x)); ctx.stroke();
            });
            ctx.setLineDash([]);
          }
          // line
          ctx.strokeStyle = C.accent; ctx.lineWidth = 2.6;
          ctx.beginPath(); ctx.moveTo(px(0), py(ft.t0)); ctx.lineTo(px(5), py(ft.t0 + ft.t1 * 5)); ctx.stroke();
          ctx.font = '12px sans-serif'; ctx.fillStyle = C.text;
          ctx.fillText('ŷ = ' + ft.t0.toFixed(3) + ' + ' + ft.t1.toFixed(3) + '·x', W - 220, 26);
          ctx.fillStyle = C.muted;
          ctx.fillText('SSE = ' + ft.sse.toFixed(3) + '    R² = ' + ft.r2.toFixed(3), W - 220, 44);
        }
        // points
        pts.forEach(function (p) {
          ctx.fillStyle = C.accent;
          ctx.beginPath(); ctx.arc(px(p.x), py(p.y), 5.5, 0, 7); ctx.fill();
          ctx.fillStyle = C.panel; ctx.beginPath(); ctx.arc(px(p.x), py(p.y), 2.2, 0, 7); ctx.fill();
        });
        if (pts.length < 2) {
          ctx.fillStyle = C.hand; ctx.font = 'bold 13px sans-serif';
          ctx.fillText('Add at least 2 points!', m + 10, m + 20);
        }
        if (lam > 0 && ft) {
          ctx.fillStyle = C.prac; ctx.font = '12px sans-serif';
          ctx.fillText('λ = ' + lam.toFixed(1) + ' (ridge) — slope pulled toward 0', W - 220, 62);
        }
      }

      function hit(pxx, pyy) {
        for (var i = 0; i < pts.length; i++) {
          if (Math.hypot(px(pts[i].x) - pxx, py(pts[i].y) - pyy) < 10) return i;
        }
        return -1;
      }
      var dragging = -1;
      cv.addEventListener('pointerdown', function (e) {
        var r = cv.getBoundingClientRect();
        var X = (e.clientX - r.left) * 760 / r.width, Y = (e.clientY - r.top) * 460 / r.height;
        if (Y < py(5) || Y > py(0) + 30 || X < px(0) - 10 || X > px(5) + 10) return;
        dragging = hit(X, Y);
        if (dragging < 0) { pts.push({ x: ux(X), y: uy(Y) }); draw(); }
      });
      cv.addEventListener('pointermove', function (e) {
        if (dragging < 0) return;
        var r = cv.getBoundingClientRect();
        var X = (e.clientX - r.left) * 760 / r.width, Y = (e.clientY - r.top) * 460 / r.height;
        pts[dragging] = { x: Math.max(0, Math.min(5, ux(X))), y: Math.max(0, Math.min(5, uy(Y))) };
        draw();
      });
      window.addEventListener('pointerup', function () { dragging = -1; });

      var btns = document.createElement('div'); btns.className = 'wc-btns';
      controls.appendChild(btns);
      button(btns, '↺ Demo data', true, function () { pts = demo.map(function (p) { return { x: p.x, y: p.y }; }); draw(); });
      button(btns, '🗑 Clear', false, function () { pts = []; draw(); });
      var resBtn = button(btns, 'Hide residuals', false, function () {
        showRes = !showRes; resBtn.textContent = showRes ? 'Hide residuals' : 'Show residuals'; draw();
      });
      slider(controls, 'ridge λ', 0, 3, 0.1, 0, function (v) { lam = v; draw(); });
      status = statusBox(controls);
      var status;
      status.innerHTML = 'This <b>is</b> the normal equations from Chapter 9, solved live. Pull one point far away and watch how a single outlier drags the least-squares line — sensitivity that ridge λ tames a little.';
      draw();
      this.repaint = draw;
    }
  };

  /* =================================================================
     3. EIGEN EXPLORER — unit circle → A·circle, eigenvectors
     ================================================================= */
  MMLWidgets.eigen = {
    title: 'What a matrix does to space',
    sub: 'The gray circle is the unit circle; the colored ellipse is its image under A. Red arrows are eigenvectors — the directions A only stretches, never rotates.',
    hint: 'Drag the sliders to build your own matrix.',
    init: function (cv, controls) {
      var C = colors();
      var W = 760, H = 460, ox = W / 2, oy = H / 2, S = 62;
      var a = 1.6, bb = 0.9, c = 0.4, d = 1.1;
      function eig() {
        var tr = a + d, dt = ((a - d) / 2) * ((a - d) / 2) + bb * c;
        if (dt >= 0) { var r = Math.sqrt(dt); return { l1: tr / 2 + r, l2: tr / 2 - r, real: true }; }
        return { re: tr / 2, im: Math.sqrt(-dt), real: false };
      }
      function eigVecFor(lam) {
        var cands = [
          { x: bb, y: lam - a },
          { x: lam - d, y: c },
          { x: 1, y: 0 }, { x: 0, y: 1 }
        ];
        for (var i = 0; i < cands.length; i++) {
          var v = cands[i], nrm = Math.hypot(v.x, v.y);
          if (nrm < 1e-6) continue;
          var rx = (a - lam) * v.x + bb * v.y;
          var ry = c * v.x + (d - lam) * v.y;
          if (Math.hypot(rx, ry) < 1e-4) return { x: v.x / nrm, y: v.y / nrm };
        }
        return null;
      }
      function eigVecs() {
        var e = eig(); if (!e.real) return null;
        var vs = [];
        [e.l1, e.l2].forEach(function (lam) {
          var v = eigVecFor(lam);
          if (v) vs.push({ x: v.x, y: v.y, lam: lam });
        });
        return vs;
      }
      function draw() {
        var ctx = setupCanvas(cv); C = colors();
        ctx.fillStyle = C.panel2; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = C.border; ctx.lineWidth = 1;
        for (var g = -6; g <= 6; g++) {
          ctx.beginPath(); ctx.moveTo(ox + g * S, 0); ctx.lineTo(ox + g * S, H); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, oy + g * S); ctx.lineTo(W, oy + g * S); ctx.stroke();
        }
        ctx.strokeStyle = C.faint;
        ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
        // unit circle
        ctx.strokeStyle = C.muted; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
        ctx.beginPath();
        for (var t = 0; t <= 64; t++) {
          var th = t / 64 * 2 * Math.PI;
          var X = ox + S * Math.cos(th), Y = oy - S * Math.sin(th);
          t === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
        }
        ctx.stroke(); ctx.setLineDash([]);
        // transformed ellipse
        ctx.strokeStyle = C.accent; ctx.lineWidth = 2.6;
        ctx.beginPath();
        for (var t2 = 0; t2 <= 128; t2++) {
          var th2 = t2 / 128 * 2 * Math.PI;
          var cx = Math.cos(th2), cy = Math.sin(th2);
          var X2 = ox + S * (a * cx + bb * cy), Y2 = oy - S * (c * cx + d * cy);
          t2 === 0 ? ctx.moveTo(X2, Y2) : ctx.lineTo(X2, Y2);
        }
        ctx.closePath(); ctx.stroke();
        // basis vectors
        ctx.lineWidth = 2;
        arrow(ctx, ox, oy, ox + S * a, oy - S * c, C.ml, 2);
        arrow(ctx, ox, oy, ox + S * bb, oy - S * d, C.intu, 2);
        ctx.fillStyle = C.ml; ctx.font = 'bold 12px sans-serif'; ctx.fillText('Ae₁', ox + S * a + 6, oy - S * c - 4);
        ctx.fillStyle = C.intu; ctx.fillText('Ae₂', ox + S * bb + 6, oy - S * d - 4);
        // eigenvectors
        var ev = eigVecs();
        if (ev) {
          ev.forEach(function (v, i) {
            var len = Math.min(Math.max(Math.abs(v.lam), 0.5), 2.4) * S;
            var dir = v.lam < 0 ? -1 : 1; // point along A·v = λv to show the flip
            arrow(ctx, ox, oy, ox + dir * v.x * len, oy - dir * v.y * len, C.hand, 2.4);
            ctx.fillStyle = C.hand; ctx.font = 'bold 11px sans-serif';
            ctx.fillText('λ' + (i + 1) + '=' + v.lam.toFixed(2), ox + dir * v.x * len + 6, oy - dir * v.y * len + (i ? 14 : -4));
          });
        }
        // status text
        var e = eig(), det = a * d - bb * c, tr = a + d;
        ctx.fillStyle = C.text; ctx.font = 'bold 13px sans-serif';
        ctx.fillText('A = [[ ' + a.toFixed(1) + ', ' + bb.toFixed(1) + ' ], [ ' + c.toFixed(1) + ', ' + d.toFixed(1) + ' ]]', 14, 22);
        ctx.font = '12px sans-serif'; ctx.fillStyle = C.muted;
        ctx.fillText('trace = ' + tr.toFixed(2) + '   det = ' + det.toFixed(2), 14, 40);
        if (e.real) ctx.fillText('real eigenvalues: ' + e.l1.toFixed(2) + ', ' + e.l2.toFixed(2), 14, 58);
        else ctx.fillText('complex eigenvalues: ' + e.re.toFixed(2) + ' ± ' + e.im.toFixed(2) + 'i  (rotation — no real invariant direction)', 14, 58);
      }
      slider(controls, 'a (A₁₁)', -3, 3, 0.1, a, function (v) { a = v; draw(); });
      slider(controls, 'b (A₁₂)', -3, 3, 0.1, bb, function (v) { bb = v; draw(); });
      slider(controls, 'c (A₂₁)', -3, 3, 0.1, c, function (v) { c = v; draw(); });
      slider(controls, 'd (A₂₂)', -3, 3, 0.1, d, function (v) { d = v; draw(); });
      var btns = document.createElement('div'); btns.className = 'wc-btns';
      controls.appendChild(btns);
      button(btns, 'Rotation ⟳', false, function () { a = 0; bb = -1; c = 1; d = 0; syncSliders(); draw(); });
      button(btns, 'Shear ⇉', false, function () { a = 1; bb = 1; c = 0; d = 1; syncSliders(); draw(); });
      button(btns, 'Symmetric ⧅', false, function () { a = 2; bb = 1; c = 1; d = 0.5; syncSliders(); draw(); });
      button(btns, 'Stretch ⤢', false, function () { a = 2.4; bb = 0; c = 0; d = 0.8; syncSliders(); draw(); });
      function syncSliders() {
        controls.querySelectorAll('input[type=range]').forEach(function (inp, i) {
          var vals = [a, bb, c, d]; inp.value = vals[i];
          inp.dispatchEvent(new Event('input'));
        });
      }
      draw();
      this.repaint = draw;
    }
  };

  /* =================================================================
     4. PCA — eigen-axes of a data cloud, projection onto PC1
     ================================================================= */
  MMLWidgets.pca = {
    title: 'PCA: find the data’s skeleton',
    sub: 'The arrows are the eigenvectors of the covariance matrix, scaled by √eigenvalue (= std. dev. along that axis). Project the cloud onto PC1 and 2-D data becomes 1-D with minimal information loss.',
    hint: 'Toggle the projection to see what PCA “keeps”.',
    init: function (cv, controls) {
      var C = colors();
      var W = 760, H = 460, ox = W / 2, oy = H / 2, S = 46;
      var showProj = true, showPC2 = true, seed = 7;
      var pts = [], mu, cov, evals, evecs;
      function gen() {
        var rnd = mulberry32(seed);
        var g = function () {
          var u = rnd() || 1e-9, v = rnd();
          return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        };
        pts = [];
        var n = 90;
        for (var i = 0; i < n; i++) {
          var z1 = g(), z2 = g();
          pts.push({ x: 0.9 + 1.9 * z1 + 0.85 * z2, y: -0.3 + 0.85 * z1 + 0.45 * z2 });
        }
        computePCA();
      }
      function computePCA() {
        var n = pts.length;
        mu = { x: 0, y: 0 };
        pts.forEach(function (p) { mu.x += p.x / n; mu.y += p.y / n; });
        var cxx = 0, cyy = 0, cxy = 0;
        pts.forEach(function (p) {
          var dx = p.x - mu.x, dy = p.y - mu.y;
          cxx += dx * dx / n; cyy += dy * dy / n; cxy += dx * dy / n;
        });
        cov = [[cxx, cxy], [cxy, cyy]];
        var tr = cxx + cyy, dt = ((cxx - cyy) / 2) * ((cxx - cyy) / 2) + cxy * cxy;
        var r = Math.sqrt(Math.max(dt, 0));
        var l1 = tr / 2 + r, l2 = Math.max(tr / 2 - r, 0);
        evals = [l1, l2];
        evecs = [];
        // eigenvector for l1: (cxy, l1 - cxx) normalized (swap if degenerate)
        [[l1, 0], [l2, 1]].forEach(function (pair) {
          var lam = pair[0];
          var v1 = cxy, v2 = lam - cxx;
          if (Math.abs(v1) < 1e-9 && Math.abs(v2) < 1e-9) { v1 = 1; v2 = 0; }
          var nrm = Math.hypot(v1, v2);
          evecs.push({ x: v1 / nrm, y: v2 / nrm, lam: lam });
        });
      }
      function draw() {
        var ctx = setupCanvas(cv); C = colors();
        ctx.fillStyle = C.panel2; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = C.border; ctx.lineWidth = 1;
        for (var g = -6; g <= 6; g++) {
          ctx.beginPath(); ctx.moveTo(ox + g * S, 0); ctx.lineTo(ox + g * S, H); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, oy + g * S); ctx.lineTo(W, oy + g * S); ctx.stroke();
        }
        ctx.strokeStyle = C.faint;
        ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
        var ev1 = evecs[0], ev2 = evecs[1];
        // projection lines onto PC1
        if (showProj) {
          ctx.strokeStyle = C.accent; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
          pts.forEach(function (p) {
            var dx = p.x - mu.x, dy = p.y - mu.y;
            var t = dx * ev1.x + dy * ev1.y; // coordinate along PC1
            var qx = mu.x + t * ev1.x, qy = mu.y + t * ev1.y;
            ctx.beginPath(); ctx.moveTo(ox + p.x * S, oy - p.y * S); ctx.lineTo(ox + qx * S, oy - qy * S); ctx.stroke();
          });
          ctx.setLineDash([]);
        }
        // data
        pts.forEach(function (p) {
          ctx.fillStyle = C.faint;
          ctx.beginPath(); ctx.arc(ox + p.x * S, oy - p.y * S, 3.4, 0, 7); ctx.fill();
        });
        // projected points
        if (showProj) {
          pts.forEach(function (p) {
            var dx = p.x - mu.x, dy = p.y - mu.y;
            var t = dx * ev1.x + dy * ev1.y;
            ctx.fillStyle = C.accent;
            ctx.beginPath(); ctx.arc(ox + (mu.x + t * ev1.x) * S, oy - (mu.y + t * ev1.y) * S, 3.4, 0, 7); ctx.fill();
          });
        }
        // mean
        ctx.fillStyle = C.text;
        ctx.beginPath(); ctx.arc(ox + mu.x * S, oy - mu.y * S, 4.5, 0, 7); ctx.fill();
        // principal axes
        var s1 = Math.sqrt(evals[0]), s2 = Math.sqrt(evals[1]);
        arrow(ctx, ox + mu.x * S, oy - mu.y * S, ox + (mu.x + s1 * ev1.x) * S, oy - (mu.y + s1 * ev1.y) * S, C.hand, 3);
        if (showPC2) arrow(ctx, ox + mu.x * S, oy - mu.y * S, ox + (mu.x + s2 * ev2.x) * S, oy - (mu.y + s2 * ev2.y) * S, C.ml, 2.4);
        ctx.fillStyle = C.hand; ctx.font = 'bold 12px sans-serif';
        ctx.fillText('PC1 (λ₁=' + evals[0].toFixed(2) + ')', ox + (mu.x + s1 * ev1.x) * S + 8, oy - (mu.y + s1 * ev1.y) * S);
        if (showPC2) {
          ctx.fillStyle = C.ml;
          ctx.fillText('PC2 (λ₂=' + evals[1].toFixed(2) + ')', ox + (mu.x + s2 * ev2.x) * S + 8, oy - (mu.y + s2 * ev2.y) * S - 8);
        }
        var keep = 100 * evals[0] / (evals[0] + evals[1]);
        ctx.fillStyle = C.text; ctx.font = 'bold 13px sans-serif';
        ctx.fillText('PC1 alone keeps ' + keep.toFixed(1) + '% of the total variance', 14, 24);
        ctx.font = '12px sans-serif'; ctx.fillStyle = C.muted;
        ctx.fillText('Σ = [[ ' + cov[0][0].toFixed(2) + ', ' + cov[0][1].toFixed(2) + ' ], [ ' + cov[1][0].toFixed(2) + ', ' + cov[1][1].toFixed(2) + ' ]]', 14, 44);
      }
      var chk1 = document.createElement('label');
      chk1.className = 'learned-toggle';
      chk1.innerHTML = '<input type="checkbox" checked> project onto PC1';
      chk1.querySelector('input').addEventListener('change', function (e) { showProj = e.target.checked; draw(); });
      controls.appendChild(chk1);
      var chk2 = document.createElement('label');
      chk2.className = 'learned-toggle';
      chk2.innerHTML = '<input type="checkbox" checked> show PC2';
      chk2.querySelector('input').addEventListener('change', function (e) { showPC2 = e.target.checked; draw(); });
      controls.appendChild(chk2);
      slider(controls, 'data spread', 0.4, 1.6, 0.05, 0.85, function (v) {
        // rescale correlation strength
        corr = v; gen2();
      });
      var corr = 0.85;
      function gen2() {
        var rnd = mulberry32(seed);
        var g = function () {
          var u = rnd() || 1e-9, v = rnd();
          return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        };
        pts = [];
        for (var i = 0; i < 90; i++) {
          var z1 = g(), z2 = g();
          pts.push({ x: 0.9 + 1.9 * z1 + corr * z2, y: -0.3 + corr * z1 + 0.45 * z2 });
        }
        computePCA(); draw();
      }
      var btns = document.createElement('div'); btns.className = 'wc-btns';
      controls.appendChild(btns);
      button(btns, '🎲 New data', false, function () { seed = (seed * 31 + 17) % 100000; gen2(); });
      status = statusBox(controls);
      var status;
      status.innerHTML = 'PCA = <b>eigendecomposition of the covariance matrix</b>, exactly the algebra of Chapter 4 applied to Chapter 6 statistics. The projection loses only the direction of least variance.';
      gen2();
      this.repaint = draw;
    }
  };

  /* =================================================================
     5. GMM / EM (1-D)
     ================================================================= */
  MMLWidgets.gmm = {
    title: 'EM on a mixture of two Gaussians',
    sub: 'Ten data points, two clusters. Each press of “1 EM step” runs one Expectation (soft-assign points) + Maximization (re-fit Gaussians) round. Watch the log-likelihood climb.',
    hint: 'Red = Gaussian 1, blue = Gaussian 2, gray = mixture.',
    init: function (cv, controls) {
      var C = colors();
      var W = 760, H = 460, m = 40;
      var data = [0.2, 0.9, 1.1, 0.4, 1.4, 3.9, 4.6, 5.2, 3.8, 5.4];
      var X0 = -1, X1 = 7, Y1 = 0.62;
      var p;
      var hist = [];
      function px(x) { return m + (x - X0) / (X1 - X0) * (W - 2 * m); }
      function py(y) { return H - m - y / Y1 * (H - 2 * m); }
      function normPdf(x, mu, sig) {
        var z = (x - mu) / sig;
        return Math.exp(-0.5 * z * z) / (sig * Math.sqrt(2 * Math.PI));
      }
      function reset() {
        p = { mu1: 1.0, s1: 1.0, mu2: 4.0, s2: 1.0, pi1: 0.5 };
        hist = [loglik()];
        draw();
      }
      function loglik() {
        var L = 0;
        data.forEach(function (x) {
          L += Math.log(p.pi1 * normPdf(x, p.mu1, p.s1) + (1 - p.pi1) * normPdf(x, p.mu2, p.s2));
        });
        return L;
      }
      function emStep() {
        var n = data.length, r1 = [];
        // E step
        for (var i = 0; i < n; i++) {
          var g1 = p.pi1 * normPdf(data[i], p.mu1, p.s1);
          var g2 = (1 - p.pi1) * normPdf(data[i], p.mu2, p.s2);
          r1.push(g1 / (g1 + g2));
        }
        // M step
        var N1 = r1.reduce(function (a, b) { return a + b; }, 0);
        if (N1 < 1e-6 || N1 > n - 1e-6) return false;
        var mu1 = 0, mu2 = 0;
        for (var j = 0; j < n; j++) { mu1 += r1[j] * data[j]; mu2 += (1 - r1[j]) * data[j]; }
        mu1 /= N1; mu2 /= (n - N1);
        var v1 = 0, v2 = 0;
        for (var k = 0; k < n; k++) { v1 += r1[k] * (data[k] - mu1) * (data[k] - mu1); v2 += (1 - r1[k]) * (data[k] - mu2) * (data[k] - mu2); }
        v1 /= N1; v2 /= (n - N1);
        p = { mu1: mu1, s1: Math.max(Math.sqrt(v1), 0.05), mu2: mu2, s2: Math.max(Math.sqrt(v2), 0.05), pi1: N1 / n };
        hist.push(loglik());
        return true;
      }
      function draw() {
        var ctx = setupCanvas(cv); C = colors();
        ctx.fillStyle = C.panel2; ctx.fillRect(0, 0, W, H);
        // axes
        ctx.strokeStyle = C.faint; ctx.fillStyle = C.faint; ctx.font = '11px sans-serif'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px(X0), py(0)); ctx.lineTo(px(X1), py(0)); ctx.stroke();
        for (var g = 0; g <= 6; g++) { ctx.fillText(String(g), px(g) - 3, py(0) + 16); }
        // histogram (bins of 0.5)
        ctx.fillStyle = C.accentSoft;
        var bins = {};
        data.forEach(function (x) { var b = Math.floor(x / 0.5) * 0.5; bins[b] = (bins[b] || 0) + 1; });
        Object.keys(bins).forEach(function (b) {
          var cnt = bins[b];
          ctx.fillRect(px(+b) + 1, py(cnt / data.length / 0.5), px(+b + 0.5) - px(+b) - 2, py(0) - py(cnt / data.length / 0.5));
        });
        ctx.strokeStyle = C.border;
        Object.keys(bins).forEach(function (b) {
          var cnt = bins[b];
          ctx.strokeRect(px(+b) + 1, py(cnt / data.length / 0.5), px(+b + 0.5) - px(+b) - 2, py(0) - py(cnt / data.length / 0.5));
        });
        // density curves
        function plot(fn, color, width) {
          ctx.strokeStyle = color; ctx.lineWidth = width;
          ctx.beginPath();
          for (var i = 0; i <= 240; i++) {
            var x = X0 + (X1 - X0) * i / 240;
            var y = fn(x);
            i === 0 ? ctx.moveTo(px(x), py(y)) : ctx.lineTo(px(x), py(y));
          }
          ctx.stroke();
        }
        plot(function (x) { return p.pi1 * normPdf(x, p.mu1, p.s1); }, C.hand, 2);
        plot(function (x) { return (1 - p.pi1) * normPdf(x, p.mu2, p.s2); }, C.accent, 2);
        plot(function (x) { return p.pi1 * normPdf(x, p.mu1, p.s1) + (1 - p.pi1) * normPdf(x, p.mu2, p.s2); }, C.muted, 2.4);
        // means
        [p.mu1, p.mu2].forEach(function (mu, i) {
          ctx.strokeStyle = i === 0 ? C.hand : C.accent; ctx.setLineDash([4, 4]);
          ctx.beginPath(); ctx.moveTo(px(mu), py(0)); ctx.lineTo(px(mu), py(0.58)); ctx.stroke();
          ctx.setLineDash([]);
        });
        ctx.fillStyle = C.text; ctx.font = 'bold 12px sans-serif';
        ctx.fillText('N1: μ=' + p.mu1.toFixed(2) + ', σ=' + p.s1.toFixed(2) + ', π=' + p.pi1.toFixed(2), 14, 24);
        ctx.fillStyle = C.accent;
        ctx.fillText('N2: μ=' + p.mu2.toFixed(2) + ', σ=' + p.s2.toFixed(2) + ', π=' + (1 - p.pi1).toFixed(2), 14, 44);
        ctx.fillStyle = C.muted; ctx.font = '12px sans-serif';
        ctx.fillText('log-likelihood: ' + hist.map(function (h, i) { return (i ? ' → ' : '') + h.toFixed(2); }).slice(-4).join(''), 14, 66);
        ctx.fillStyle = C.good; ctx.font = 'bold 12px sans-serif';
        if (hist.length > 1) ctx.fillText('EM guarantees this never decreases ✔', 14, 86);
      }
      var btns = document.createElement('div'); btns.className = 'wc-btns';
      controls.appendChild(btns);
      button(btns, '1 EM step', true, function () { if (emStep()) draw(); });
      button(btns, '10 steps', false, function () { for (var i = 0; i < 10; i++) emStep(); draw(); });
      button(btns, '↺ Reset', false, function () { reset(); });
      status = statusBox(controls);
      var status;
      status.innerHTML = 'Bad starting point? EM converges to a <b>local</b> optimum — the hard truth of latent-variable models (and why we random-restart in practice).';
      reset();
      this.repaint = draw;
    }
  };
})();
