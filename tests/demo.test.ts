import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createDemoData} from '../src/demoData';
test('every fresh visit starts with independent fictitious data',()=>{
 const first=createDemoData();first.subscribers[0].name='edited';first.transactions.push({id:'test',customerId:'demo-s1',amount:100,date:'2026-01-01',time:'12:00'});
 const next=createDemoData();assert.notEqual(next.subscribers[0].name,'edited');assert.equal(next.transactions.length,0);
 assert.ok(next.subscribers.every(x=>x.name.includes('تجريبي')&&x.phone===''));
});
test('demo source has no database client, browser persistence or service worker',()=>{
 for(const file of readdirSync('src').filter(x=>/\.(tsx?|json)$/.test(x))){
  const text=readFileSync('src/'+file,'utf8');
  assert.doesNotMatch(text,/firebase|indexedDB|localStorage|sessionStorage|serviceWorker|caches\./,file);
 }
 assert.doesNotMatch(readFileSync('index.html','utf8'),/rel="manifest"/);
 assert.doesNotMatch(readFileSync('vite.config.ts','utf8'),/pwaBuild/);
 const provider=readFileSync('src/cloud.tsx','utf8');assert.match(provider,/pagehide/);assert.match(provider,/event.persisted/);
});
