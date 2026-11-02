/* はしmoto Games — first-party visitor counter v1.0.
 * No cookies, no IP collection, no full referrers, no third-party analytics.
 * Anonymous browser UUID is kept only on this device (and in aggregates).
 * Respect browser privacy signals and allow opt-out with localStorage key
 * "hm_games_analytics_off" = "1".
 */
(() => {
  'use strict';
  const API = 'https://zotajucfdvmyernfwxnm.supabase.co/functions/v1/arcade-analytics';
  const PAGES = {
    'index.html': 'home', 'cp_drop.html':'drop', 'cp_chain.html':'chain',
    'cp_fruits.html':'fruits','cp_picture_puzzle.html':'picture_puzzle',
    'cp_picture_drop.html':'picture_drop','cp_nokoribi.html':'nokoribi',
    'cp_kanji_eight.html':'kanji_eight','cp_yomichare.html':'yomichare',
    'about.html':'about','credits.html':'credits'
  };
  const prefix = '/zero-kikaiya-training/cp-arcade/';
  const path = window.location.pathname;
  const file = path===prefix ? 'index.html' : path.startsWith(prefix) ? path.slice(prefix.length) : '';
  const page = PAGES[file] || '';
  const enabled = Boolean(page) && navigator.doNotTrack!=='1' && navigator.globalPrivacyControl!==true &&
    (()=>{try{return localStorage.getItem('hm_games_analytics_off')!=='1'}catch{return true}})();
  const idPattern=/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
  const visitKey = 'hm_games_visitor_v1', sessionKey='hm_games_session_v1';
  const now = () => Date.now();
  const jstDay = () => new Date(now()+9*3600000).toISOString().slice(0,10);
  const newId = () => typeof crypto?.randomUUID==='function' ? crypto.randomUUID() : null;
  let session = null, visitor = null;
  function sourceForLanding() {
    const query=new URLSearchParams(window.location.search);
    const utm=(query.get('utm_source')||'').toLowerCase().trim();
    const ref=(()=>{try{return document.referrer?new URL(document.referrer).hostname.toLowerCase():''}catch{return ''}})();
    const fromYT=utm==='youtube'||utm==='youtube.com'||ref==='youtu.be'||ref==='youtube.com'||ref.endsWith('.youtube.com');
    if(fromYT)return 'youtube';
    if(utm==='google'||utm==='bing'||utm==='search'||/(^|\.)google\.|(^|\.)bing\.|(^|\.)yahoo\./.test(ref))return 'search';
    if(['x','twitter','instagram','facebook','tiktok','line'].includes(utm)||
      /(^|\.)((twitter|instagram|facebook|tiktok|line)\.com|x\.com)$/.test(ref))return 'social';
    if(ref && ref!==window.location.hostname && !ref.endsWith('.github.io'))return 'referral';
    return 'direct';
  }
  function getSession() {
    if(!enabled)return null;
    if(session)return session;
    try {
      visitor=localStorage.getItem(visitKey);
      if(!idPattern.test(visitor||'')) {visitor=newId();if(visitor)localStorage.setItem(visitKey,visitor);}
    }catch{visitor=newId();}
    if(!visitor) return null; // only secure origins where crypto.randomUUID exists
    let saved;
    try{saved=JSON.parse(sessionStorage.getItem(sessionKey)||'null')}catch{}
    const t=now(), d=jstDay();
    if(saved && idPattern.test(saved.id||'') && saved.day===d &&
        Number.isFinite(saved.last) && t>=saved.last && t-saved.last<30*60*1000){
      session=saved;
    }else{
      const id=newId();if(!id)return null;
      const source=sourceForLanding();
      const raw=source==='youtube' ? new URLSearchParams(window.location.search).get('utm_campaign')||'' : '';
      const campaign=raw.toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,60);
      session={id,day:d,last:t,source,campaign};
    }
    session.last=t;
    try{sessionStorage.setItem(sessionKey,JSON.stringify(session))}catch{}
    return session;
  }
  function updateSession(){
    if(session) {session.last=now();try{sessionStorage.setItem(sessionKey,JSON.stringify(session))}catch{}}
  }
  async function send(kind,game=null) {
    if(!enabled)return null;
    const s=getSession();if(!s)return null;
    updateSession();
    const event={visitor,session:s.id,kind,page,game,source:s.source,campaign:s.campaign};
    try {
      const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},
        mode:'cors',keepalive:true,body:JSON.stringify(event)});
      return r.ok ? await r.json() : null;
    }catch{return null;}
  }
  async function loadPublicCounter() {
    const n=document.getElementById('hmVisitorCount');
    if(!n)return;
    try{
      const r=await fetch(API+'?mode=public',{mode:'cors',cache:'no-store'});
      if(!r.ok)throw Error('counter_fetch_failed');
      const s=(await r.json()).stats;
      if(!s || !Number.isFinite(Number(s.visitors)))throw Error('counter_data_invalid');
      n.textContent=Number(s.visitors).toLocaleString('ja-JP');
      const today=document.getElementById('hmTodayCount');if(today)today.textContent=Number(s.today_visitors||0).toLocaleString('ja-JP');
      const pv=document.getElementById('hmPVCount');if(pv)pv.textContent=Number(s.pageviews||0).toLocaleString('ja-JP');
    }catch{
      n.textContent='--';
      const status=document.getElementById('hmVisitorNote');
      if(status)status.textContent='アクセス数を取得できませんでした。ゲームはそのまま遊べます。';
    }
  }
  function gameStart(game){
    if(page!==game || !['drop','chain','fruits','picture_puzzle','picture_drop','nokoribi','kanji_eight','yomichare'].includes(game))return;
    void send('game_start',game);
  }
  window.CPAnalytics={gameStart,loadPublicCounter,enabled};
  function ready(){
    // A game may already have started while the page was parsing.
    void send('pageview').then(()=>loadPublicCounter());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
})();