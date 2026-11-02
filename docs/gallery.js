// Effects gallery: cards, search, categories, in-view video previews and a combined prompt.
(function () {
  var grid = document.getElementById('grid');
  var chips = document.getElementById('chips');
  var search = document.getElementById('q');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var combo = document.getElementById('combo');
  var comboN = document.getElementById('combo-n');
  var picked = [];
  var activeCat = 'all';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function faDigits(n) { return String(n).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }); }

  function media(file, label) {
    var m = el('div', 'media');
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.poster = 'previews/' + file + '.jpg';
    v.dataset.src = 'previews/' + file + '.mp4';
    v.setAttribute('aria-label', 'پیش‌نمایش افکت ' + label);
    m.appendChild(v);
    return m;
  }

  function card(fx) {
    var c = el('article', 'card');
    c.id = 'fx-' + fx.id;
    c.dataset.cat = fx.cat;
    c.dataset.search = [fx.id, fx.a, fx.fa, CATEGORIES[fx.cat].fa, CATEGORIES[fx.cat].en, fx.n].join(' ').toLowerCase();

    var m = media(fx.id, fx.id);
    m.appendChild(el('span', 'num', '#' + faDigits(fx.n)));
    m.appendChild(el('span', 'cat', CATEGORIES[fx.cat].icon + ' ' + CATEGORIES[fx.cat].fa));
    c.appendChild(m);

    var b = el('div', 'body');
    b.appendChild(el('h3', 'fxname', fx.id));
    b.appendChild(el('p', '', fx.fa));
    if (fx.o.indexOf('images') > -1) b.appendChild(el('span', 'badge', '📁 با اسکرین‌شات ریلزهای خودتان بهتر می‌شود'));
    if (fx.warn) b.appendChild(el('p', 'warn', fx.warn));

    var pre = el('pre');
    pre.appendChild(el('code', '', fx.p));
    b.appendChild(pre);

    var actions = el('div', 'card-actions');
    var add = el('button', 'add-btn', '+ افزودن به ترکیب');
    add.type = 'button';
    add.setAttribute('aria-pressed', 'false');
    add.addEventListener('click', function () { toggle(fx, add); });
    actions.appendChild(add);
    b.appendChild(actions);

    c.appendChild(b);
    return c;
  }

  // ---- render ----
  EFFECTS.forEach(function (fx) { grid.appendChild(card(fx)); });

  var looks = document.getElementById('looks');
  LOOKS.forEach(function (lk) {
    var c = el('article', 'card');
    c.appendChild(media(lk.v, lk.id));
    var b = el('div', 'body');
    b.appendChild(el('h3', 'fxname', lk.id));
    b.appendChild(el('p', '', lk.fa));
    var pre = el('pre');
    pre.appendChild(el('code', '', lk.p));
    b.appendChild(pre);
    c.appendChild(b);
    looks.appendChild(c);
  });

  addCopyButtons(document);

  // ---- categories ----
  var cats = [['all', 'همه', EFFECTS.length]].concat(Object.keys(CATEGORIES).map(function (k) {
    return [k, CATEGORIES[k].icon + ' ' + CATEGORIES[k].fa, EFFECTS.filter(function (f) { return f.cat === k; }).length];
  }));
  cats.forEach(function (c) {
    var btn = el('button', 'chip', c[1]);
    btn.type = 'button';
    btn.dataset.cat = c[0];
    btn.setAttribute('aria-pressed', c[0] === 'all' ? 'true' : 'false');
    btn.appendChild(el('span', 'n', faDigits(c[2])));
    btn.addEventListener('click', function () {
      activeCat = c[0];
      chips.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === btn ? 'true' : 'false'); });
      filter();
    });
    chips.appendChild(btn);
  });

  // ---- search ----
  function normalize(s) {
    return s.toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ')
      .replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); }).trim();
  }
  function filter() {
    var q = normalize(search.value);
    var shown = 0;
    grid.querySelectorAll('.card').forEach(function (c) {
      var ok = (activeCat === 'all' || c.dataset.cat === activeCat) &&
        (!q || normalize(c.dataset.search).indexOf(q) > -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = faDigits(shown) + ' افکت';
    empty.hidden = shown > 0;
  }
  search.addEventListener('input', filter);
  filter();

  // ---- play previews only while visible ----
  var videos = document.querySelectorAll('.media video');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    videos.forEach(function (v) { io.observe(v); });
  } else {
    videos.forEach(function (v) { v.src = v.dataset.src; v.controls = true; });
  }

  // ---- combined prompt ----
  function toggle(fx, btn) {
    var i = picked.indexOf(fx);
    if (i > -1) { picked.splice(i, 1); btn.setAttribute('aria-pressed', 'false'); btn.textContent = '+ افزودن به ترکیب'; }
    else { picked.push(fx); btn.setAttribute('aria-pressed', 'true'); btn.textContent = '✓ در ترکیب'; }
    comboN.textContent = faDigits(picked.length) + ' افکت انتخاب شده';
    combo.hidden = picked.length === 0;
  }
  function comboPrompt() {
    return 'Use the effects skill on my video [drag your video here]. Apply these effects in this order:\n' +
      picked.map(function (fx, i) { return (i + 1) + '. ' + fx.p.replace(/^\/effects /, ''); }).join('\n') +
      '\nBefore rendering, show me check frames and make sure nothing covers my face. Keep my original audio and save the result as a new file next to my video. Don\'t overwrite my original.';
  }
  document.getElementById('combo-copy').addEventListener('click', function () {
    var btn = this;
    copyText(comboPrompt()).then(function () { flash(btn, 'کپی شد ✓', 'کپی پرامپت ترکیبی'); });
  });
  document.getElementById('combo-clear').addEventListener('click', function () {
    picked = [];
    grid.querySelectorAll('.add-btn').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = '+ افزودن به ترکیب'; });
    combo.hidden = true;
  });
})();
