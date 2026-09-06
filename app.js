/* ============ MML Academy app logic ============ */
(function () {
  'use strict';
  var LS_PROGRESS = 'mml-academy-progress-v1';
  var LS_THEME = 'mml-academy-theme';

  var state = {
    progress: loadProgress(),
    route: null
  };

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(LS_PROGRESS)) || {}; }
    catch (e) { return {}; }
  }
  function saveProgress() {
    try { localStorage.setItem(LS_PROGRESS, JSON.stringify(state.progress)); } catch (e) {}
  }

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function typeset(node) {
    if (window.renderMathInElement) {
      try {
        renderMathInElement(node, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false,
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option']
        });
      } catch (e) { /* keep going even if one expression fails */ }
    }
  }

  /* ---------- progress ---------- */
  function conceptKey(chId, cId) { return chId + '/' + cId; }
  function isLearned(chId, cId) { return !!state.progress[conceptKey(chId, cId)]; }
  function toggleLearned(chId, cId, on) {
    var k = conceptKey(chId, cId);
    if (on) state.progress[k] = true; else delete state.progress[k];
    saveProgress();
    updateProgressUI();
  }
  function chapterStats(ch) {
    var total = ch.concepts ? ch.concepts.length : 0;
    var done = 0;
    (ch.concepts || []).forEach(function (c) { if (isLearned(ch.id, c.id)) done++; });
    return { done: done, total: total };
  }
  function updateProgressUI() {
    var done = 0, total = 0;
    MML.chapters.forEach(function (ch) {
      var s = chapterStats(ch); done += s.done; total += s.total;
    });
    var pct = total ? Math.round(100 * done / total) : 0;
    var fill = document.getElementById('overall-fill');
    var pctEl = document.getElementById('overall-pct');
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    document.querySelectorAll('.nav-item[data-chap]').forEach(function (a) {
      var ch = MML.chapters.filter(function (c) { return c.id === a.dataset.chap; })[0];
      if (!ch) return;
      var bar = a.querySelector('.nav-bar i');
      var chk = a.querySelector('.nav-check');
      var s = chapterStats(ch);
      if (bar) bar.style.width = (s.total ? Math.round(100 * s.done / s.total) : 0) + '%';
      if (chk) chk.textContent = (s.total && s.done === s.total) ? '✓' : '';
    });
    if (state.route && state.route.page === 'chapter') {
      var chId = state.route.id;
      var box = document.getElementById('chap-progress');
      if (box) {
        var ch = getCh(chId); if (ch) {
          var st = chapterStats(ch);
          box.textContent = st.done + ' / ' + st.total + ' concepts mastered';
        }
      }
      document.querySelectorAll('.learned-toggle input').forEach(function (inp) {
        inp.checked = isLearned(inp.dataset.chap, inp.dataset.cid);
      });
    }
  }
  function getCh(id) {
    return MML.chapters.filter(function (c) { return c.id === id; })[0];
  }
  function getConcept(ch, cid) {
    return (ch.concepts || []).filter(function (c) { return c.id === cid; })[0];
  }

  /* ---------- sidebar ---------- */
  function buildSidebar() {
    var nav = document.getElementById('side-nav');
    nav.innerHTML = '';
    var welcome = el('a', 'nav-item');
    welcome.href = '#/welcome';
    welcome.dataset.page = 'welcome';
    welcome.innerHTML = '<span class="nav-icon">🏠</span><span class="nav-main"><span class="nav-title">Start here</span></span>';
    nav.appendChild(welcome);

    nav.appendChild(el('div', 'nav-group', 'Foundations'));
    MML.chapters.forEach(function (ch, i) {
      if (ch.special === 'roadmap') return;
      if (i === 8) nav.appendChild(el('div', 'nav-group', 'Machine learning'));
      if (i === 12) nav.appendChild(el('div', 'nav-group', 'Beyond'));
      var a = el('a', 'nav-item');
      a.href = '#/' + ch.id;
      a.dataset.chap = ch.id;
      a.dataset.page = 'chapter';
      var s = chapterStats(ch);
      a.innerHTML =
        '<span class="nav-icon">' + (ch.icon || '📘') + '</span>' +
        '<span class="nav-main"><span class="nav-title">' + esc(ch.title) + '</span>' +
        '<div class="nav-bar"><i></i></div></span>' +
        '<span class="nav-check"></span>';
      a.title = 'Chapter ' + ch.num + ' — ' + ch.title;
      nav.appendChild(a);
    });

    var extras = el('div', '');
    extras.innerHTML = '<div class="nav-group">Toolbox</div>';
    [['#/practice', '🏋️', 'Practice arena'], ['#/cheatsheets', '🗝️', 'Formula vault'], ['#/roadmap', '🧭', 'Research roadmap']]
      .forEach(function (p) {
        var a = el('a', 'nav-item'); a.href = p[0]; a.dataset.page = p[0].slice(2);
        a.innerHTML = '<span class="nav-icon">' + p[1] + '</span><span class="nav-main"><span class="nav-title">' + p[2] + '</span></span>';
        extras.appendChild(a);
      });
    nav.appendChild(extras);
  }

  function highlightNav() {
    document.querySelectorAll('.nav-item').forEach(function (a) {
      var on = false;
      if (state.route.page === 'welcome') on = a.dataset.page === 'welcome';
      else if (state.route.page === 'chapter') on = a.dataset.chap === state.route.id;
      else on = a.dataset.page === state.route.page;
      a.classList.toggle('active', on);
    });
  }

  /* ---------- rendering ---------- */
  function crumbs(items) {
    var c = document.getElementById('crumbs');
    c.innerHTML = items.map(function (p, i) {
      return (i ? ' › ' : '') + (p.href ? '<a href="' + p.href + '" style="text-decoration:none">' + esc(p.t) + '</a>' : '<b>' + esc(p.t) + '</b>');
    }).join('');
  }

  function closeSidebarMobile() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-scrim').classList.remove('show');
  }

  function renderLinkChips(ch, c) {
    if (!c.links || !c.links.length) return null;
    var row = el('div', 'links-row');
    c.links.forEach(function (l) {
      var parts = l.split(':');
      var target = getCh(parts[0]);
      if (!target) return;
      var cons = getConcept(target, parts[1]);
      var a = el('a', 'link-chip',
        (target.special === 'roadmap' ? '🧭 ' : 'Ch ' + target.num + ' · ') + esc(cons ? cons.title : parts[1]));
      a.href = '#/' + target.id + '/' + parts[1];
      row.appendChild(a);
    });
    return row.firstChild ? row : null;
  }

  function mathBlock(label, items, icon) {
    var b = el('div', 'block b-math');
    b.appendChild(el('p', 'block-h', (icon || '🧮') + ' ' + label));
    if (typeof items === 'string') {
      b.appendChild(el('div', '', items));
    } else {
      (items || []).forEach(function (m) {
        var d = el('div', 'math-item');
        if (m.h) d.appendChild(el('div', 'math-label', m.h));
        d.appendChild(el('div', '', m.t));
        b.appendChild(d);
      });
    }
    return b;
  }

  function buildByHand(byhand) {
    var b = el('div', 'block b-hand');
    b.appendChild(el('p', 'block-h', '✍️ Solve it by hand'));
    var p = el('div', '', '<span class="hand-problem">' + byhand.problem + '</span>');
    b.appendChild(p);
    var list = el('ol', 'steps');
    var revealed = 0;
    byhand.steps.forEach(function (s, i) {
      var li = el('li', 'step locked');
      li.dataset.idx = i;
      li.innerHTML = '<div class="step-t">' + s.t + '</div><div class="step-d">' + (s.d || '') + '</div>';
      li.querySelector('.step-t').addEventListener('click', function () {
        if (li.classList.contains('locked')) { li.classList.remove('locked'); }
        else { li.classList.add('locked'); }
      });
      list.appendChild(li);
    });
    b.appendChild(list);
    if (byhand.answer) {
      var ans = el('div', 'hand-answer hidden');
      ans.innerHTML = '<span class="ans-t">Answer</span>' + byhand.answer;
      b.appendChild(ans);
    }
    var tip = el('p', 'hand-tip', 'Grab paper & pen. Attempt each numbered step yourself, then click it to check. Trying first is where the learning happens.');
    b.appendChild(tip);
    var actions = el('div', 'hand-actions');
    var btnNext = el('button', 'pill-btn primary', 'Reveal next step');
    var btnAll = el('button', 'pill-btn', 'Reveal all');
    var btnReset = el('button', 'pill-btn', 'Hide all');
    btnNext.addEventListener('click', function () {
      var locked = list.querySelectorAll('.step.locked');
      if (locked.length) { locked[0].classList.remove('locked'); locked[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      if (!list.querySelectorAll('.step.locked').length && byhand.answer) ans.classList.remove('hidden');
    });
    btnAll.addEventListener('click', function () {
      list.querySelectorAll('.step.locked').forEach(function (s) { s.classList.remove('locked'); });
      if (byhand.answer) ans.classList.remove('hidden');
    });
    btnReset.addEventListener('click', function () {
      list.querySelectorAll('.step').forEach(function (s) { s.classList.add('locked'); });
      if (byhand.answer) ans.classList.add('hidden');
    });
    actions.appendChild(btnNext); actions.appendChild(btnAll); actions.appendChild(btnReset);
    b.appendChild(actions);
    return b;
  }

  function conceptCard(ch, c, idx) {
    var card = el('div', 'concept');
    card.id = ch.id + '/' + c.id;
    var head = el('div', 'concept-head');
    head.appendChild(el('div', 'concept-num', String(idx + 1)));
    var t = el('div', '');
    t.appendChild(el('div', 'concept-title', c.title));
    if (c.subtitle) t.appendChild(el('div', 'note', c.subtitle));
    head.appendChild(t);
    var meta = el('div', 'concept-meta');
    var lbl = el('label', 'learned-toggle');
    lbl.innerHTML = '<input type="checkbox" data-chap="' + ch.id + '" data-cid="' + c.id + '"' + (isLearned(ch.id, c.id) ? ' checked' : '') + '> mastered';
    lbl.querySelector('input').addEventListener('change', function (e) {
      toggleLearned(ch.id, c.id, e.target.checked);
      if (e.target.checked && !c._celebrated) {
        c._celebrated = true;
      }
    });
    meta.appendChild(lbl);
    head.appendChild(meta);
    card.appendChild(head);

    var body = el('div', 'concept-body');
    var chips = renderLinkChips(ch, c);
    if (chips) body.appendChild(chips);

    if (c.intuition) {
      var bi = el('div', 'block b-intu');
      bi.appendChild(el('p', 'block-h', '🍰 The intuition — no jargon'));
      bi.appendChild(el('div', '', c.intuition));
      body.appendChild(bi);
    }
    if (c.math) body.appendChild(mathBlock('The mathematics', c.math));
    if (c.ml) {
      var bm = el('div', 'block b-ml');
      bm.appendChild(el('p', 'block-h', '🤖 Where machine learning uses it'));
      bm.appendChild(el('div', '', c.ml));
      body.appendChild(bm);
    }
    if (c.byhand) body.appendChild(buildByHand(c.byhand));
    card.appendChild(body);
    return card;
  }

  function widgetBlock(name) {
    if (!window.MMLWidgets || !MMLWidgets[name]) return null;
    var w = el('div', 'widget');
    var head = el('div', 'widget-head');
    head.appendChild(el('div', 'widget-title', '🕹️ ' + MMLWidgets[name].title));
    head.appendChild(el('div', 'widget-sub', MMLWidgets[name].sub));
    w.appendChild(head);
    var body = el('div', 'widget-body');
    var canvasWrap = el('div', 'widget-canvas-wrap');
    var cv = document.createElement('canvas');
    cv.width = 760; cv.height = 460;
    canvasWrap.appendChild(cv);
    var hint = el('div', 'hint', MMLWidgets[name].hint || '');
    canvasWrap.appendChild(hint);
    body.appendChild(canvasWrap);
    var controls = el('div', 'widget-controls');
    body.appendChild(controls);
    w.appendChild(body);
    w.dataset.widget = name;
    w._canvas = cv;
    w._controls = controls;
    return w;
  }

  function chapterPage(ch) {
    var v = document.getElementById('view');
    v.innerHTML = '';
    var head = el('div', 'page-head');
    head.appendChild(el('div', 'kicker', ch.special === 'roadmap' ? 'Beyond the book' : 'Chapter ' + ch.num + (ch.of ? ' · ' + ch.of : '')));
    head.appendChild(el('h1', 'page-title', (ch.icon ? ch.icon + ' ' : '') + ch.title));
    head.appendChild(el('div', 'tagline', ch.tagline || ''));
    head.appendChild(el('div', 'note', '<span id="chap-progress"></span>'));
    v.appendChild(head);

    if (ch.why) {
      var wb = el('div', 'why-box');
      wb.innerHTML = '<h3>🎯 Why this chapter matters for ML</h3><div>' + ch.why + '</div>' +
        (ch.goals && ch.goals.length
          ? '<ul class="goals">' + ch.goals.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul>'
          : '');
      v.appendChild(wb);
    }

    if (ch.widget) {
      var wb2 = widgetBlock(ch.widget);
      if (wb2) v.appendChild(wb2);
    }

    (ch.concepts || []).forEach(function (c, i) { v.appendChild(conceptCard(ch, c, i)); });

    if (ch.cheatsheet && ch.cheatsheet.length) {
      var cs = el('div', 'concept');
      var csh = el('div', 'concept-head');
      csh.appendChild(el('div', 'concept-num', '🗝️'));
      csh.appendChild(el('div', 'concept-title', 'Chapter ' + ch.num + ' cheat sheet'));
      cs.appendChild(csh);
      var csb = el('div', 'concept-body');
      csb.appendChild(mathBlock('Formulas to memorise (with meaning)', ch.cheatsheet.map(function (f) {
        return { h: f.n, t: f.t };
      }), '🗝️'));
      cs.appendChild(csb);
      v.appendChild(cs);
    }

    if (ch.practice && ch.practice.length) {
      v.appendChild(practiceSection(ch, ch.practice));
    }

    // prev / next
    var bookCh = MML.chapters.filter(function (c) { return c.special !== 'roadmap'; });
    var i = bookCh.indexOf(ch);
    if (i >= 0) {
      var pn = el('div', 'prevnext');
      if (i > 0) {
        var p = bookCh[i - 1];
        pn.appendChild(el('a', '', '<div class="pn-l">← Previous</div><div><b>' + p.icon + ' ' + esc(p.title) + '</b></div>')).href = '#/' + p.id;
      } else pn.appendChild(el('span', '', ''));
      if (i < bookCh.length - 1) {
        var n = bookCh[i + 1];
        pn.appendChild(el('a', 'next', '<div class="pn-l">Next →</div><div><b>' + n.icon + ' ' + esc(n.title) + '</b></div>')).href = '#/' + n.id;
      } else pn.appendChild(el('span', '', ''));
      v.appendChild(pn);
    }

    crumbs([{ t: 'Chapters', href: '#/welcome' }, { t: 'Ch ' + ch.num + ' — ' + ch.title }]);
    updateProgressUI();
  }

  function practiceSection(ch, items) {
    var wrap = el('div', 'concept');
    var h = el('div', 'concept-head');
    h.appendChild(el('div', 'concept-num', '🏋️'));
    h.appendChild(el('div', 'concept-title', 'Chapter ' + ch.num + ' practice set'));
    wrap.appendChild(h);
    var body = el('div', 'concept-body');
    var list = el('div', 'practice-list');
    items.forEach(function (p, i) {
      var it = el('div', 'practice-item');
      var diff = p.diff || 'med';
      var dlabel = diff === 'easy' ? 'warm-up' : diff === 'hard' ? 'challenge' : 'core';
      it.innerHTML = '<div class="pq"><b>P' + (i + 1) + '.</b> ' + p.q + '<span class="diff ' + diff + '">' + dlabel + '</span></div>';
      var sw = el('div', 'sol-wrap hidden');
      var ol = el('ul', 'sol-steps');
      (p.s || []).forEach(function (s) { ol.appendChild(el('li', '', s)); });
      if (p.fin) sw.appendChild(el('div', 'hand-answer', '<span class="ans-t">Final answer</span>' + p.fin));
      sw.appendChild(ol);
      it.appendChild(sw);
      var btn = el('button', 'pill-btn', 'Show solution');
      btn.addEventListener('click', function () {
        sw.classList.toggle('hidden');
        btn.textContent = sw.classList.contains('hidden') ? 'Show solution' : 'Hide solution';
      });
      it.appendChild(btn);
      list.appendChild(it);
    });
    body.appendChild(list);
    wrap.appendChild(body);
    return wrap;
  }

  /* ---------- welcome ---------- */
  function welcomePage() {
    var v = document.getElementById('view');
    v.innerHTML = '';
    var hero = el('div', 'hero');
    hero.innerHTML =
      '<div class="kicker">Your private ML mathematics gym</div>' +
      '<h1>Master the math behind machine learning.<br>One cake-slice at a time. 🍰</h1>' +
      '<p>This app walks you through <b>all 12 chapters</b> of <em>Mathematics for Machine Learning</em> — ' +
      'from vectors to support vector machines — and adds what the book assumes: intuition first, then the real mathematics, ' +
      'then exactly where each idea powers modern ML, then <b>worked problems you solve by hand</b>, step by step.</p>' +
      '<div class="hero-chips"><span>12 chapters</span><span>' +
      MML.chapters.reduce(function (a, c) { return a + (c.concepts ? c.concepts.length : 0); }, 0) +
      '+ concept cards</span><span>step-by-step hand workouts</span><span>interactive demos</span><span>practice sets</span><span>research roadmap</span></div>';
    v.appendChild(hero);

    var loop = el('div', '');
    loop.innerHTML = '<h2 class="page-title" style="font-size:1.4rem">The learning loop (use it for every card)</h2>' +
      '<ol class="step-loop">' +
      '<li><b>🍰 Read the intuition</b><span>Plain-English story first. If you can retell it in one sentence, move on.</span></li>' +
      '<li><b>🧮 Read the mathematics</b><span>Now the same idea, stated the way research papers state it. Symbols get meanings here, not memorisation.</span></li>' +
      '<li><b>🤖 See where ML uses it</b><span>Every formula is mapped to a model: PCA, regression, attention, diffusion, SVM…</span></li>' +
      '<li><b>✍️ Do the By-Hand workout</b><span>Paper + pen. Attempt each numbered step <em>before</em> clicking to reveal. This is the whole game.</span></li>' +
      '<li><b>🏋️ Clear the practice set</b><span>Then hit “mastered”. Progress is saved in your browser.</span></li>' +
      '</ol>';
    v.appendChild(loop);

    var grid = el('div', 'card-grid');
    var bookCh = MML.chapters.filter(function (c) { return c.special !== 'roadmap'; });
    bookCh.forEach(function (ch) {
      var s = chapterStats(ch);
      var card = el('div', 'mini-card');
      card.innerHTML = '<h4>' + ch.icon + ' Ch ' + ch.num + ' · ' + esc(ch.title) + '</h4>' +
        '<p>' + esc(ch.tagline || '') + '</p>' +
        '<p style="margin-top:8px"><a href="#/' + ch.id + '">Open chapter →</a> <span class="note">(' + s.done + '/' + s.total + ' mastered)</span></p>';
      grid.appendChild(card);
    });
    v.appendChild(grid);

    var tools = el('div', 'card-grid');
    tools.innerHTML =
      '<div class="mini-card"><h4>🕹️ Interactive demos</h4><p>Play with gradient descent, least squares, eigenvectors, PCA and EM directly inside the chapters — drag, slide, and watch the math move.</p></div>' +
      '<div class="mini-card"><h4>🗝️ Formula vault</h4><p>Every chapter’s key formulas on one page — perfect for revision the night before an interview or exam.</p><p style="margin-top:8px"><a href="#/cheatsheets">Open vault →</a></p></div>' +
      '<div class="mini-card"><h4>🧭 Research roadmap</h4><p>A staged path from this book to pure-math ML research: analysis, measure theory, convex geometry, kernel methods — with books to read.</p><p style="margin-top:8px"><a href="#/roadmap">Open roadmap →</a></p></div>' +
      '<div class="mini-card"><h4>📖 The source book</h4><p>The full PDF of <em>Mathematics for Machine Learning</em> (free from the authors) — read the matching chapter after each module here.</p><p style="margin-top:8px"><a href="https://mml-book.github.io" target="_blank">Get the official free PDF →</a></p></div>';
    v.appendChild(tools);

    crumbs([{ t: 'Welcome' }]);
  }

  /* ---------- practice arena ---------- */
  function practicePage() {
    var v = document.getElementById('view');
    v.innerHTML = '';
    v.appendChild(el('div', 'page-head',
      '<div class="kicker">Toolbox</div><h1 class="page-title">🏋️ Practice arena</h1>' +
      '<div class="tagline">Every hand-solved exercise in the course, gathered. Filter by chapter; attempt on paper first, then reveal the full solution path.</div>'));
    var chips = el('div', 'filter-row');
    chips.appendChild(el('button', 'filter-chip on', 'All'));
    MML.chapters.filter(function (c) { return (c.practice || []).length; }).forEach(function (ch) {
      var b = el('button', 'filter-chip', ch.icon + ' Ch ' + ch.num);
      b.dataset.chap = ch.id;
      chips.appendChild(b);
    });
    v.appendChild(chips);
    var total = 0;
    MML.chapters.forEach(function (ch) {
      if (!(ch.practice || []).length) return;
      var sec = el('div', '');
      sec.dataset.chap = ch.id;
      sec.appendChild(el('h2', 'page-title', '<span style="font-size:1.1rem">' + ch.icon + ' Chapter ' + ch.num + ' — ' + esc(ch.title) + '</span>'));
      sec.appendChild(practiceSection(ch, ch.practice));
      v.appendChild(sec);
      total += ch.practice.length;
    });
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('.filter-chip'); if (!b) return;
      var isAll = !b.dataset.chap;
      chips.querySelectorAll('.filter-chip').forEach(function (x) { x.classList.toggle('on', x === b); });
      v.querySelectorAll('div[data-chap]').forEach(function (sec) {
        sec.classList.toggle('hidden', !isAll && sec.dataset.chap !== b.dataset.chap);
      });
    });
    crumbs([{ t: 'Welcome', href: '#/welcome' }, { t: 'Practice arena' }]);
  }

  /* ---------- formula vault ---------- */
  function cheatsPage() {
    var v = document.getElementById('view');
    v.innerHTML = '';
    v.appendChild(el('div', 'page-head',
      '<div class="kicker">Toolbox</div><h1 class="page-title">🗝️ Formula vault</h1>' +
      '<div class="tagline">Every formula worth knowing by heart, grouped by chapter. Each entry names what the formula <em>means</em>, not just what it says.</div>'));
    MML.chapters.forEach(function (ch) {
      if (!(ch.cheatsheet || []).length) return;
      var sec = el('div', '');
      sec.appendChild(el('h2', 'page-title', '<span style="font-size:1.1rem">' + ch.icon + ' Chapter ' + ch.num + ' — ' + esc(ch.title) + '</span>'));
      sec.appendChild(mathBlock('', ch.cheatsheet.map(function (f) { return { h: f.n, t: f.t }; }), '🗝️'));
      v.appendChild(sec);
    });
    crumbs([{ t: 'Welcome', href: '#/welcome' }, { t: 'Formula vault' }]);
  }

  /* ---------- roadmap uses chapterPage ---------- */

  /* ---------- search ---------- */
  var searchIndex = null;
  function buildSearchIndex() {
    searchIndex = [];
    MML.chapters.forEach(function (ch) {
      (ch.concepts || []).forEach(function (c) {
        searchIndex.push({
          ch: ch, c: c,
          text: (c.title + ' ' + ch.title + ' ' + stripMath(c.intuition || '') + ' ' + stripMath(c.ml || '')).toLowerCase()
        });
      });
    });
  }
  function stripMath(s) { return String(s).replace(/\$[^$]*\$/g, ' ').replace(/\\\\?\([a-zA-Z0-9{}^_\\ \t=+\-.,*/|()\[\]<>!]*?\\\)/g, ' '); }

  function doSearch(q) {
    var box = document.getElementById('search-results');
    if (!q || q.length < 2) { box.classList.add('hidden'); return; }
    q = q.toLowerCase();
    var hits = searchIndex.filter(function (e) { return e.text.indexOf(q) >= 0; }).slice(0, 12);
    box.innerHTML = hits.length
      ? hits.map(function (e) {
          var pos = e.text.indexOf(q);
          var snip = stripMath(e.text).replace(/\s+/g, ' ');
          var start = Math.max(0, pos - 30);
          var frag = esc(snip.substr(start, 80)).replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '<mark>$&</mark>');
          return '<a class="sr-item" href="#/' + e.ch.id + '/' + e.c.id + '"><div class="sr-title">' + e.ch.icon + ' ' + esc(e.c.title) + '</div>' +
            '<div class="sr-sub">Chapter ' + e.ch.num + ' · ' + esc(e.ch.title) + '</div><div class="sr-hit">…' + frag + '…</div></a>';
        }).join('')
      : '<div class="sr-item"><div class="sr-sub">No matches. Try: eigen, gradient, kernel, Bayes, SVD…</div></div>';
    box.classList.remove('hidden');
  }

  /* ---------- router ---------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/');
    var page = parts[0] || 'welcome';
    state.route = { page: page === 'welcome' ? 'welcome' : (getCh(page) ? 'chapter' : page), id: parts[0], cid: parts[1] };
    closeSidebarMobile();
    document.getElementById('search-results').classList.add('hidden');

    if (page === 'welcome' || !page) { welcomePage(); }
    else if (page === 'practice') { practicePage(); }
    else if (page === 'cheatsheets') { cheatsPage(); }
    else if (page === 'roadmap') {
      var rm = MML.chapters.filter(function (c) { return c.special === 'roadmap'; })[0];
      if (rm) chapterPage(rm); else welcomePage();
    }
    else {
      var ch = getCh(page);
      if (ch) chapterPage(ch); else { welcomePage(); state.route = { page: 'welcome' }; }
    }
    // deep-link to a concept
    if (state.route.cid) {
      var target = document.getElementById(state.route.id + '/' + state.route.cid);
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    } else {
      window.scrollTo(0, 0);
    }
    highlightNav();
  }

  /* ---------- boot ---------- */
  function boot() {
    // theme
    var theme = null;
    try { theme = localStorage.getItem(LS_THEME); } catch (e) {}
    if (theme) applyTheme(theme);

    buildSidebar();
    buildSearchIndex();

    var tbtn = document.getElementById('theme-btn');
    tbtn.addEventListener('click', function () {
      var cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(cur);
    });
    document.getElementById('reset-btn').addEventListener('click', function () {
      if (confirm('Clear all “mastered” progress? This cannot be undone.')) {
        state.progress = {}; saveProgress(); updateProgressUI(); route();
      }
    });
    var menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', function () {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('sidebar-scrim').classList.toggle('show');
    });
    document.getElementById('sidebar-scrim').addEventListener('click', closeSidebarMobile);
    var sin = document.getElementById('search-input');
    sin.addEventListener('input', function () { doSearch(sin.value); });
    sin.addEventListener('focus', function () { if (sin.value.length >= 2) doSearch(sin.value); });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== sin) { e.preventDefault(); sin.focus(); }
      if (e.key === 'Escape') { document.getElementById('search-results').classList.add('hidden'); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#search-wrap')) document.getElementById('search-results').classList.add('hidden');
    });
    window.addEventListener('hashchange', route);

    // instantiate widgets after first render
    var mo = new MutationObserver(function () {
      var host = document.getElementById('view');
      if (!host) return;
      host.querySelectorAll('.widget[data-widget]').forEach(function (w) {
        if (w.dataset.ready) return;
        w.dataset.ready = '1';
        try {
          MMLWidgets[w.dataset.widget].init(w._canvas, w._controls, typeset);
        } catch (e) { console.error('widget init failed', e); }
      });
      typeset(host);
    });
    mo.observe(document.getElementById('view'), { childList: true, subtree: true });

    route();
    updateProgressUI();
  }

  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    document.getElementById('theme-btn').textContent = t === 'dark' ? '☀️ Light' : '🌙 Dark';
    try { localStorage.setItem(LS_THEME, t); } catch (e) {}
    // repaint any live widget
    if (window.MMLWidgets) Object.keys(MMLWidgets).forEach(function (k) {
      if (MMLWidgets[k].repaint) MMLWidgets[k].repaint();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
