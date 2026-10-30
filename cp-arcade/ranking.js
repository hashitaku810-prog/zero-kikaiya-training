/* CP ARCADE common leaderboard v0.1. Existing game controls and local best stay intact. */
(()=>{
 const API='https://zotajucfdvmyernfwxnm.supabase.co/functions/v1/arcade-ranking';
 const IDS={drop:'CP DROP',chain:'CP CHAIN',fruits:'CP FRUITS'};

 // Short, original Web Audio effects only. No BGM or external sound files.
 const SFX_KEY='cp-arcade-sfx-v1';
 let sfxEnabled=true,sfxCtx=null,lastTap=0;
 try{const stored=localStorage.getItem(SFX_KEY);if(stored!==null)sfxEnabled=stored!=='0'}catch{}
 function playSfx(kind='tap'){
  if(!sfxEnabled)return;
  if(kind==='tap'){const now=performance.now();if(now-lastTap<75)return;lastTap=now;}
  const notes={
   tap:[[560,.034,.012,'sine',0]],
   move:[[330,.025,.010,'sine',0]],
   rotate:[[590,.05,.016,'triangle',0]],
   drop:[[175,.075,.021,'triangle',0]],
   land:[[225,.034,.009,'sine',0]],
   clear:[[660,.075,.022,'sine',0],[880,.12,.021,'sine',.075]],
   over:[[260,.11,.015,'sine',0],[180,.16,.015,'sine',.11]],
   rank:[[660,.09,.022,'sine',0],[830,.09,.023,'sine',.105],[1050,.19,.025,'sine',.21]],
   toggle:[[740,.045,.013,'sine',0]]
  }[kind]||[[520,.035,.012,'sine',0]];
  try{
   const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
   if(!sfxCtx)sfxCtx=new AC();
   if(sfxCtx.state==='suspended')sfxCtx.resume().catch(()=>{});
   for(const [hz,dur,vol,wave,delay] of notes){
    const osc=sfxCtx.createOscillator(),gain=sfxCtx.createGain(),t=sfxCtx.currentTime+delay;
    osc.type=wave;osc.frequency.setValueAtTime(hz,t);
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.exponentialRampToValueAtTime(vol,t+.007);
    gain.gain.exponentialRampToValueAtTime(.0001,t+dur);
    osc.connect(gain).connect(sfxCtx.destination);osc.start(t);osc.stop(t+dur+.015);
   }
  }catch{}
 }
 function setSfxEnabled(value){
  sfxEnabled=!!value;
  try{localStorage.setItem(SFX_KEY,sfxEnabled?'1':'0')}catch{}
  if(sfxEnabled)playSfx('toggle');
 }
 window.CPArcadeSFX={play:playSfx,isEnabled:()=>sfxEnabled,setEnabled:setSfxEnabled};
 function tapCandidate(element){
  const b=element?.closest?.('button');if(!b||b.disabled)return false;
  if(b.matches('.ctrl,.control,#left,#right,#drop,#sound,#cp-sound'))return false;
  return true;
 }
 document.addEventListener('pointerdown',e=>{if(tapCandidate(e.target))playSfx('tap')},true);
 document.addEventListener('click',e=>{if(e.detail===0&&tapCandidate(e.target))playSfx('tap')},true);

 const style=document.createElement('style');
 style.textContent='.cp-rank-open{position:fixed;z-index:9500;right:10px;top:10px;border:1px solid #edca72;background:#192640;color:#fff6c8;padding:9px 12px;border-radius:12px;font:bold 13px system-ui;cursor:pointer;box-shadow:0 3px 16px #0008}.cp-rank-mask{position:fixed;z-index:99000;inset:0;background:#050b17e9;display:flex;align-items:center;justify-content:center;padding:16px}.cp-rank-panel{width:min(94vw,420px);max-height:90dvh;overflow:auto;border:2px solid #f5cd71;border-radius:18px;background:#17243c;color:#fff;box-shadow:0 12px 38px #000a;padding:20px;font:15px/1.6 system-ui;text-align:center}.cp-rank-panel h2{font-size:23px;margin:4px 0 8px;color:#f4d37f}.cp-rank-panel p{margin:8px 0}.cp-rank-panel input{display:block;width:135px;margin:12px auto;padding:11px;font:bold 27px monospace;text-align:center;letter-spacing:5px;text-transform:uppercase;color:#17243c;background:#fff;border:2px solid #f5c761;border-radius:9px}.cp-rank-panel button{border:0;background:#eacb80;color:#1b2335;padding:10px 13px;margin:6px 3px;border-radius:9px;font:bold 14px system-ui;cursor:pointer}.cp-rank-panel button.secondary{background:#344561;color:#fff}.cp-rank-panel .cp-rank-list{text-align:left;margin:12px 0}.cp-rank-panel .cp-rank-row{display:flex;gap:10px;justify-content:space-between;padding:8px;border-bottom:1px solid #40506a}.cp-rank-panel .cp-rank-row b{color:#f4d37f}.cp-rank-panel .cp-rank-msg{color:#c3d9fa;font-size:12px}.cp-rank-panel .cp-rank-tabs{display:flex;justify-content:center;gap:5px}';
 document.head.appendChild(style);
 let player=localStorage.getItem('cp_arcade_player_id_v1');
 if(!/^[0-9a-f-]{36}$/i.test(player||'')){player=crypto.randomUUID();try{localStorage.setItem('cp_arcade_player_id_v1',player)}catch{}}
 const games={};
 async function request(path,opt={}){
  const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),10000);
  try{const res=await fetch(API+path,{...opt,signal:ctl.signal,headers:{'Content-Type':'application/json',...(opt.headers||{})}});
  const val=await res.json();if(!res.ok)throw Error(val?.error||'通信エラー');return val;}
  finally{clearTimeout(timer);}
 }
 function panel(title){
  const mask=document.createElement('div');mask.className='cp-rank-mask';
  const box=document.createElement('div');box.className='cp-rank-panel';
  const h=document.createElement('h2');h.textContent=title;box.append(h);mask.append(box);document.body.append(mask);
  const close=()=>mask.remove();
  mask.addEventListener('click',e=>{if(e.target===mask)close()});
  return {box,close};
 }
 function add(box,tag,text,cls){const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;box.append(el);return el;}
 function btn(box,text,fn,cls){const el=add(box,'button',text,cls);el.type='button';el.addEventListener('click',fn);return el;}
 async function scores(game,period){return request('?game='+game+'&period='+period)}
 function show(game){
  const {box,close}=panel('🏆 '+IDS[game]);
  const tabs=add(box,'div','','cp-rank-tabs');
  const results=add(box,'div','読み込み中…','cp-rank-list');
  let current='week',active=true;
  async function refresh(){
   results.textContent='読み込み中…';
   try{const v=await scores(game,current);if(!active)return;results.replaceChildren();
    if(!v.entries.length)add(results,'p','まだ記録はありません。最初の挑戦者になろう！');
    v.entries.forEach(r=>{const row=add(results,'div','','cp-rank-row');add(row,'b',String(r.rank).padStart(2,'0')+'  '+r.name);add(row,'strong',Number(r.score).toLocaleString('ja-JP')+' pt')});
   }catch{results.textContent='ランキングの取得に失敗しました。時間をおいて試してね。'}
  }
  btn(tabs,'今週',()=>{current='week';refresh()});
  btn(tabs,'歴代',()=>{current='all';refresh()});
  btn(box,'更新',refresh,'secondary');
  btn(box,'閉じる',()=>{active=false;clearInterval(timer);close()},'secondary');
  const timer=setInterval(()=>{if(!active||document.hidden)return;refresh()},30000);refresh();
 }
 async function start(game){
  if(!IDS[game])return;
  const run={ticket:null};
  games[game]=run;
  run.pending=request('?action=start',{method:'POST',body:JSON.stringify({game,player_id:player})}).then(v=>{run.ticket=v;return v}).catch(()=>null);
 }
 async function finish(game,score){
  if(!IDS[game]||!Number.isSafeInteger(score)||score<=0)return;
  const run=games[game];if(!run)return;
  const t=run.ticket || await run.pending;
  if(games[game]!==run||!t)return;
  const payload={run_id:t.run_id,run_token:t.run_token,score};
  let status;
  try{status=await request('?action=qualify',{method:'POST',body:JSON.stringify(payload)})}
  catch{return}
  if(!status.eligible)return;
  playSfx('rank');
  const {box,close}=panel('★ RANK IN! ★');
  add(box,'p',IDS[game]+'  '+score.toLocaleString('ja-JP')+' PTS');
  add(box,'p',(status.week?'今週 '+status.week+'位  ':'')+(status.all?'歴代 '+status.all+'位':''));
  add(box,'p','おめでとう！ 英数字3文字を入力してね。','cp-rank-msg');
  const input=add(box,'input','');input.maxLength=3;input.autocomplete='off';input.placeholder='AAA';
  try{input.value=(localStorage.getItem('cp_arcade_initials_v1')||'').slice(0,3)}catch{}
  input.addEventListener('input',()=>{input.value=input.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3)});
  const message=add(box,'p','','cp-rank-msg');
  btn(box,'名前を登録',async()=>{
   if(!/^[A-Z0-9]{3}$/.test(input.value)){message.textContent='英数字3文字で入力してね。';return}
   message.textContent='登録中…';
   try{const r=await request('?action=submit',{method:'POST',body:JSON.stringify({...payload,initials:input.value})});
     try{localStorage.setItem('cp_arcade_initials_v1',input.value)}catch{}
     close();show(game);
   }catch(e){message.textContent=e.message==='not_top10'?'順位が変わってTOP10から外れました。もう一度挑戦してね。':'登録できませんでした。通信状態を確認してね。'}
  });
  btn(box,'今回は登録しない',close,'secondary');
 }
 window.CPLeaderboard={start,finish,show};
 for(const [game,label] of Object.entries(IDS)){
  if(location.pathname.endsWith('/cp_'+game+'.html')){
   const b=document.createElement('button');b.type='button';b.className='cp-rank-open';b.textContent='🏆 ランキング';b.onclick=()=>show(game);document.body.append(b);break;
  }
 }
})();