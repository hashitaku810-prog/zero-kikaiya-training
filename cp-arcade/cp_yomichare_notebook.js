/* よみチャレ！漢字帳 Ver.1.0 — learning notes stored only on this device. */
(() => {
  'use strict';
  const STORE_KEY = 'hashimoto-yomichare-kanjicho-v1';
  const PAGE_SIZE = 12;
  let catalog = [], byId = new Map(), records = Object.create(null);
  let ready = false, openedBefore = false, launcher = null, previousOverflow = '';
  const ui = {filter: 'seen', level: 'all', query: '', page: 1, revealed: new Set()};
  const $ = id => document.getElementById(id);

  const styleText = [
    '.yn-overlay{position:fixed;inset:0;z-index:140;background:#071327ef;backdrop-filter:blur(9px);display:grid;place-items:center;padding:8px;color:#f5f8ff}',
    '.yn-overlay[hidden]{display:none!important}',
    '.yn-panel{width:min(100%,540px);max-height:95dvh;overflow-y:auto;background:linear-gradient(160deg,#233e54,#0e243b);border:1px solid #678a97;border-radius:18px;padding:15px 13px 18px;box-shadow:0 22px 65px #000b;overscroll-behavior:contain}',
    '.yn-head{display:flex;align-items:center;justify-content:space-between;gap:10px}',
    '.yn-head small{display:block;color:#8fe4d7;font-weight:900;font-size:10px;letter-spacing:.1em}',
    '.yn-head h2{font-size:25px;color:#ffe3ac;margin:1px 0 0;line-height:1.3}',
    '.yn-close{border:1px solid #6b8ea0;background:#19374c;border-radius:10px;color:#e9f6f5;min-height:39px;padding:8px 11px;font-size:12px;font-weight:850}',
    '.yn-intro{font-size:11px;line-height:1.6;color:#b7d0df;margin:8px 0 7px}',
    '.yn-count{padding:9px 10px;border-radius:10px;background:#102f43;color:#eff8fb;font-size:12px;font-weight:850;margin:0 0 10px}',
    '.yn-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:8px 0}',
    '.yn-tabs button{min-width:0;min-height:41px;border:1px solid #54788a;background:#17374f;color:#d8eaf1;border-radius:9px;padding:5px 2px;font-size:11px;font-weight:850}',
    '.yn-tabs button[aria-pressed=true]{background:#29665f;color:#fff2c8;border-color:#a9e3c9}',
    '.yn-controls{display:flex;gap:6px;margin:9px 0}',
    '.yn-controls input,.yn-controls select{min-height:42px;height:42px;border-radius:10px;border:1px solid #a6c6d3;background:#e9f5fb;color:#1a3546;font-size:13px;font-weight:800;padding:7px 9px;min-width:0}',
    '.yn-controls input{flex:1;width:48%;}.yn-controls select{flex:0 0 39%;width:39%}',
    '.yn-status{margin:6px 1px 7px;color:#b4d1da;font-size:11px;font-weight:800;line-height:1.5}',
    '.yn-list{display:grid;gap:8px}.yn-card{background:#122d42;border:1px solid #3b6878;border-radius:13px;padding:11px 12px}',
    '.yn-wordline{display:flex;justify-content:space-between;align-items:start;gap:8px}',
    '.yn-word{font-family:"Yu Mincho","Noto Serif JP",serif;font-weight:950;font-size:clamp(25px,7vw,34px);line-height:1.3;color:#ffebc6;overflow-wrap:anywhere}',
    '.yn-tag{display:inline-block;border-radius:99px;padding:3px 7px;font-size:10px;font-weight:900;color:#d4f8e9;background:#285448;white-space:nowrap}',
    '.yn-tag.weak{background:#70444c;color:#ffe3df}.yn-tag.unseen{background:#2b4356;color:#cbd9e4}',
    '.yn-meta{color:#9ebdcc;font-size:10px;font-weight:800;margin:5px 0}',
    '.yn-meaning{font-size:12px;line-height:1.55;color:#e1ebf0;margin:7px 0 8px}',
    '.yn-reading{background:#0a4450;border-radius:8px;color:#adf7e6;font-size:17px;line-height:1.5;font-weight:900;padding:7px 9px;margin:7px 0}',
    '.yn-actions{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}',
    '.yn-actions button{flex:1 1 auto;min-height:35px;border:1px solid #5d8392;border-radius:8px;background:#20455a;color:#f1f8f9;font-size:11px;font-weight:850;padding:6px 8px}',
    '.yn-actions .yn-fav[aria-pressed=true]{background:#71512f;border-color:#e7b976;color:#ffe9bc}',
    '.yn-actions .yn-review[aria-pressed=true]{background:#315a50;border-color:#87d8ae}',
    '.yn-more{display:block;width:100%;margin-top:12px;min-height:42px;background:#214a60;border:1px solid #6694a3;border-radius:10px;color:#e8f8f8;font-size:12px;font-weight:900}',
    '.yn-more[hidden]{display:none!important}.yn-empty{padding:18px 10px;text-align:center;background:#152e42;border:1px dashed #567687;border-radius:12px;color:#c2d4e1;font-size:12px;line-height:1.7}',
    '.yn-launch{display:block;width:100%;min-height:36px;margin:7px 0 0;border:1px solid #7fa9a6;border-radius:10px;background:#183e51;color:#e4fff2;font-size:12px;font-weight:900;padding:6px}',
    '.yn-save-error{color:#ffb5a7;font-size:11px;margin:6px 0}',
    '@media(max-width:380px){.yn-panel{padding:11px 9px}.yn-head h2{font-size:23px}.yn-tabs button{font-size:10px}.yn-actions button{font-size:10px;padding:5px}.yn-intro{font-size:10px}}',
    '@media(max-height:560px){.yn-panel{max-height:98dvh}.yn-head h2{font-size:21px}.yn-intro{margin:4px 0}}'
  ].join('\n');

  function idFor(level, word) { return String(level) + '|' + word; }
  function cleanNumber(v) { const n = Number(v); return Number.isFinite(n) && n > 0 ? Math.min(1000000, Math.floor(n)) : 0; }
  function load() {
    try {
      const obj = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      const raw = obj && typeof obj === 'object' && obj.entries && typeof obj.entries === 'object' ? obj.entries : {};
      for (const item of catalog) {
        const src = Object.prototype.hasOwnProperty.call(raw, item.id) ? raw[item.id] : null;
        if (!src || typeof src !== 'object') continue;
        records[item.id] = {
          seen: cleanNumber(src.seen), correct: cleanNumber(src.correct), missed: cleanNumber(src.missed),
          review: src.review === true, star: src.star === true,
          cleanStreak: Math.min(2, cleanNumber(src.cleanStreak)),
          updated: Number.isFinite(Number(src.updated)) ? Math.max(0, Math.floor(Number(src.updated))) : 0
        };
      }
    } catch (err) { /* private browsing may disable storage */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({version: 1, entries: records})); $('ynSaveError').hidden = true; }
    catch (err) { $('ynSaveError').hidden = false; }
  }
  function entry(id) {
    if (!records[id]) records[id] = {seen: 0, correct: 0, missed: 0, review: false, star: false, cleanStreak: 0, updated: 0};
    return records[id];
  }
  function countStats() {
    let seen = 0, weak = 0, star = 0;
    for (const item of catalog) {
      const r = records[item.id];
      if (r?.seen > 0) seen++;
      if (r?.review) weak++;
      if (r?.star) star++;
    }
    return {seen, weak, star};
  }
  function makeButton(label, action, index, cls) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = label; b.dataset.action = action;
    b.dataset.index = String(index); if (cls) b.className = cls;
    return b;
  }
  function makeCard(item) {
    const r = records[item.id], card = document.createElement('article');
    card.className = 'yn-card';
    const top = document.createElement('div'); top.className = 'yn-wordline';
    const word = document.createElement('div'); word.className = 'yn-word'; word.textContent = item.word;
    const tag = document.createElement('span'); tag.className = 'yn-tag' + (r?.review ? ' weak' : r?.seen ? '' : ' unseen');
    tag.textContent = r?.review ? '要復習' : r?.seen ? '学習中' : '未出題';
    top.append(word, tag);
    const meta = document.createElement('p'); meta.className = 'yn-meta';
    meta.textContent = 'LEVEL ' + item.level + ' · ' + item.levelName +
      (r?.seen ? ' · 出題' + r.seen + '回 / 正解' + r.correct + '回 / つまずき' + r.missed + '回' : '');
    const meaning = document.createElement('p'); meaning.className = 'yn-meaning'; meaning.textContent = '💡 ' + item.meaning;
    card.append(top, meta, meaning);
    if (ui.revealed.has(item.id)) {
      const reading = document.createElement('p'); reading.className = 'yn-reading';
      reading.textContent = '読み：' + item.readings.join(' ／ ');
      card.append(reading);
    }
    const actions = document.createElement('div'); actions.className = 'yn-actions';
    actions.append(
      makeButton(ui.revealed.has(item.id) ? '🙈 読みを隠す' : '👀 答えを見る', 'reveal', item.index),
      makeButton(r?.star ? '★ お気に入り' : '☆ お気に入り', 'star', item.index, 'yn-fav'),
      makeButton(r?.review ? '✓ 覚えた' : '↺ 復習に追加', 'review', item.index, 'yn-review')
    );
    actions.children[1].setAttribute('aria-pressed', r?.star ? 'true' : 'false');
    actions.children[2].setAttribute('aria-pressed', r?.review ? 'true' : 'false');
    card.append(actions);
    return card;
  }
  function render() {
    if (!ready) return;
    const stats = countStats();
    $('ynCount').textContent = '出会った ' + stats.seen + ' / ' + catalog.length + '語　｜　要復習 ' + stats.weak + '語　｜　★ ' + stats.star + '語';
    const labels = {seen: '出会った (' + stats.seen + ')', review: '苦手 (' + stats.weak + ')',
      star: '★ (' + stats.star + ')', all: 'すべて (' + catalog.length + ')'};
    for (const b of document.querySelectorAll('#ynTabs button')) {
      b.textContent = labels[b.dataset.filter];
      b.setAttribute('aria-pressed', String(ui.filter === b.dataset.filter));
    }
    const q = ui.query.trim().normalize('NFKC').toLowerCase();
    const arr = catalog.filter(item => {
      const r = records[item.id];
      if (ui.level !== 'all' && String(item.level) !== ui.level) return false;
      if (ui.filter === 'seen' && !(r?.seen > 0)) return false;
      if (ui.filter === 'review' && !r?.review) return false;
      if (ui.filter === 'star' && !r?.star) return false;
      return !q || (item.word + item.readings.join(' ') + item.meaning + item.levelName).normalize('NFKC').toLowerCase().includes(q);
    });
    if (ui.filter === 'seen') arr.sort((a,b) => (records[b.id]?.updated || 0) - (records[a.id]?.updated || 0));
    if (ui.filter === 'review') arr.sort((a,b) => (records[b.id]?.missed || 0) - (records[a.id]?.missed || 0) || (records[b.id]?.updated || 0) - (records[a.id]?.updated || 0));
    if (ui.filter === 'star') arr.sort((a,b) => (records[b.id]?.updated || 0) - (records[a.id]?.updated || 0));
    const visible = arr.slice(0, ui.page * PAGE_SIZE), frag = document.createDocumentFragment();
    if (!visible.length) {
      const empty = document.createElement('div'); empty.className = 'yn-empty';
      empty.textContent = ui.filter === 'seen' && !q ? 'まだ出会った漢字がないで。ゲームで問題を解くと自動で増えていくよ！ 「すべて」から700語の一覧も見られるで。' : '該当する漢字はありません。検索や表示条件を変えてみてな。';
      frag.append(empty);
    } else for (const item of visible) frag.append(makeCard(item));
    $('ynList').replaceChildren(frag);
    $('ynStatus').textContent = arr.length + '語中 ' + visible.length + '語を表示 · 漢字と意味を見て、読みを思い出そう！';
    $('ynMore').hidden = arr.length <= visible.length;
    $('ynMore').textContent = 'さらに表示（残り ' + Math.max(0,arr.length-visible.length) + '語）';
  }
  function open(button) {
    if (!ready) return;
    launcher = button || document.activeElement;
    if (!openedBefore) {
      openedBefore = true; ui.filter = 'seen'; ui.page = 1;
    }
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    $('ynOverlay').hidden = false;
    render();
    $('ynClose').focus({preventScroll:true});
  }
  function close() {
    $('ynSearch').blur(); $('ynOverlay').hidden = true;
    document.body.style.overflow = previousOverflow;
    if (launcher?.focus) launcher.focus({preventScroll:true});
  }
  function init(levels, extra) {
    if (ready || !Array.isArray(levels)) return;
    catalog = []; byId = new Map(); records = Object.create(null);
    for (let i = 0; i < levels.length; i++) {
      const base = Array.isArray(levels[i].words) ? levels[i].words : [];
      const extras = Array.isArray(extra?.[i]) ? extra[i].map(w => [w[0], w[1], w[2]]) : [];
      for (const raw of base.concat(extras)) {
        const word = String(raw[0] || ''), readings = Array.isArray(raw[1]) ? raw[1].map(String) : String(raw[1] || '').split('/');
        const id = idFor(i+1, word);
        if (!word || byId.has(id)) continue;
        const item = {id, index: catalog.length, level: i+1, levelName: levels[i].name, word,
          readings, meaning: String(raw[2] || '')};
        catalog.push(item); byId.set(id, item);
      }
    }
    const css = document.createElement('style');
    css.id = 'ynNotebookStyle'; css.textContent = styleText; document.head.append(css);
    const overlay = document.createElement('div');
    overlay.id = 'ynOverlay'; overlay.className = 'yn-overlay'; overlay.hidden = true;
    overlay.innerHTML = [
      '<section class="yn-panel" role="dialog" aria-modal="true" aria-labelledby="ynTitle">',
      '<header class="yn-head"><div><small>YOMICHARE STUDY NOTE</small><h2 id="ynTitle">📖 漢字帳</h2></div>',
      '<button id="ynClose" class="yn-close" type="button">✕ 閉じる</button></header>',
      '<p class="yn-intro">出題された漢字を自動記録。間違えた漢字は「苦手」に追加。答えを隠して復習できるよ！ 記録はこの端末だけに保存。</p>',
      '<p class="yn-count" id="ynCount"></p>',
      '<div id="ynTabs" class="yn-tabs" role="group" aria-label="漢字帳の表示切替">',
      '<button type="button" data-filter="seen">出会った</button>',
      '<button type="button" data-filter="review">苦手</button>',
      '<button type="button" data-filter="star">★</button>',
      '<button type="button" data-filter="all">すべて</button></div>',
      '<div class="yn-controls"><input id="ynSearch" type="search" placeholder="漢字・読み・意味で検索" aria-label="漢字帳を検索" autocomplete="off">',
      '<select id="ynLevel" aria-label="レベルを絞り込み"><option value="all">全レベル</option></select></div>',
      '<p id="ynStatus" class="yn-status" aria-live="polite"></p><div id="ynList" class="yn-list"></div>',
      '<button id="ynMore" class="yn-more" type="button" hidden>さらに表示</button>',
      '<p id="ynSaveError" class="yn-save-error" hidden>端末に記録を保存できません。ブラウザの保存設定を確認してください。</p>',
      '</section>'
    ].join('');
    document.body.append(overlay);
    levels.forEach((level, i) => {
      const option = document.createElement('option'); option.value = String(i+1);
      option.textContent = 'LEVEL ' + (i+1) + ' · ' + level.name;
      $('ynLevel').append(option);
    });
    for (const [anchorId, label] of [['startGame','📖 漢字帳を見る'],['finalClose','📖 漢字帳で復習する']]) {
      const anchor = $(anchorId);
      if (!anchor) continue;
      const b = document.createElement('button'); b.type = 'button';
      b.className = 'yn-launch'; b.textContent = label;
      b.addEventListener('click', () => open(b));
      anchor.insertAdjacentElement('afterend', b);
    }
    $('ynClose').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) { e.preventDefault(); close(); } });
    $('ynTabs').addEventListener('click', e => {
      const b = e.target.closest('button[data-filter]'); if (!b) return;
      ui.filter = b.dataset.filter; ui.page = 1; ui.revealed.clear(); render();
    });
    $('ynSearch').addEventListener('input', e => { ui.query = e.target.value; ui.page = 1; render(); });
    $('ynLevel').addEventListener('change', e => { ui.level = e.target.value; ui.page = 1; render(); });
    $('ynMore').addEventListener('click', () => { ui.page++; render(); });
    $('ynList').addEventListener('click', e => {
      const b = e.target.closest('button[data-action]'); if (!b) return;
      const item = catalog[Number(b.dataset.index)]; if (!item) return;
      if (b.dataset.action === 'reveal') {
        if (ui.revealed.has(item.id)) ui.revealed.delete(item.id); else ui.revealed.add(item.id);
      } else if (b.dataset.action === 'star') {
        const r = entry(item.id); r.star = !r.star; r.updated = Date.now(); save();
      } else if (b.dataset.action === 'review') {
        const r = entry(item.id); r.review = !r.review; r.cleanStreak = 0; r.updated = Date.now(); save();
      }
      render();
    });
    ready = true;
    load();
    render();
  }
  function record({level,word,correct,missed}) {
    if (!ready) return;
    const id = idFor(level,word); if (!byId.has(id)) return;
    const r = entry(id);
    r.seen++; if (correct) r.correct++;
    if (missed || !correct) {
      r.missed++; r.review = true; r.cleanStreak = 0;
    } else if (r.review) {
      r.cleanStreak++;
      if (r.cleanStreak >= 2) { r.review = false; r.cleanStreak = 0; }
    }
    r.updated = Date.now();
    save();
  }
  window.CPYomiNotebook = {init, record, getStats: () => countStats(), getRecord: (level,word) => records[idFor(level,word)] || null};
})();