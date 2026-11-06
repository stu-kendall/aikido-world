// Exercise both full adventures, recovery choices, persistence, and safe park naming.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync('dist/game.js','utf8');
function game(saved){
 const elements=new Map(), storage=new Map(saved?[['aikido-world-v1',saved]]:[]);
 function el(selector){if(!elements.has(selector))elements.set(selector,{innerHTML:'',textContent:'',value:'',open:false,hidden:true,classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},focus(){},scrollIntoView(){},showModal(){this.open=true},close(){this.open=false}});return elements.get(selector)}
 const context=vm.createContext({document:{querySelector:el,querySelectorAll:()=>[],addEventListener(){},body:el('body')},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:false}),window:{scrollTo(){}},setTimeout:()=>1,clearTimeout(){},console});
 vm.runInContext(source,context);
 return {run:s=>vm.runInContext(s,context),el,storage};
}
const path=['scan','prepare','test-latch','open-first','next-cloud','inspect-access','restrict','open-second','next-attack','run-pentest','fix-auth','retest','finish-attack','next-protect','inspect-runtime','enable-protect','repair-runtime','open-third','next-finale','priority','explore'];
for(const first of ['wheel','coaster']){
 const g=game();g.run("action('start')");g.run(`action('choose-${first}')`);
 for(const action of path){
  const stage=g.run('state.stage');
  const wrong=g.run('stages[state.stage].actions.filter(a=>a.action.startsWith("wrong-")).map(a=>a.action)');
  for(const bad of wrong){g.run(`action('${bad}')`);assert.equal(g.run('state.stage'),stage);assert.ok(g.el('#mission').innerHTML.includes('role="status"'));}
  assert.ok(g.run(`stages[state.stage].actions.some(a=>a.action==='${action}')`),`${action} unavailable at ${stage}`);
  g.run(`action('${action}')`);
 }
 assert.equal(g.run('state.stage'),'explore');assert.equal(g.el('#rides-stat').textContent,'3 / 3');assert.equal(g.el('#guests-stat').textContent,180);
 const resumed=game(g.storage.get('aikido-world-v1'));assert.equal(resumed.run('state.stage'),'explore');assert.equal(resumed.run('state.firstRide'),first);
 g.el('#park-name').value='<img src=x onerror=alert(1)>';g.run("action('rename')");assert.ok(!g.el('#park').innerHTML.includes('<img'));assert.ok(g.el('#park').innerHTML.includes('&lt;IMG'));
 fs.writeFileSync('/tmp/aikido-world-scene.svg',g.el('#park').innerHTML);
 for(const guide of ['code','cloud','attack','protect','fixes']){g.run(`showGuide('${guide}')`);assert.ok(g.el('#guide-content').innerHTML.includes('https://www.aikido.dev/'));}
}
const corrupt=game('{broken');assert.equal(corrupt.run('state.stage'),'welcome');
const invalid=game(JSON.stringify({stage:'does-not-exist'}));assert.equal(invalid.run('state.stage'),'welcome');
console.log('PASS: both complete playthroughs, all recovery choices, saved progress, all product guides, safe naming, and corrupt-save recovery.');
